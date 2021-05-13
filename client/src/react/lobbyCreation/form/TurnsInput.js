import { useDispatch } from "react-redux"

import { setNTurns } from "../../../redux/lobby/actions"
import { DEFAULT_N_TURNS, MIN_N_TURNS, MAX_N_TURNS } from "../../../util/global"
import { useState } from "react"
import { Button } from "react-bootstrap"

export default function TurnsInput() {

    const dispatch = useDispatch()
    const [localNTurns, setLocalNTurns] = useState(DEFAULT_N_TURNS)

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button
                className="mb-2"
                type="primary"
                size="small"
                style={{ display: 'inline', fontSize: 22, minWidth: "5vw", marginRight: 10 }}
                disabled={localNTurns === MIN_N_TURNS ? true : false}
                onClick={() => { setLocalNTurns(localNTurns - 1); dispatch(setNTurns(localNTurns)); }}>
                -
            </Button>
            <h3 style={{ display: 'inline', marginLeft: "3px", marginRight: "3px" }}> Turns: {localNTurns} </h3>
            <Button
                className="mb-2"
                type="primary"
                size="small"
                style={{ display: 'inline', fontSize: 22, minWidth: "5vw", marginLeft: 10 }}
                disabled={localNTurns === MAX_N_TURNS ? true : false}
                onClick={() => { setLocalNTurns(localNTurns + 1); dispatch(setNTurns(localNTurns)); }}>
                +
            </Button>
        </div>
    )

}