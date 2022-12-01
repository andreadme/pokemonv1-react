import React, { useState, useEffect } from 'react'

/** Import Icons **/
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Link, NavLink } from "react-router-dom"

import { useNavigate, useLocation } from "react-router-dom"

import style from "../assets/scss/navbar.module.scss"

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const handleClick = () => setNav(!nav)
    
    const navigate = useNavigate()
    const location = useLocation()

    const authUser = localStorage.getItem('auth_user')

    useEffect(() => {
        if(localStorage.getItem('auth_user')) {
            setIsAdmin((JSON.parse(authUser)).is_admin)
        }

    }, [authUser])

    const handleLogout = () => {
        setTimeout(() => {
            localStorage.removeItem('auth_user')
            navigate("/login")
        }, 1000)


    }

    return (
        <div className='w-full h-[87px] z-10 bg-[#FFF] text-[#FFFFFF] fixed top-0' style={{ borderBottom: '2px solid #f0f0f0'}}>
            <div className='max-w-[995px] mx-auto px-5 flex justify-center items-center w-full h-full'>
                <div className='w-full flex items-center'>
                    <ul className='w-full hidden md:flex md:w-full'>
                        <li className={`${style.__nav_container} ${location.pathname === "/" ? "active" : ""} group nav-home flex-1`}>
                            <NavLink to="/" className={` ${style.__nav_link} p-2 md:p-4`}>
                                <span className={`${style.__nav_fill} bg-[#424242]`}></span>
                                <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-pikachu-pokemon-48.png" alt=""/></span>
                                <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Home</span>
                            </NavLink>
                        </li>
                        {
                            authUser && isAdmin &&
                            <>
                                <li className={`${style.__nav_container} group nav-leagues flex-1`}>
                                <Link to="/create-league" className={`${style.__nav_link} p-2 md:p-4`}>
                                    <span className={`${style.__nav_fill} bg-[#EE6B2F]`}></span>
                                    <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-insignia-3-stars-48.png" alt=""/></span>
                                    <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Leagues</span>
                                </Link>
                                </li>
                            </>
                        }
                        {
                            authUser && !isAdmin &&
                            <>
                                <li className={`${style.__nav_container} group nav-pokedex flex-1`}>
                                <Link to="/pokedex" className={`${style.__nav_link} p-2 md:p-4`}>
                                    <span className={`${style.__nav_fill} bg-[#E3350D] active:bg-violet-700`}></span>
                                    <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-meowth-48.png" alt=""/></span>
                                    <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Pokémon</span>
                                </Link>
                                </li>
                                <li className={`${style.__nav_container} group nav-leagues flex-1`}>
                                <Link to="/leagues" className={`${style.__nav_link} p-2 md:p-4`}>
                                    <span className={`${style.__nav_fill} bg-[#EE6B2F]`}></span>
                                    <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-insignia-3-stars-48.png" alt=""/></span>
                                    <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Leagues</span>
                                </Link>
                                </li>
                                <li className={`${style.__nav_container} group nav-profile flex-1`}>
                                    <Link to="/profile" className={`${style.__nav_link} p-2 md:p-4`}>
                                        <span className={`${style.__nav_fill} bg-[#E6BC2F]`}></span>
                                        <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-crown-pokemon-48.png" alt=""/></span>
                                        <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Profile</span>
                                    </Link>
                                </li>
                            </>
                        }
                        <li className={`${style.__nav_container} group nav-battles flex-1`}>
                            <Link to="/battles" className={`${style.__nav_link} p-2 md:p-4`}>
                                <span className={`${style.__nav_fill} bg-[#4DAD5B]`}></span>
                                <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-meowth-48.png" alt=""/></span>
                                <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Battles</span>
                            </Link>
                        </li>
                        <li className={`${style.__nav_container} group nav-events flex-1`}>
                            <Link to="/events" className={`${style.__nav_link} p-2 md:p-4`}>
                                <span className={`${style.__nav_fill} bg-[#30A7D7]`}></span>
                                <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-insignia-3-stars-48.png" alt=""/></span>
                                <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Events</span>
                            </Link>
                        </li>
                        <li className={`${style.__nav_container} group nav-news flex-1`}>
                            <Link to="/news" className={`${style.__nav_link} p-2 md:p-4`}>
                                <span className={`${style.__nav_fill} bg-[#1B53BA]`}></span>
                                <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-crown-pokemon-48.png" alt=""/></span>
                                <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>News</span>
                            </Link>
                        </li>
                        {
                            authUser ? 
                            <>
                                <li className={`${style.__nav_container} group nav-control flex-1`}>
                                    <Link onClick={handleLogout} className={`${style.__nav_link} p-2 md:p-4`}>
                                        <span className={`${style.__nav_fill} bg-[#313131]`}></span>
                                        <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-valor-red-48.png" alt=""/></span>
                                        <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Logout</span>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className={`${style.__nav_container} group nav-control flex-1`}>
                                    <Link to="/login" className={`${style.__nav_link} p-2 md:p-4`}>
                                        <span className={`${style.__nav_fill} bg-[#111827]`}></span>
                                        <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-instinct-48.png" alt=""/></span>
                                        <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Login</span>
                                    </Link>
                                </li>
                                <li className={`${style.__nav_container} group nav-control flex-1`}>
                                    <Link to="/register" className={`${style.__nav_link} p-2 md:p-4`}>
                                        <span className={`${style.__nav_fill} bg-[#111827]`}></span>
                                        <span className={`${style.__nav_logo} mx-auto`}><img src="assets/icons/icons8-snorlax-48.png" alt=""/></span>
                                        <span className={`${style.__nav_title} group-hover:text-white text-[#464646]`}>Register</span>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                <div className='md:hidden mr-4' onClick={handleClick}>
                    {!nav ? <MenuIcon className='w-5' style={{ stroke: '#111827', fill: '#111827 !important' }} /> : <XIcon className='w-5' style={{ stroke: '#111827', fill: '#111827 !important' }} />}
                
                </div>
            </div>

            <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
                <div className='flex flex-col my-4'>
                    {
                        authUser && isAdmin &&
                        <Link to="/create-league">
                            <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Leagues</button>
                        </Link>
                    }
                    {
                        authUser && !isAdmin &&
                        <>
                            <Link to="/pokedex">
                                <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Pokémon</button>
                            </Link>
                            <Link to="/leagues">
                                <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Leagues</button>
                            </Link>
                            <Link to="/profile">
                                <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Profile</button>
                            </Link>
                        </>
                    }
                
                    <Link to="/battles">
                        <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Battles</button>
                    </Link>
                    <Link to="/events">
                        <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Events</button>
                    </Link>
                    <Link to="/news">
                        <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">News</button>
                    </Link>
                    {
                        authUser ? 
                        <Link onClick={handleLogout}>
                            <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Logout</button>
                        </Link>
                        :
                        <>
                        <Link to="/login">
                            <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Sign In</button>
                        </Link>
                        <Link to="/register">
                            <button className="text-[#111827] w-full md:mb-0 mb-2 px-8 py-3">Sign Up</button>
                        </Link>
                        </>
                    }
                </div>
            </ul>
        </div>
        
    );
};

export default Navbar;