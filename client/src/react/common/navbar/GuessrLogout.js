import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"

import logoutIcon from "../../../img/logout.png"
import { setUsername } from "../../../redux/userInfo/actions"


export default function GuessrLogout() {
    const dispatch = useDispatch()
    return useSelector(state => state.userInfo.username) === null ? (<></>) : logoutButton(dispatch)
}

function logoutButton(dispatch){
    return (
        <Button onClick={() => dispatch(setUsername(null))}> 
            <div className="d-none d-md-inline ">
                <b>Logout</b>
            </div> 
            <img alt="Logout" style={{ width: "30px", height: "30px" }} src={logoutIcon} /> 
        </Button>
    )
}
