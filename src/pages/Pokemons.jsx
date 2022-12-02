import React, { useState, useEffect } from "react" 

import LeagueService from "../services/league"

import { MdKeyboardArrowDown } from 'react-icons/md'
import AddPokemon from "../components/AddPokemon"
import ViewPokemon from "../components/ViewPokemon"

const Pokemons = () => {
    return (
        <>
        <div className="w-full my-32">
            <div className="max-w-[1200px] mx-auto p-5">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <AddPokemon />
                    <ViewPokemon />
                </div>
            </div>
        </div>
        </>
    )
} 

export default Pokemons;