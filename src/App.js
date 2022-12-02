/** Import Components **/
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import AddLeague from './components/AddLeague'

import React from 'react'
import { Routes , Route } from "react-router-dom"
import NotFound from "./pages/NotFound"
import ComingSoon from "./pages/ComingSoon"
import ViewPokemon from './components/ViewPokemon'
import ViewMySlots from './components/ViewMySlots'
import Dashboard from './components/Dashboard'
import Pokemons from './pages/Pokemons'
import Leagues from './pages/Leagues'
import LeagueContextProvider from './context/LeagueContext'
import Profile from './pages/Profile'


function App() {
  return (
    <>
      <Navbar />
      <Routes> 
          <Route path ="/login" element= {<Login />}/> 
          <Route path ="/register" element= {<Register />}/>
          <Route path ="/" element= {<Dashboard />}/>
          {/* <Route path ="/pokemon" element= {<AddPokemon />}/> */}
          <Route path ="/pokemon" element= {<Pokemons />}/>
          <Route path ="/leagues" element= {<Leagues />}/>
          <Route path ="/profile" element= {<Profile />}/>
          <Route path ="/battles" element= {<ComingSoon />}/>
          <Route path ="/events" element= {<ComingSoon />}/>
          <Route path ="/news" element= {<ComingSoon />}/>
          <Route path ="/view-pokemon/:pokemonId" element={<ViewPokemon /> } /> 
          
          {/* admin route */}
          <Route path ="/create-league" element={<AddLeague /> } /> 

          
          {/* <Route path ="/view-all/league" element={<ViewAllLeagues /> } /> 
          <Route path ="/create-pokemon" element={<AddPokemon /> } /> 
          <Route path ="/view-pokemon/:pokemonId" element={<ViewPokemon /> } /> 
          <Route path ="/view-slot/:trainerId" element={<ViewMySlots /> } />  */}
          <Route path ="/*" element= {<NotFound />}/> 
      </Routes> 
    </>
  );
}

export default App;
