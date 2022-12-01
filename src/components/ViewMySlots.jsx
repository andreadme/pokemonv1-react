import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import SlotService from "../services/slot"

const ViewMySlots = () => {
    // const { trainerId } = useParams()
    const [ data, setData ] = useState([])
    const [ activeLeague, setActiveLeague ] = useState("")
    
    useEffect(() => {
        const authUser = localStorage.getItem('auth_user')
        retrieveMySlots(JSON.parse(authUser).id)
    })

    async function retrieveMySlots(id) {
        try {
            const response = await SlotService.getTrainerSlots(id);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data.data)
                setData(response.data.data)
            }
        } catch(err) {
            console.log(err)
        };
    }

    const handleLeague = (e, index) => {
        setActiveLeague(e.target.value)
    }

    return (
        <div className="w-full h-full my-32">
            <div className="max-w-[500px] mx-auto p-5">
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">My Slots</div>
                {/* <select id="league"
                    onChange={(e) => handleLeague(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option disabled>Choose a league</option>
                    <option value="0" key={`league-none`}>None</option>
                    {
                        data && 
                        data.map((current, index) => (
                            <option value={`${current.leagueName}`} key={`league-${current.leagueName}`}>{current.leagueName}</option>
                        ))
                    }
                </select> */}
                {
                    data &&
                    data.map((league, index) => (
                        <div key={`container-${index}`}>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-name">
                                        League name
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <span id="inline-name" className="text-gray-500 font-bold">{league.leagueName}</span>
                                </div>
                            </div>

                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-name">
                                        Start date
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <span id="inline-name" className="text-gray-500 font-bold">{league.startDate}</span>
                                </div>
                            </div>

                            <div className="md:flex md:items-center mb-6">
                                <table className="min-w-full text-center">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Slot
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            First Pokemon
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Second Pokemon
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            league.slots.map((slot, index) => (
                                                <tr className="border-b">
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {index+1}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {
                                                            slot.firstPokemon ? (<span>{slot.firstPokemon.pokemonName}</span>) : (<span></span>)
                                                        }
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {
                                                            slot.secondPokemon ? (<span>{slot.secondPokemon.pokemonName}</span>) : (<span></span>)
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewMySlots;