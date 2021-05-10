import { useSelector } from "react-redux"

import { RedirectHome, RedirectLobby } from "../common/GuessrRedirect"
import LobbyCreationForm from "./form/LobbyCreationForm"

export default function LobbyCreation() {

  let username = useSelector(state => state.userInfo.username)
  let lobbyCode = useSelector(state => state.lobby.info.code)

  if (username === null) {
    return <RedirectHome />
  } else if (lobbyCode === null) {
    return <LobbyCreationForm />
  } else {
    return <RedirectLobby />
  }

}
