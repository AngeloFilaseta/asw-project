import { useDispatch } from "react-redux"

import CredentialsFormButton from "./CredentialsFormButton"
import { signup } from "../../AuthenticationLogic"

export default function SignupButton(props){
    const dispatch = useDispatch()
    return <CredentialsFormButton text= "Signup" onClick={() => signup(props.username, props.password, dispatch)} />
}
