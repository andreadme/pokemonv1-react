import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

import { MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md'

import { useNavigate, useLocation } from "react-router-dom"

import TrainerService from "../services/trainer"

// import sobbleGIF from '../../public/assets/gifs/846201_monnotonne_sobble.gif'


const Login = () => {
    const { register, handleSubmit, formState:{ errors } } = useForm()
    const [ loading, setLoading ] = React.useState(false)
    const [ message, setMessage ] = React.useState("")
    const [ isError, setIsError ] = React.useState(false)
    const navigate = useNavigate()

    // retrieve auth_user key from local storage
    useEffect(() => {
        if (localStorage.getItem('auth_user')) {
            navigate("/view-all/league")
        }
    }, [])

    function onSubmit(values) {
        resetForm()
        setLoading(true)
        TrainerService.login(values)
        .then((response) => {
                if (response.status === 200) {
                    setForm(false, response.data.message)
                    localStorage.setItem('auth_user', JSON.stringify(response.data.data[0]))
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(error);
                setForm(true, error.response.data.message)
            })
            .finally(() => setLoading(false));
    }

    const showPassword = () => {
        var x = document.getElementById("inline-password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const resetForm = () => {
        setIsError(false)
        setMessage("")
    }

    const setForm = (errorVal, message) => {
        setIsError(errorVal)
        setMessage(message)
    }

    return (
        <div className="w-full my-32">
            <div className="max-w-[500px] mx-auto p-5">
                <div className="text-gray-600 text-[30px] font-bold text-center mb-5">Pokemon Trainer Login</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="w-[90%] mx-auto bg-purple-200 p-4">
                            <span className="text-gray-500 font-bold md:text-center">
                                ADMIN
                                <br />
                                username: <span className="text-gray-900">superadmin</span>, password: <span className="text-gray-900">admin123</span>
                            </span>
                            <br />
                            <span className="text-gray-500 font-bold md:text-center">
                                CLIENT
                                <br />
                                username: <span className="text-gray-900">ashketchum</span>, password: <span className="text-gray-900">S!mpl3</span>
                            </span>
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
                                maxLength: { value: 20, message: "Your name can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${errors.username ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.username?.message}</p>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Password
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input type="password" id="inline-password" 
                                {...register("password", { required: { value: true, message: "You need to enter a password."}, 
                                maxLength: { value: 20, message: "Your name can't be more than 20 characters."} })} 
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${errors.password ? 'ring-2 ring-red-500' : 'focus:border-purple-500'}`} />
                            <p className="text-red-500 text-xs italic">{errors.password?.message}</p>

                            <input onClick={() => showPassword()} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="inline-checkbox" />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="inline-checkbox">
                                Show password
                            </label>
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
                                        Login
                                    </button>
                            }
                        </div>
                    </div>


                </form>
                <div className="md:flex md:items-center mb-6 relative">
                    <img className="absolute right-0 w-[120px] h-[150px]" src="assets/gifs/846201_monnotonne_sobble.gif" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;