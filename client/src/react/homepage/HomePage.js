import { useSelector } from "react-redux"

import MainMenu from "./MainMenu"
import { RedirectAuthentication } from "../common/GuessrRedirect"

import back from "../../img/background.svg"

export default function HomePage() {
    return useSelector(state => state.userInfo.username) === null ? <RedirectAuthentication /> : <div style={{backgroundImage:`url(${back})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh' }}>
        <MainMenu />
    </div>
}
