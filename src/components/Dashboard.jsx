import React, { useEffect, useState } from 'react'

import style from "../assets/scss/_common.module.scss"

import PokemonService from "../services/pokemon"
import LeagueService from "../services/league"
import TrainerService from "../services/trainer"
import trainer from '../services/trainer'

const Dashboard = () => {
    const [ pokemonCount, setPokemonCount ] = useState(0)
    const [ trainerCount, setTrainerCount ] = useState(0)
    const [ leagueCount, setLeagueCount ] = useState(0)

    useEffect(() => {
        handlePokemonCount();
        handleTrainerCount();
        handleLeagueCount();
    }, [])

    async function handlePokemonCount() {
        try {
            const response = await PokemonService.getAll();
            if (response.status === 200) {
                setPokemonCount(response.data.data.length)
            }
        } catch(err) {
            console.log(err)
        }
    }

    async function handleTrainerCount() {
        try {
            const response = await TrainerService.getAll();
            if (response.status === 200) {
                setTrainerCount(response.data.data.length)
            }
        } catch(err) {
            console.log(err)
        }
    }

    async function handleLeagueCount() {
        try {
            const response = await LeagueService.getAll();
            if (response.status === 200) {
                setLeagueCount(response.data.data.length)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div name='dashboard' className="w-full" >
            <div className='max-w-[1240px] mx-auto my-32'>
                <div className='text-center my-[20px]'>
                    <h2 className='text-5xl text-[#111827] font-bold'>Lorem ipsum dolor sit amet consectetur</h2>
                    <p className='text-3xl py-6 text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque asperiores earum placeat veritatis dignissimos itaque.</p>
                </div>

                <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                    <div className="border py-8 rounded-xl shadow-xl bg-[#111827]" >
                        <p className='text-6xl font-bold text-white'>{pokemonCount !== 0 || pokemonCount !== null ? pokemonCount : 0}</p>
                        <p className='text-white mt-2 text-2xl'>Registered Pokemons</p>
                    </div>
                    <div  className='border py-8 rounded-xl shadow-xl bg-[#111827]' >
                        <p className='text-6xl font-bold text-white'>{leagueCount !== 0 || leagueCount !== null ? leagueCount : 0}</p>
                        <p className='text-white mt-2 text-2xl'>Registered Leagues</p>
                    </div>
                    <div  className='border py-8 rounded-xl shadow-xl bg-[#111827]' >
                        {/* less admin */}
                        <p className='text-6xl font-bold text-white'>{trainerCount !== 0 || trainerCount !== null ? trainerCount : 0}</p>
                        <p className='text-white mt-2 text-2xl'>Registered Trainers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard