import { useSelector } from "react-redux"

import GuessrNavbar from "../common/navbar/GuessrNavbar"
import { RedirectAuthentication } from "../common/GuessrRedirect"

export default function HomePage(){

    var username = useSelector(state => state.userInfo.username)

    if(username === null){
        return <RedirectAuthentication />
    } else {
        return (
            <div>
                <GuessrNavbar />
                <p>Home</p>
            </div>
        )
    }
}