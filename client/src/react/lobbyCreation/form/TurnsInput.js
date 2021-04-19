import { useDispatch } from "react-redux"

import Form from "react-bootstrap/Form"

import { setNTurns } from "../../../redux/lobby/actions"
import { DEFAULT_N_TURNS } from "../../../util/global"

export default function TurnsInput(){

    const dispatch = useDispatch()

    return(
        <>
            <h3>Set Number of Turns:</h3>
            <Form.Control 
                onChange={e => dispatch(setNTurns(parseInt(e.target.value)))} 
                type="number" 
                min="1" 
                size="lg" 
                placeholder="Set Number of Turns" 
                defaultValue={DEFAULT_N_TURNS} 
            />
        </>
    )

}