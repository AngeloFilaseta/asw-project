import { useDispatch } from "react-redux"

import CredentialsFormInput from "./CredentialsFormInput"
import { login } from "../../AuthenticationLogic"

export default function UsernameInput(props){

    const dispatch = useDispatch()

    return <CredentialsFormInput
        text="Username:"
        type="text"
        placeholder = "Enter Username"
        onChange = {props.onChange}
        onEnter={() => login(props.username, props.password, dispatch)}
    />

}
