import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import PokemonService from "../services/pokemon"

import { MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md'

const AddPokemon = () => {
    const [ trainerId, setTrainerId ] = useState(1);
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ isError, setIsError] = useState(false);
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const [ pokemons, setPokemons ] = useState([])
    const [ pokemonName, setPokemonName ] = useState("")
    const [ pokemonType, setPokemonTyoe ] = useState("")
    
    useEffect(() => {
        if (errors) {
            resetForm();
        }
    }, [errors])

    useEffect(() => {
        let authUser = localStorage.getItem('auth_user')
        setTrainerId(JSON.parse(authUser).id)
    }, [])

    useEffect(() => {
        retrievePokemons();
    }, [])

    async function onSubmit(values) {
        const output = {
            ...values,
            name: pokemonName,
            type: pokemonType,
            trainerId: trainerId,
        }

        console.log(trainerId)

        setLoading(true)
        resetForm()
        try {
            const response = await PokemonService.create(output);
            if (response.status === 200) {
                setForm(false, response.data.message)
            }
        } catch(err) {
            setForm(true, err.response.data.message)
            console.log(err)
        }
        setLoading(false)
    }

    const retrievePokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
            .then(response => response.json())
            .then(data => {
                let results = data.results;
                console.log(results)
                let promisesArray = results.map(result => {
                return fetch(result.url).then(response => response.json())
                    // .then(data => console.log(data.types[0].type.name));
                })
                return Promise.all(promisesArray);
            }).then((data) => setPokemons(data), () => console.log('Main Pokemon State: ', pokemons));
    }

    const handlePokemonType = (e) => {
        e.preventDefault(e);
        let newVal = e.target.value.split(',');
        fetch(`https://pokeapi.co/api/v2/pokemon/${newVal[0]}`)
        .then(response => response.json())
        .then(data => {
            setPokemonName(newVal[1])
            setPokemonTyoe(data.types[0].type.name)
        });
    }

    const resetForm = () => {
        setMessage("")
        setIsError(false)
    }

    const setForm = (errorVal, message) => {
        setIsError(errorVal)
        setMessage(message)
    }

    return (
        <div className="w-full h-full">
            <div className="max-w-[500px] mx-auto p-5">
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">Register a new pokemon</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-name">
                                Name
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            {
                                pokemons &&
                                <select
                                    onChange={(e) => handlePokemonType(e)}
                                    onBlur={(e) => handlePokemonType(e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled>Choose your pokemon</option>
                                    {
                                        pokemons &&
                                        pokemons.map((pokemon, index) => (
                                            <option value={`${pokemon.id},${pokemon.name}`} key={`${pokemon.name}`}>{pokemon.name}</option>
                                        ))
                                    }
                                </select>
                            }
                            <input type="hidden" id="inline-name" 
                                value={pokemonName}
                                {...register("name", { value: `${pokemonName}` }, { required: { value: true, message: "You need to enter a name."} })}
                                
                                className="invisible hidden" />
                            <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-type">
                                Type
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-type"
                                readOnly
                                value={pokemonType}
                                {...register("type", { value: `${pokemonType}` }, { required: { value: true, message: "You need to enter a type."}, 
                                maxLength: { value: 20, message: "Your type can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.type ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.type?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-attack-stat">
                                Attack Stat
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="number" min="20" max="2000" id="inline-attack-stat" 
                                {...register("attackStat", { required: { value: true, message: "You need to enter a attack stat."},
                                    min: { value: 20, message: "The minimum value is 20."},
                                    max: { value: 2000, message: "The maximum value is 2000."} 
                                })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.attackStat ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.attackStat?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-defense-stat">
                                Defense Stat
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="number" min="20" max="2000" id="inline-defense-stat" 
                                {...register("defenseStat", { required: { value: true, message: "You need to enter a defense stat."}, 
                                    min: { value: 20, message: "The minimum value is 20."},
                                    max: { value: 2000, message: "The maximum value is 2000."} 
                                })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.defenseStat ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.defenseStat?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-speed-stat">
                                Speed Stat
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" min="20" max="2000" id="inline-speed-stat" 
                                {...register("speedStat", { required: { value: true, message: "You need to enter a speed stat."}, 
                                    min: { value: 20, message: "The minimum value is 20."},
                                    max: { value: 2000, message: "The maximum value is 2000."} 
                                })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.speedStat ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.speedStat?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                    {
                        message &&
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

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                        <input type="text" id="inline-trainer-id" 
                                {...register("trainerId", { value: {trainerId} })}
                                className="invisible hidden" />
                        </div>
                        <div className="md:w-2/3">
                            {
                                loading ?
                                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300" role="status">
                                    </div> 
                                    :
                                    <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        Add
                                    </button>
                            }
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default AddPokemon;