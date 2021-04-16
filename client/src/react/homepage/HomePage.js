import { useSelector } from "react-redux"

import MainMenu from "./MainMenu"
import { RedirectAuthentication } from "../common/GuessrRedirect"

export default function HomePage() {
    return useSelector(state => state.userInfo.username) === null ? <RedirectAuthentication /> : <MainMenu />
}
