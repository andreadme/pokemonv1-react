import * as React from "react";

import TrainerService from "../services/trainer"

import { useNavigate } from "react-router-dom"

const authContext = React.createContext([{}, () => {}]);

function useAuth() {
    const [ authed, setAuthed ] = React.useState(false)
    const [ loading, setLoading ] = React.useState(false)
    const [ message, setMessage ] = React.useState("")
    const [ isError, setIsError ] = React.useState(false)
    const navigate = useNavigate()

    const setForm = (errorVal, message) => {
        setIsError(errorVal)
        setMessage(message)
    }

    function login(values) {
        resetForm()
        setLoading(true)
        TrainerService.login(values)
        .then((response) => {
                if (response.status === 200) {
                    setForm(false, response.data.message)
                    localStorage.setItem('auth_user', JSON.stringify(response.data.data[0]))
                    setAuthed(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setForm(true, error.response.data.message)
            })
            .finally(() => setLoading(false));
    }

    function logout() {
        localStorage.removeItem('auth_user')
        setAuthed(false)
        navigate("/login")
    }

    const resetForm = () => {
        setIsError(false)
        setMessage("")
    }

    const memoedValue = React.useMemo(
        () => ({
            authed,
            loading,
            message,
            isError,
            login,
            logout,
            setForm,
            resetForm,
            setLoading,
            setMessage,
            setIsError,
        }),
        [loading, message, isError]
    );

    return memoedValue;
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{auth.authed && children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}