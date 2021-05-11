import { useDispatch } from "react-redux"

import Slider from "rc-slider"

import { setNTurns } from "../../../redux/lobby/actions"
import { DEFAULT_N_TURNS, MIN_N_TURNS, MAX_N_TURNS } from "../../../util/global"
import { useState } from "react"

export default function TurnsInput(){

    const dispatch = useDispatch()
    const [localNTurns, setLocalNTurns] = useState(DEFAULT_N_TURNS)

    return(
        <>
            <h3>Set Number of Turns: {localNTurns}</h3>
            <Slider min={MIN_N_TURNS} max={MAX_N_TURNS} defaultValue={DEFAULT_N_TURNS} onChange={v => {setLocalNTurns(v); dispatch(setNTurns(v))}}/>
        </>
    )

}