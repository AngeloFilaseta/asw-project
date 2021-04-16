import { useDispatch } from "react-redux"

import CredentialsFormInput from "./CredentialsFormInput"
import { login } from "../../AuthenticationLogic"

export default function PasswordInput(props){

    const dispatch = useDispatch()

    return <CredentialsFormInput
        text="Password:"
        type="password"
        placeholder = "Enter Password"
        onChange = {props.onChange}
        onEnter={() => login(props.username, props.password, dispatch)}
    />

}
