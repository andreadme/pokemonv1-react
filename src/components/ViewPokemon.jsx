import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import PokemonService from "../services/pokemon"

const ViewPokemon = () => {
    const { pokemonId } = useParams()
    const [ data, setData ] = useState({})
    
    useEffect(() => {
        retrievePokemon(pokemonId)
    }, [pokemonId])

    async function retrievePokemon(id) {
        try {
            const response = await PokemonService.get(id);
            console.log(response);
            if (response.status === 200) {
                setData(response.data.data[0]);
            }
        } catch(err) {
            console.log(err)
        };
    }

    return (
        <div className="w-full h-full my-32">
            <div className="max-w-[500px] mx-auto p-5">
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">Pokemon</div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-name">
                            Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <span id="inline-name" className="text-gray-500 font-bold">{data.name}</span>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-type">
                            Type
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <span id="inline-type" className="text-gray-500 font-bold">{data.type}</span>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-attack-stat">
                            Attack Stat
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <span id="inline-attack-stat" className="text-gray-500 font-bold">{data.attack_stat}</span>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-defense-stat">
                            Defense Stat
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <span id="inline-defense-stat" className="text-gray-500 font-bold">{data.defense_stat}</span>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-speed-stat">
                            Speed Stat
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <span id="inline-speed-stat" className="text-gray-500 font-bold">{data.speed_stat}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPokemon;