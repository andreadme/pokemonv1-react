import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import LeagueService from "../services/league"

import { MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md'

const AddLeague = () => {
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ isError, setIsError] = useState(false);
    const { register, handleSubmit, formState:{ errors } } = useForm();
    
    useEffect(() => {
        if (errors) {
            resetForm();
        }
    }, [errors])

    async function onSubmit(values) {
        console.log(values)
        setLoading(true)
        resetForm();
        try {
            const response = await LeagueService.create(values);
            if (response.status === 200) {
                setForm(false, response.data.message)
            }
        } catch(err) {
            setForm(true, err.response.data.message)
            console.log(err)
        };
        setLoading(false);
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
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">Register a new league</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-title">
                                Title
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-title" 
                                {...register("title", { required: { value: true, message: "You need to enter a title."}, 
                                maxLength: { value: 20, message: "Your title can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.title ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.title?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-location">
                                Location
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-location" 
                                {...register("location", { required: { value: true, message: "You need to enter a location."}, 
                                maxLength: { value: 20, message: "Your location can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.location ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.location?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-terrain">
                                Terrain
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-terrain" 
                                {...register("terrain", { required: { value: true, message: "You need to enter a terrain."}, 
                                maxLength: { value: 20, message: "Your terrain can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.terrain ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.terrain?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-start-date">
                                Start Date
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <div className="datepicker">
                                <input type="date" id="inline-start-date" 
                                    {...register("startDate", { required: { value: true, message: "You need to enter a date."}, 
                                    maxLength: { value: 20, message: "Your terrain can't be more than 20 characters."} })} 
                                    className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                        focus:outline-none focus:bg-white ${errors.startDate ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                                <p className="text-red-500 text-xs italic">{errors.startDate?.message}</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-slots">
                                Number of Slots
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="number" min="1" max="5" id="inline-slots" 
                                {...register("slots", { required: { value: true, message: "You need to enter a slot."}, 
                                min: { value: 1, message: "The minimum value is 1."},
                                max: { value: 5, message: "The maximum value is 5."},
                            })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.slots ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.slots?.message}</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-max-stats-limit">
                                Maximum Stats Limit
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="number" min="500" max="10000" id="inline-max-stats-limit" 
                                {...register("maxStatsLimit", {
                                required: { value: true, message: "You need to enter a maximum stats limit."}, 
                                min: { value: 500, message: "The minimum value is 500."},
                                max: { value: 10000, message: "The maximum value is 10,000."},
                            })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                                    focus:outline-none focus:bg-white ${errors.maxStatsLimit ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.maxStatsLimit?.message}</p>
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
                        <div className="md:w-1/3"></div>
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

export default AddLeague;