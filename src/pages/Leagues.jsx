import React, { useState, useEffect } from "react" 

import AddLeague from "../components/AddLeague"
import ViewMySlots from "../components/ViewMySlots"
import ViewAllLeagues from "../components/ViewAllLeagues"

import style from "../assets/scss/table.module.scss"
import moment from "moment"
import LeagueContextProvider from "../context/LeagueContext"

const Leagues = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    const authUser = localStorage.getItem('auth_user')
    
    useEffect(() => {
        if(localStorage.getItem('auth_user')) {
            setIsAdmin((JSON.parse(authUser)).is_admin)
        }

    }, [authUser])

    return (
        <>
        <div className="w-full my-32">
            <div className="max-w-[1200px] mx-auto p-5">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    {
                        isAdmin ?
                        <AddLeague />
                        :
                        <>
                        <div className="md:flex md:items-center my-20">
                            <div className={`${style.__table_container} h-[50rem] relative`}>
                                <div className={`${style.__fold}`}>
                                    {/* <span className={`${style.__fold_title}`}>{data[activeLeague].leagueName}</span>
                                    <span className={`${style.__fold_date}`}>{moment(data[activeLeague].startDate).format("DD-MM-YYYY")}</span> */}
                                    </div>
                                <div className={`${style.__fold_sm}`}></div>
                                <div className={`${style.__triangle}`}><div className={`${style.__triangle_inner}`}></div></div>
                                <div className={`${style.__fold_cover}`}></div>
                                <div className={`${style.__table_card} md:flex md:flex-row flex-col`}>
                                    <div className={`${style.__back} flex`}>
                                        <ViewAllLeagues />
                                    </div>
                                    
                                    <div className={`${style.__divider}`}></div>
                                    
                                    <div className={`${style.__front} relative`}>
                                        <div className={`${style.__front_fold}`}></div>
                                        <div className={`${style.__front_triangle}`}>
                                            <div className={`${style.__front_inner_triangle}`}></div>
                                        </div>
                                        <ViewMySlots />
                                            
                                        {/* <div className={`${style.__front_fold}`}></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
        </>
    )
} 

export default Leagues;