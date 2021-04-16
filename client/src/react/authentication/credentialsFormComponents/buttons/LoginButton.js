import { useDispatch } from "react-redux"

import CredentialsFormButton from "./CredentialsFormButton"
import { login } from "../../AuthenticationLogic"

export default function LoginButton(props){
    const dispatch = useDispatch()
    return <CredentialsFormButton text= "Login" onClick={() => login(props.username, props.password, dispatch)} />
}
