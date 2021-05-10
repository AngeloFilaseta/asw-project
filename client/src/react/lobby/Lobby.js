import { useSelector } from "react-redux"

import Template from "./Template"
import { RedirectAuthentication } from "../common/GuessrRedirect"

export default function HomePage() {
    return useSelector(state => state.userInfo.username) === null ? <RedirectAuthentication /> : <Template/>
}
