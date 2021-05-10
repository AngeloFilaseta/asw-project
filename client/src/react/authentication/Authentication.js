import { useSelector } from "react-redux"

import CredentialsForm from "./CredentialsForm"
import { RedirectHome } from "../common/GuessrRedirect"

export default function Authentication() {
    return useSelector(state => state.userInfo.username) === null ?
        <CredentialsForm />
        : <RedirectHome />
}
