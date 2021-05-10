import { useSelector } from "react-redux"

import CredentialsForm from "./CredentialsForm"
import { RedirectHome } from "../common/GuessrRedirect"

import back from "../../img/background.svg"

export default function Authentication() {
    return useSelector(state => state.userInfo.username) === null ?  <div style={{backgroundImage:`url(${back})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh' }}>
        <CredentialsForm />
    </div> : <RedirectHome/>
}
