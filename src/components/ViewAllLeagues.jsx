import React, { useEffect, useState, createContext } from "react"

import LeagueService from "../services/league"
import PokemonService from "../services/pokemon"
import SlotService from "../services/slot"

import { useNavigate } from "react-router-dom"

import moment from "moment"

const ViewAllLeagues = () => {
    const [ slots, setSlots ] = useState(0)
    const [ trainerId, setTrainerId ] = useState(0)
    const [ leagues, setLeagues ] = useState([])
    const [ pokemons, setPokemons ] = useState([])
    const [ activeLeague, setActiveLeague ] = useState(null)
    const [ leagueData, setLeagueData ] = useState({})
    const [ firstSlot, setFirstSlot ] = useState([])
    const [ secondSlot, setSecondSlot ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ isError, setIsError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ maxLimit, setMaxLimit ] = useState(0)
    const [ isDataShown, setIsDataShown ] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        retrieveAllLeagues()
    }, [])

    useEffect(() => {
        const authUser = localStorage.getItem('auth_user')
        console.log(authUser)
        retrieveAllPokemonsByTrainer((JSON.parse(authUser)).id)
    })

    useEffect(() => {
        if (!localStorage.getItem('auth_user')) {
            navigate("/login")
        }
    })

    async function retrieveAllLeagues() {
        try {
            const response = await LeagueService.getAll();
            if (response.status === 200) {
                setLeagues(response.data.data);
            }
        } catch(err) {
            console.log(err)
        }
    }

    async function retrieveAllPokemonsByTrainer(id) {
        try {
            const response = await PokemonService.getTrainerPokemons(id);
            if (response.status === 200) {
                setPokemons(response.data.data)
            }
        } catch(err) {
            console.log(err)
        };
    }

    async function retrieveLeague(id) {
        try {
            const response = await LeagueService.get(id);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data.data[0].slots)
                setSlots(response.data.data[0].slots);
                initializeArray(response.data.data[0].slots);
                setMaxLimit(response.data.data[0].max_stats_limit)
                setMessage("")
                setLeagueData(response.data.data[0]);
                setIsDataShown(true);
            }
        } catch(err) {
            console.log(err)
        };
    }

    async function handleRegister(firstSlot, secondSlot) {
        setIsDataShown(false);
        setMessage("");
        setIsError(false);

        let sumOfStats = checkIfStatsExceedMaximum()
        if (sumOfStats > maxLimit) {
            setForm(true, `The total current stats of your pokemons is ${sumOfStats}. You have exceeded the maximum limit of ${maxLimit}`)
            return;
        }

        let duplicates = checkIfThereAreDuplicates();

        for (let key in duplicates) {
            console.log(key);
            if (key === "0,0") {
                setForm(true, "You need to fill in all the slots.")
                return;
            } else if (duplicates[key] > 1) {
                setForm(true, "There are duplicates in your entries.")
                return;
            } else if (key === "1,1" || key === "2,2" || key === "2,2" || key === "3,3" || key === "4,4") {
                setForm(true, "You can't choose the same pokemon twice in the same slot. Please select another pokemon or select only one.")
                return;
            }
        }

        setLoading(true)
        try {
            console.log(firstSlot)
            console.log(secondSlot)
            console.log(trainerId)
            let authUser = localStorage.getItem('auth_user')
            let data = new FormData()
            console.log(JSON.parse(authUser).id)
            data.append('trainerId', JSON.parse(authUser).id)
            data.append('leagueId', activeLeague)
            data.append('firstSlotData', JSON.stringify(firstSlot))
            data.append('secondSlotData', JSON.stringify(secondSlot))
            const response = await SlotService.create(data);
            console.log(response)
            if (response.status === 200) {
                setForm(false, response.data.message)
                console.log(response)
            }
        } catch(err) {
            setForm(true, err.response.data.message)
            console.log(err)
        }
        setLoading(false)
    }

    const setForm = (errorVal, message) => {
        setIsError(errorVal)
        setMessage(message)
    }

    const handleClick = (e) => {
        console.log(e.target.value)
        setIsError(false);
        setMessage("");
        setFirstSlot([]);
        setSecondSlot([]);
        setActiveLeague(e.target.value)
        retrieveLeague(e.target.value)
    }

    const initializeArray = (slots) => {
        console.log("initialize is called")
        for (let u = 0; u < slots; u++) {
            firstSlot[u] = { 'slotNo': u + 1, 'pokemonId': 0, 'orderNo': 1, 'attackStat': 0, 'defenseStat': 0, 'speedStat': 0 };
        }

        for (let u = 0; u < slots; u++) {
            secondSlot[u] = { 'slotNo': u + 1, 'pokemonId': 0, 'orderNo': 2, 'attackStat': 0, 'defenseStat': 0, 'speedStat': 0 };
        }

        setFirstSlot(firstSlot)
        setSecondSlot(secondSlot)

        console.log(firstSlot)
        console.log(secondSlot)
    }

    const checkIfThereAreDuplicates = () => {

        // check if there are unpaired duplicate values
        let firstSlotPokemons = firstSlot.map(val => val.pokemonId);
        let secondSlotPokemons = secondSlot.map(val => val.pokemonId);

        let newArr = [];
        for (let i = 0; i < firstSlotPokemons.length; i++) {
            newArr[i] = [firstSlotPokemons[i], secondSlotPokemons[i]];
        }

        return newArr.reduce(function(reduced, indexValue) {
            // sort array
            indexValue.sort().join(',')
            
            // if it exists, add 1 to frequency for the current indexValue
            if (indexValue in reduced) {
                reduced[indexValue] = reduced[indexValue] + 1;

            // else, start at 1
            } else {
                reduced[indexValue] = 1;
            }

            console.log(reduced)
            return reduced;
        }, {});
    }

    const checkIfStatsExceedMaximum = () => {
        let firstAttack = firstSlot.map(val => val.attackStat);
        let secondAttack = secondSlot.map(val => val.attackStat);

        let firstDefense = firstSlot.map(val => val.defenseStat);
        let secondDefense = secondSlot.map(val => val.defenseStat);

        let firstSpeed = firstSlot.map(val => val.speedStat);
        let secondSpeed = secondSlot.map(val => val.speedStat);

        let merged = firstAttack.concat(secondAttack, firstDefense, secondDefense, firstSpeed, secondSpeed);
        console.log(merged)

        return merged.reduce((accumulator, currentValue) => 
            accumulator + currentValue
        );
    }

    const handleFirstSlot = (e, index) => {
        setIsError(false);
        setMessage("");

        let newVal = e.target.value.split(',');

        // check if duplicate in second slot
        console.log(parseInt(newVal[0]))
        if ((secondSlot[index-1]?.pokemonId === parseInt(newVal[0])) && parseInt(newVal[0]) !== 0) {
            let element = document.getElementById(`slot-${index}-1`);
            element.value = 0;
            setForm(true, "You can't choose the same pokemon twice in the same slot. Please select another pokemon or select only one.")
            return;
        }
        console.log(firstSlot)
        console.log(index)

        firstSlot[index-1].pokemonId = parseInt(newVal[0]);
        firstSlot[index-1].attackStat = parseInt(newVal[1]);
        firstSlot[index-1].defenseStat = parseInt(newVal[2]);
        firstSlot[index-1].speedStat = parseInt(newVal[3]);
    }

    const handleSecondSlot = (e, index) => {
        setIsError(false);
        setMessage("");

        let newVal = e.target.value.split(',');

        // check if duplicate in second slot
        if ((firstSlot[index-1]?.pokemonId === (parseInt(newVal[0]))) && parseInt(newVal[0]) !== 0) {
            let element = document.getElementById(`slot-${index}-2`);
            element.value = 0;
            setForm(true, "You can't choose the same pokemon twice in the same slot. Please select another pokemon or select only one.")
            return;
        }

        secondSlot[index-1].pokemonId = parseInt(newVal[0]);
        secondSlot[index-1].attackStat = parseInt(newVal[1]);
        secondSlot[index-1].defenseStat = parseInt(newVal[2]);
        secondSlot[index-1].speedStat = parseInt(newVal[3]);
    }

    return (
        <>
        <div className="w-full h-[655px] self-end p-10">
            <div className="max-w-[500px] mx-auto p-5">
                {
                    message && !isDataShown &&
                    <div className={`${isError ? 'bg-red-100 dark:bg-red-200' : 'bg-green-100 dark:bg-green-200'} w-full mx-auto flex md:p-4 p-2 rounded-lg mb-6`} role="alert">
                        {/* {isError ? 
                            <MdErrorOutline style={{ '--tw-text-opacity': 1, fontSize: '30px', fill: 'rgb(185 28 28 / var(--tw-text-opacity))' }} /> 
                            :
                            <MdCheckCircleOutline style={{ '--tw-text-opacity': 1, fontSize: '30px', fill: 'rgb(21 128 61 / var(--tw-text-opacity))' }} />
                        } */}
                        <span className="sr-only">Error</span>
                        <div className={`${isError ? 'text-red-700 dark:text-red-800' : 'text-green-700 dark:green-red-800' } ml-3 pt-[0.2rem] text-sm font-press-start`}>
                            {message}
                        </div>
                    </div>
                }
                {
                    !message && isDataShown &&
                    <div className={`bg-[#a3b97a] w-full mx-auto flex md:p-4 p-2 rounded-lg mb-6`} role="alert">
                        <div className={` ml-3 pt-[0.2rem] text-sm font-press-start`}>
                            Location: {leagueData.location}
                            <br />
                            Terrain: {leagueData.terrain}
                            <br />
                            Start date: {moment(leagueData.start_date).format("LL")}
                            <br />
                            Slots: {leagueData.slots}
                            <br />
                            Maximum Stats Limit: {leagueData.max_stats_limit}
                        </div>
                    </div>
                }
                {
                    !message && !isDataShown &&
                    <div className="text-white text-[30px] font-bold text-center mb-5 font-press-start">List of Leagues</div>
                }

                <select id="league"
                    onChange={(e) => handleClick(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                    <option disabled>Choose a league</option>
                    <option value="0" key={`league-none`}>None</option>
                    {
                        leagues && 
                        leagues.map((current, index) => (
                            <option value={current.id} key={`league-${current.id}`}>{current.title}</option>
                        ))
                    }
                </select>
            </div>
            <div className="p-2">
                {
                    activeLeague && slots &&
                    (() => {
                        let rows = [];
                        for (let i = 1; i < slots + 1; i++) {
                            rows.push(
                                <>
                                <div className="mb-[1rem]">
                                <div className="grid grid-cols-3 grid-rows-1 gap-2">
                                <div>
                                <label htmlFor={`slot-${i}-1`} className="w-[100px] block mb-2 text-sm font-medium text-white uppercase bg-black font-press-start p-2">Slot {i}</label>
                                </div>
                                <div>
                                <select id={`slot-${i}-1`}
                                    onChange={(e) => handleFirstSlot(e, i)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                                    <option disabled>Choose your first pokemon</option>
                                    <option value="0" key="pokemon-0-1">None</option>
                                    {
                                        pokemons && 
                                        pokemons.map((pokemon, index) => (
                                            <option value={`${pokemon.id},${pokemon.attack_stat},${pokemon.defense_stat},${pokemon.speed_stat}`} key={`pokemon-${pokemon.id}-1`}>{pokemon.name}</option>
                                        ))
                                    }
                                </select>
                                </div>
                                <div>
                                <select id={`slot-${i}-2`}
                                    onChange={(e) => handleSecondSlot(e, i)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                                    <option disabled>Choose your second pokemon</option>
                                    <option value="0" key="pokemon-0-2">None</option>
                                    {
                                        pokemons && 
                                        pokemons.map((pokemon, index) => (
                                            <option value={`${pokemon.id},${pokemon.attack_stat},${pokemon.defense_stat},${pokemon.speed_stat}`} key={`pokemon-${pokemon.id}-2`}>{pokemon.name}</option>
                                        ))
                                    }
                                </select>
                                </div>
                                </div>
                                </div>
                                </>
                            );
                        }
                        return (<div>{rows}</div>);
                    })()
                }
                {
                    loading && activeLeague ?
                    <div className="flex justify-center spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300" role="status">
                    </div> 
                    :
                    <div className="flex justify-center">
                        <button onClick={() => handleRegister(firstSlot, secondSlot)} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Register
                        </button>
                    </div>
                }
            </div>
        </div>
        </>

    );
};

export default ViewAllLeagues;