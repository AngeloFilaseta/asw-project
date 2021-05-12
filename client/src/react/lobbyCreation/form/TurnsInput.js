import { useDispatch } from "react-redux"

import { setNTurns } from "../../../redux/lobby/actions"
import { DEFAULT_N_TURNS, MIN_N_TURNS, MAX_N_TURNS } from "../../../util/global"
import { useState } from "react"

import { AwesomeButton } from "react-awesome-button"

export default function TurnsInput(){

    const dispatch = useDispatch()
    const [localNTurns, setLocalNTurns] = useState(DEFAULT_N_TURNS)

    return(
        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <AwesomeButton 
                onPress={() => {setLocalNTurns(localNTurns - 1);dispatch(setNTurns(localNTurns));}} 
                className="mb-2" 
                style={{ display: 'inline', fontSize: 22}} 
                type="primary" 
                ripple={true}
                size="small"
                disabled={localNTurns === MIN_N_TURNS ? true : false}
            >-</AwesomeButton>
            <h3 style={{ display: 'inline', marginLeft:"3px", marginRight:"3px" }}> Turns: {localNTurns} </h3>
            <AwesomeButton 
                onPress={() => {setLocalNTurns(localNTurns + 1); dispatch(setNTurns(localNTurns));}} 
                className="mb-2" 
                style={{ display: 'inline', fontSize: 22}} 
                type="primary" 
                ripple={true}
                size="small"
                disabled={localNTurns === MAX_N_TURNS ? true : false}
            >+</AwesomeButton>
        </div>
    )

}