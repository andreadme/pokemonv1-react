import React, { useEffect, useState, useContext } from "react"
import LeagueContext from "../context/LeagueContext";

import SlotService from "../services/slot"

const ViewMySlots = () => {
    // const { trainerId } = useParams()
    const [ data, setData ] = useState([])
    const [ activeLeague, setActiveLeague ] = useState(0)
    
    useEffect(() => {
        const authUser = localStorage.getItem('auth_user')
        retrieveMySlots((JSON.parse(authUser)).id)
    })

    async function retrieveMySlots(id) {
        try {
            const response = await SlotService.getTrainerSlots(id);
            if (response.status === 200) {
                setData(response.data.data)
            }
        } catch(err) {
            console.log(err)
        };
    }

    const handleLeague = (e) => {
        setActiveLeague(e.target.value)
    }

    return (
        <>
            <div className="h-[655px] self-end p-10">
                <div className="max-w-[500px] mx-auto p-5">
                <div className="text-white text-[30px] font-bold text-center mb-5 font-press-start">My Slots</div>

                                <select id="league"
                                    onChange={(e) => handleLeague(e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                                    <option disabled>Choose a league</option>
                                    <option value="0" key={`league-none`}>None</option>
                                    {
                                        data && 
                                        data.map((current, index) => (
                                            <option value={`${index}`} key={`league-${current.leagueName}`}>{current.leagueName}</option>
                                        ))
                                    }
                                </select>
                </div>
                    {
                        data && activeLeague &&
                        <>
                        <div className="md:flex md:items-center">
                            <table className="min-w-full text-center">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="text-xl font-medium text-gray-900 py-2">
                                        Slot
                                        </th>
                                        <th scope="col" className="text-xl font-medium text-gray-900">
                                        First Pokemon
                                        </th>
                                        <th scope="col" className="text-xl font-medium text-gray-900">
                                        Second Pokemon
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data[activeLeague].slots.map((slot, index) => (
                                            <tr className="border-b">
                                                <td className="text-lg text-gray-900 font-medium py-2 whitespace-nowrap">
                                                    {index+1}
                                                </td>
                                                <td className="text-lg text-gray-900 font-medium py-2 whitespace-nowrap">
                                                    {
                                                        slot.firstPokemon ? (<span>{slot.firstPokemon.pokemonName}</span>) : (<span></span>)
                                                    }
                                                </td>
                                                <td className="text-lg text-gray-900 font-medium py-2 whitespace-nowrap">
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
                        </>
                    }
            </div>
        </>

    );
};

export default ViewMySlots;