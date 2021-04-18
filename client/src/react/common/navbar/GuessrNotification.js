import Button from "react-bootstrap/Button"
import {useDispatch, useSelector} from "react-redux"

import bellIcon from "../../../img/bell.png"

export default function GuessrNotification() {
    const dispatch = useDispatch()
    return useSelector(state => state.userInfo.username) === null ? (<></>) : bellButton(dispatch)
}

function bellButton(){
    return (
        <Button >
            <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />
            <span className="badge badge-danger">4</span>
        </Button>
    )
}
