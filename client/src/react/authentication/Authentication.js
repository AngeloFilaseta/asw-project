import { useSelector } from "react-redux"

import CredentialsForm from "./CredentialsForm"
import { RedirectHome } from "../common/GuessrRedirect"

export default function Authentication() {

    let username = useSelector(state => state.userInfo.username);

    if (username === null) {
        return <CredentialsForm />
    } else {
        return <RedirectHome />
    }

}
