import React, { useState, useEffect } from "react" 

import LeagueService from "../services/league"

import { MdKeyboardArrowDown } from 'react-icons/md'
import ViewLeagueSlots from "../components/ViewLeagueSlots"

const Leagues = () => {
    const [ slots, setSlots ] = useState(0)
    const [ leagues, setLeagues ] = useState([])
    const [ leagueMenu, setLeagueMenu ] = useState(false)
    const [ firstSlot, setFirstSlot ] = useState([])
    const [ secondSlot, setSecondSlot ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ isError, setIsError ] = useState(false)
    const [ activeLeague, setActiveLeague ] = useState(null)
    const [ maxLimit, setMaxLimit ] = useState(0)

    useEffect(() => {
        retrieveAllLeagues()
    }, [])

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

    const initializeArray = (slots) => {
        for (let u = 0; u < slots; u++) {
            firstSlot[u] = { 'slotNo': u + 1, 'pokemonId': 0, 'orderNo': 1, 'attackStat': 0, 'defenseStat': 0, 'speedStat': 0 };
        }

        for (let u = 0; u < slots; u++) {
            secondSlot[u] = { 'slotNo': u + 1, 'pokemonId': 0, 'orderNo': 2, 'attackStat': 0, 'defenseStat': 0, 'speedStat': 0 };
        }

        console.log(firstSlot)
        console.log(secondSlot)
    }

    const handleClick = (id) => {
        setIsError(false);
        setMessage("");
        setFirstSlot([]);
        setSecondSlot([]);
        setActiveLeague(id)
        retrieveLeague(id)
    }

    return (
        <>
        <div className="w-full my-32">
            <div className="max-w-[1200px] mx-auto p-5">
                <div className="container flex flex-row items-center justify-center px-5 mx-auto my-8">
                    <div className="md:w-1/3 text-center">
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
                        <ViewLeagueSlots 
                            message={message} 
                            slots={slots} 
                            firstSlot={firstSlot}
                            secondSlot={secondSlot}
                            isError={isError} 
                            activeLeague={activeLeague}
                            maxLimit={maxLimit}
                            setMaxLimit={setMaxLimit}
                            setMessage={setMessage}
                            setIsError={setIsError}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default Leagues;