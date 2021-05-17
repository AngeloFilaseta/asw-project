import { NotificationContainer } from "react-notifications"

import GuessrNavbar from "../common/navbar/GuessrNavbar"
import GuessrButtonGroup from "./GuessrButtonGroup"

export default function MainMenu() {
    return (
        <div role="main">
            <NotificationContainer />
            <GuessrNavbar />
            <GuessrButtonGroup />
        </div>
    )
}
