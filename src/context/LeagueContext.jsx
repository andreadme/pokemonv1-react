import React, { createContext , useState} from 'react'

export const LeagueContext = createContext()

const LeagueContextProvider = (props) => {
    const [ activeLeague, setActiveLeague ] = useState(0)

    // const handleActiveLeague = (e) = {
    //     setActiveLeague(1);
    // }

    return (
        <LeagueContextProvider value={{activeLeague, setActiveLeague}}>
            {props.children}
        </LeagueContextProvider>
    )
}

export default LeagueContextProvider;