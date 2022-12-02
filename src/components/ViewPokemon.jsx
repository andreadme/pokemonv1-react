import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import PokemonService from "../services/pokemon"

import style from "../assets/scss/pokemonCard.module.scss"
import Carousel from 'react-grid-carousel'

const ViewPokemon = () => {
    const { pokemonId } = useParams()
    const [ data, setData ] = useState({})
    const [ pokemons, setPokemons ] = useState([])
    
    useEffect(() => {
        retrievePokemon(pokemonId)
    }, [pokemonId])

    useEffect(() => {
        const authUser = localStorage.getItem('auth_user')
        getTrainerPokemons((JSON.parse(authUser)).id)
    })

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

    async function getTrainerPokemons() {
        try {
            let authUser = localStorage.getItem('auth_user')
            let form = new FormData();
            form.append('trainerId', (JSON.parse(authUser)).id)

            const response = await PokemonService.getTrainerPokemons(form);
            console.log(response);
            if (response.status === 200) {
                setPokemons(response.data.data);
            }
        } catch(err) {
            console.log(err)
        };
    }

    return (
        <div className="w-full h-full">
            <div className="text-gray-600 text-[30px] font-bold text-center mb-5">My pokemons</div>
            {
                pokemons ?
                <Carousel cols={3} rows={1} gap={10} loop>
                    {
                        pokemons.map((current, index) => (
                            <Carousel.Item>
                            <div className={`${style.__pokemon_card_container}` 
                                    + (current.type === "electric" ? ' bg-gradient-to-r via-yellow-300 to-yellow-400' : '')
                                    + (current.type === "fire" ? ' bg-gradient-to-r from-orange-600 to-orange-500' : '')
                                    + (current.type === "water" ? ' bg-gradient-to-r from-sky-400 to-blue-500' : '')
                                    + (current.type === "grass" ? ' bg-gradient-to-r from-green-500 to-green-700' : '')
                                }>
                                <div className={`${style.__pokemon_card}`}>
                                    <div className={`${style.__background} flex ` 
                                        + (current.type === "electric" ? 'bg-[#a66808]' : '')
                                        + (current.type === "fire" ? 'bg-[#fa7818]' : '')
                                        + (current.type === "water" ? 'bg-[#395c95]' : '')
                                        + (current.type === "grass" ? 'bg-[#28c762]' : '')
                                        }>
                                        <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                    </div>
                                    <div className={`${style.__content} `
                                        + (current.type === "electric" ? 'bg-[#feea78]' : '')
                                        + (current.type === "fire" ? 'bg-[#fccc3e]' : '')
                                        + (current.type === "water" ? 'bg-[#96dbfc]' : '')
                                        + (current.type === "grass" ? 'bg-[#b1f4c9]' : '')
                                        }>
                                        <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                        <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                        <div className={`${style.__pokemon_stats}`}>
                                            <p>Attack : <span>{current.attack_stat}</span></p>
                                            <p>Defense : <span>{current.defense_stat}</span></p>
                                            <p>Speed : <span>{current.speed_stat}</span></p>
                                        </div>
                                        
                                        <h1 className={`${style.__pokemon_logo}`}>Pickahu</h1>
                                    </div>
                                </div>
                            </div>
                            </Carousel.Item>
        
                        ))
                    }
                </Carousel>
                :
                <div>You have no pokemons.</div>
            }
        </div>
    );
};

export default ViewPokemon;