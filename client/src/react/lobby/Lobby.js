import { useSelector } from "react-redux"

import Template from "./Template"
import { RedirectAuthentication } from "../common/GuessrRedirect"

import back from "../../img/background.svg"

export default function HomePage() {
    return useSelector(state => state.userInfo.username) === null ? <RedirectAuthentication /> : <div style={{backgroundImage:`url(${back})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh' }}>
        <Template/>
    </div> 
}
