import React, { useEffect, useState } from "react"

import LeagueService from "../services/league"
import PokemonService from "../services/pokemon"
import SlotService from "../services/slot"

import { useNavigate } from "react-router-dom"

import { MdKeyboardArrowDown, MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md'

const ViewAllLeagues = () => {
    const [ slots, setSlots ] = useState(0)
    const [ trainerId, setTrainerId ] = useState(0)
    const [ leagues, setLeagues ] = useState([])
    const [ pokemons, setPokemons ] = useState([])
    const [ leagueMenu, setLeagueMenu ] = useState(false)
    const [ activeLeague, setActiveLeague ] = useState(null)
    const [ firstSlot, setFirstSlot ] = useState([])
    const [ secondSlot, setSecondSlot ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ isError, setIsError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ showAlert, setShowAlert ] = useState(false)
    const [ maxLimit, setMaxLimit ] = useState(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        retrieveAllLeagues()
    }, [])

    useEffect(() => {
        const authUser = localStorage.getItem('auth_user')
        retrieveAllPokemonsByTrainer((JSON.parse(authUser)).id)
    }, [trainerId])

    useEffect(() => {
        if (!localStorage.getItem('auth_user')) {
            navigate("/login")
        }
    })

    async function retrieveAllLeagues() {
        try {
            const response = await LeagueService.getAll();
            console.log(response);
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
            console.log(response);
            if (response.status === 200) {
                setPokemons(response.data.pokemons)
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
            }
        } catch(err) {
            console.log(err)
        };
    }

    async function handleRegister(firstSlot, secondSlot) {
        setMessage("");
        setIsError(false);

        let sumOfStats = checkIfStatsExceedMaximum()
        if (sumOfStats > maxLimit) {
            setForm(true, true, `The total current stats of your pokemons is ${sumOfStats}. You have exceeded the maximum limit of ${maxLimit}`)
            return;
        }

        let duplicates = checkIfThereAreDuplicates();

        for (let key in duplicates) {
            console.log(key);
            if (key === "0,0") {
                setForm(true, true, "You need to fill in all the slots.")
                return;
            } else if (duplicates[key] > 1) {
                setForm(true, true, "There are duplicates in your entries.")
                return;
            } else if (key === "1,1" || key === "2,2" || key === "2,2" || key === "3,3" || key === "4,4") {
                setForm(true, true, "You can't choose the same pokemon twice in the same slot. Please select another pokemon or select only one.")
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
            data.append('trainerId', JSON.parse(authUser).id)
            data.append('leagueId', activeLeague)
            data.append('firstSlotData', JSON.stringify(firstSlot))
            data.append('secondSlotData', JSON.stringify(secondSlot))
            const response = await SlotService.create(data);
            console.log(response)
            if (response.status === 200) {
                setForm(true, false, response.data.message)
                console.log(response)
            }
        } catch(err) {
            // setForm(true, true, err.response.data.message)
            console.log(err)
        }
        setLoading(false)
    }

    const setForm = (alertVal, errorVal, message) => {
        setShowAlert(alertVal)
        setIsError(errorVal)
        setMessage(message)
    }

    const handleClick = (id) => {
        setIsError(false);
        setMessage("");
        setFirstSlot([]);
        setSecondSlot([]);
        setActiveLeague(id)
        retrieveLeague(id)
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
        setForm("");

        let newVal = e.target.value.split(',');

        // check if duplicate in second slot
        console.log(parseInt(newVal[0]))
        if ((secondSlot[index-1]?.pokemonId === parseInt(newVal[0])) && parseInt(newVal[0]) !== 0) {
            let element = document.getElementById(`slot-${index}-1`);
            element.value = 0;
            setForm(true, true, "You can't choose the same pokemon twice in the same slot. Please select another pokemon or select only one.")
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
        setForm("");

        let newVal = e.target.value.split(',');

        // check if duplicate in second slot
        if ((firstSlot[index-1]?.pokemonId === (parseInt(newVal[0]))) && parseInt(newVal[0]) !== 0) {
            let element = document.getElementById(`slot-${index}-2`);
            element.value = 0;
            setForm(true, true, "You can't choose the same pokemon twice in the same slot. Please select another pokemon or select only one.")
            return;
        }

        secondSlot[index-1].pokemonId = parseInt(newVal[0]);
        secondSlot[index-1].attackStat = parseInt(newVal[1]);
        secondSlot[index-1].defenseStat = parseInt(newVal[2]);
        secondSlot[index-1].speedStat = parseInt(newVal[3]);
    }

    return (
        <div className="w-full h-full my-32">
            <div className="max-w-[1000px] mx-auto p-5">
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">List of Leagues</div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <button id="dropdownDefault" 
                            onClick={() => setLeagueMenu(!leagueMenu)}
                            className="
                                shadow 
                                bg-purple-500 
                                hover:bg-purple-400
                                hover:text-white
                                focus:ring-4
                                focus:outline-none 
                                focus:ring-purple-300
                                dark:bg-purple-600 
                                dark:hover:bg-purple-700 
                                dark:focus:ring-purple-800
                                text-white 
                                text-center 
                                inline-flex 
                                items-center 
                                font-bold 
                                py-2 
                                px-4 
                                rounded" 
                            type="button">Select a league <MdKeyboardArrowDown style={{ fontSize: '30px', marginLeft: '1rem' }} />
                        </button>
                        {
                            leagueMenu && 
                            <div className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <ul className="dropdown-menu py-1 text-sm text-gray-700 dark:text-gray-200">
                                {
                                    leagues &&
                                    leagues.map((league, index) => (
                                        <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={() => handleClick(league.id)}
                                            key={league.id}>{league.title}</li>
                                    ))
                                }
                                </ul>
                            </div>
                        }

                    </div>
                    <div className="md:w-2/3">
                        {
                            activeLeague && slots &&
                            (() => {
                                let rows = [];
                                for (let i = 1; i < slots + 1; i++) {
                                    rows.push(
                                        <div className="mb-10">
                                            <div className="inline-flex">
                                                <label htmlFor={`slot-${i}-1`} className="w-[100px] block mb-2 text-sm font-medium text-gray-900">Slot {i}</label>
                                                <select id={`slot-${i}-1`}
                                                    onChange={(e) => handleFirstSlot(e, i)} 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                    <option disabled>Choose your first pokemon</option>
                                                    <option value="0" key="pokemon-0-1">None</option>
                                                    {
                                                        pokemons && 
                                                        pokemons.map((pokemon, index) => (
                                                            <option value={`${pokemon.id},${pokemon.attack_stat},${pokemon.defense_stat},${pokemon.speed_stat}`} key={`pokemon-${pokemon.id}-1`}>{pokemon.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <select id={`slot-${i}-2`}
                                                    onChange={(e) => handleSecondSlot(e, i)} 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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

                                    );
                                }
                                return (<div>{rows}</div>);
                            })()
                        }
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    {
                        showAlert === true && message !== "" &&
                        <div className={`${isError ? 'bg-red-100 dark:bg-red-200' : 'bg-green-100 dark:bg-green-200'} w-full mx-auto flex md:p-4 p-2 rounded-lg`} role="alert">
                            {isError ? 
                                <MdErrorOutline style={{ '--tw-text-opacity': 1, fontSize: '30px', fill: 'rgb(185 28 28 / var(--tw-text-opacity))' }} /> 
                                :
                                <MdCheckCircleOutline style={{ '--tw-text-opacity': 1, fontSize: '30px', fill: 'rgb(21 128 61 / var(--tw-text-opacity))' }} />
                            }
                            <span className="sr-only">Error</span>
                            <div className={`${isError ? 'text-red-700 dark:text-red-800' : 'text-green-700 dark:green-red-800' } ml-3 pt-[0.2rem] text-md font-medium`}>
                                {message}
                            </div>
                        </div>
                    }
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        {
                            loading && activeLeague ?
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300" role="status">
                                </div> 
                                :
                                <button onClick={() => handleRegister(firstSlot, secondSlot)} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    Register
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllLeagues;