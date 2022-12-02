/* Import React **/
import React, { useState, useEffect } from "react" 

/* Import Styles **/
import style from "../assets/scss/table.module.scss"

/* Import Components **/
import ViewMySlots from "../components/ViewMySlots"
import ViewMySlotsRecords from "../components/ViewMySlotsRecords"

/* Import Services **/
import SlotService from "../services/slot"

const Profile = () => {
    const [ data, setData ] = useState([])
    const [ activeLeague, setActiveLeague ] = useState(0)
    const [ overall, setOverall ] = useState(0)
    
    useEffect(() => {
        const authUser = localStorage.getItem('auth_user')
        retrieveMySlots((JSON.parse(authUser)).id)
    })

    async function retrieveMySlots(id) {
        try {
            const response = await SlotService.getTrainerSlots(id);
            if (response.status === 200) {
                console.log(response.data.data)
                setData(response.data.data)
                let overall = response.data.data[activeLeague]?.slots[0]?.firstPokemon?.totalOverall ? response.data.data[activeLeague]?.slots[0]?.firstPokemon?.totalOverall : response.data.data[activeLeague]?.slots[0]?.secondPokemon?.totalOverall
                setOverall(overall)
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
        <div className="w-full my-32">
            <div className="max-w-[1200px] mx-auto p-5">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="md:flex md:items-center my-20">
                        <div className={`${style.__table_container} h-[50rem] relative`}>
                            <div className={`${style.__fold}`}>
                                </div>
                            <div className={`${style.__fold_sm}`}></div>
                            <div className={`${style.__triangle}`}><div className={`${style.__triangle_inner}`}></div></div>
                            <div className={`${style.__fold_cover}`}></div>
                            <div className={`${style.__circle}`}>
                                <div className={`${style.__inner_circle}`}></div>
                            </div>
                            <div className={`${style.__ellipsis_1}`}></div>
                            <div className={`${style.__ellipsis_2}`}></div>
                            <div className={`${style.__ellipsis_3}`}></div>
                            <div className={`${style.__table_card} md:flex md:flex-row flex-col`}>
                                <div className={`${style.__back} flex`}>
                                    <ViewMySlots data={data} activeLeague={activeLeague} handleLeague={handleLeague} />
                                </div>
                                
                                <div className={`${style.__divider}`}></div>
                                
                                <div className={`${style.__front} relative`}>
                                    <div className={`${style.__front_fold}`}></div>
                                    <div className={`${style.__front_triangle}`}>
                                        <div className={`${style.__front_inner_triangle}`}></div>
                                    </div>
                                    <ViewMySlotsRecords data={data} activeLeague={activeLeague} handleLeague={handleLeague} overall={overall}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default Profile;