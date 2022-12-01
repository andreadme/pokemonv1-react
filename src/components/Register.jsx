import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import TrainerService from "../services/trainer"

import { MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md'

const Register = () => {
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ isError, setIsError] = useState(false);
    const { register, handleSubmit, formState:{ errors } } = useForm();
    
    useEffect(() => {
        if (errors.fullName?.message) {
            resetForm();
        }
    }, [errors.fullName?.message])

    async function onSubmit(values) {
        setLoading(true)
        resetForm();
        try {
            const response = await TrainerService.register(values);
            console.log(response)
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
        <div className="w-full my-32">
            <div className="max-w-[500px] mx-auto p-5">
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">Pokemon Trainer Register</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Full Name
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-full-name" 
                                {...register("fullName", { required: { value: true, message: "You need to enter your full name."}, 
                                maxLength: { value: 20, message: "Your full name can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${errors.fullName ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.fullName?.message}</p>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username">
                                Username
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-username" 
                                {...register("username", { required: { value: true, message: "You need to enter a username."}, 
                                maxLength: { value: 20, message: "Your username can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${errors.username ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.username?.message}</p>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="email" id="inline-email" 
                                {...register("email", { required: { value: true, message: "You need to enter a email."}, 
                                maxLength: { value: 20, message: "Your email can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${errors.email ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="text" id="inline-password" 
                                {...register("password", { required: { value: true, message: "You need to enter a password."}, 
                                maxLength: { value: 20, message: "Your password can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${errors.password ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
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
                                        Register
                                    </button>
                            }
                        </div>
                    </div>
                </form>

                <div className="md:flex md:items-center mb-6 relative">
                    <img className="absolute right-0 w-[120px] h-[150px]" src="assets/gifs/download.gif" alt="" />
                </div>
            </div>


        </div>
    );
};

export default Register;