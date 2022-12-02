import React, { useState, useEffect } from "react"

const ViewMySlotsRecords = ({ data, activeLeague, handleLeague, overall }) => {
    // const [ overall, setOverall ] = useState(0)

    // useEffect(() => {
    //     handleOverall(overall)
    // })

    // const handleOverall = (val) => {
    //     setOverall(val)
    // }


    return (
        <>
            <div className="w-full h-[655px] self-end p-10" style={{ paddingTop: '220px' }}>
                {
                    data && activeLeague !== 0 &&
                    <>
                    <div className="md:flex md:items-center flex-col">
                        <table className="min-w-full text-center p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <thead className="border-b">
                                <tr>
                                    <th scope="col" className="text-md font-press-start text-gray-900 py-2">
                                    Total Atk
                                    </th>
                                    <th scope="col" className="text-md font-press-start text-gray-900">
                                    Total Def
                                    </th>
                                    <th scope="col" className="text-md font-press-start text-gray-900">
                                    Total Spd
                                    </th>
                                    <th scope="col" className="text-md font-press-start text-gray-900">
                                    Total/Slot
                                    </th>
                                    {/* <th scope="col" className="text-md font-press-start text-gray-900">
                                    Overall
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data[activeLeague]?.slots?.map((slot, index) => (
                                        <tr className="border-b">
                                            <td className=" text-gray-900 font-press-start py-2 whitespace-nowrap">
                                                {
                                                    slot.firstPokemon ? (<span className="text-md font-press-start">{slot.firstPokemon.totalAttackStat}</span>) : (<span className="text-md font-press-start">{slot.secondPokemon.totalAttackStat}</span>)
                                                }
                                            </td>
                                            <td className=" text-gray-900 font-press-start py-2 whitespace-nowrap">
                                                {
                                                    slot.firstPokemon ? (<span className="text-md font-press-start">{slot.firstPokemon.totalDefenseStat}</span>) : (<span className="text-md font-press-start">{slot.secondPokemon.totalDefenseStat}</span>)
                                                }
                                            </td>
                                            <td className=" text-gray-900 font-press-start py-2 whitespace-nowrap">
                                                {
                                                    slot.firstPokemon ? (<span className="text-md font-press-start">{slot.firstPokemon.totalSpeedStat}</span>) : (<span className="text-md font-press-start">{slot.secondPokemon.totalSpeedStat}</span>)
                                                }
                                            </td>
                                            <td className=" text-gray-900 font-press-start py-2 whitespace-nowrap">
                                                {
                                                    slot.firstPokemon ? (<span className="text-md font-press-start">{slot.firstPokemon.totalPerSlot}</span>) : (<span className="text-md font-press-start">{slot.secondPokemon.totalPerSlot}</span>)
                                                }
                                            </td>
                                            {/* {
                                                setOverall(slot.firstPokemon.totalOverall ? slot.firstPokemon.totalOverall : slot.secondPokemon.totalOverall)
                                            } */}
                                            {/* <input type="hidden" id="inline-overall" 
                                            value={slot.firstPokemon.totalOverall ? slot.firstPokemon.totalOverall : slot.secondPokemon.totalOverall}
                                            onChange={(e) => handleOverall(e)}
                                            className="invisible hidden" /> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="max-w-[500px] mx-auto p-5">
                            <div className="p-5 bg-[#a3b97a] text-white text-[18px] font-bold text-center mb-5 font-press-start">
                            {
                                overall &&
                                    (<span className="text-md font-press-start">
                                        Overall
                                        <br />
                                        {overall}
                                    </span>)
                            }
                            </div>
                        </div>
                    </div>
                    </>
                }
            </div>
        </>

    );
};

export default ViewMySlotsRecords;