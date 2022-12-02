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
        retrieveAllPokemonsByTrainer((JSON.parse(authUser)).id)
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

    return (
        <div className="w-full h-full">
            <div className="text-gray-600 text-[30px] font-bold text-center mb-5 mt-10">My Pokémons</div>
            {
                pokemons ?
                <Carousel cols={3} rows={1} gap={10} loop>
                    {
                        pokemons.map((current, index) => {
                            if (current.type === "electric" || current.type === "psychic") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-yellow-300 to-yellow-400`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#a66808]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#feea78]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "fire" || current.type === "fighting") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-orange-600 to-orange-500`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#fa7818]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#fccc3e]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "water" || current.type === "ice") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-sky-400 to-blue-500`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#395c95]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#96dbfc]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "grass" || current.type === "bug") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-green-500 to-green-700`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#28c762]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#b1f4c9]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "normal") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-gray-100 to-gray-300`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#79726d]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#f8f8f8]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "ground" || current.type === "rock") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-[#e59a53] to-[#ab6135]`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#79311b]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#e4ad7b]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "fairy" || current.type === "dragon") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-red-300 to-yellow-200`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#de9a9f]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-red-200`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            } else if (current.type === "steel") {
                                return (<Carousel.Item>
                                    <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600`} >
                                        <div className={`${style.__pokemon_card}`}>
                                            <div className={`${style.__background} flex bg-[#515b69]`}>
                                                <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                            </div>
                                            <div className={`${style.__content} bg-[#e2e5e9]`}>
                                                <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                                <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                                <div className={`${style.__pokemon_stats}`}>
                                                    <p>Attack : <span>{current.attack_stat}</span></p>
                                                    <p>Defense : <span>{current.defense_stat}</span></p>
                                                    <p>Speed : <span>{current.speed_stat}</span></p>
                                                </div>
                                                
                                                <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    </Carousel.Item>)
                            }
                            return (
                                <Carousel.Item>
                                <div className={`${style.__pokemon_card_container} bg-gradient-to-r from-gray-700 via-gray-900 to-black`}>
                                    <div className={`${style.__pokemon_card}`}>
                                        <div className={`${style.__background} flex bg-[#d2d0f3]`}>
                                            <img className={`${style.__image} mx-auto my-auto`} src="assets/images/pokeball.png" alt="" />
                                        </div>
                                        <div className={`${style.__content} bg-[#343e4e]`}>
                                            <h1 className={`${style.__pokemon_name} uppercase`}>{current.name}</h1>
                                            <span className={`${style.__pokemon_type}`}>{current.type}</span>
                                            <div className={`${style.__pokemon_stats}`}>
                                                <p>Attack : <span>{current.attack_stat}</span></p>
                                                <p>Defense : <span>{current.defense_stat}</span></p>
                                                <p>Speed : <span>{current.speed_stat}</span></p>
                                            </div>
                                            
                                            <h1 className={`${style.__pokemon_logo}`}>{current.name}</h1>
                                        </div>
                                    </div>
                                </div>
                                </Carousel.Item>
                            );
                        })
                    }
                </Carousel>
                :
                <div>You have no pokemons.</div>
            }
        </div>
    );
};

export default ViewPokemon;