import { useSelector } from "react-redux"

import { RedirectHome, RedirectLobby } from "../common/GuessrRedirect"
import LobbyCreationForm from "./form/LobbyCreationForm"

import back from "../../img/background.svg"

export default function LobbyCreation() {

  let username = useSelector(state => state.userInfo.username)
  let lobbyCode = useSelector(state => state.lobby.info.code)

  if(username === null){
    return <RedirectHome />
  } else if(lobbyCode === null){
    return <div style={{backgroundImage:`url(${back})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh' }}>
        <LobbyCreationForm />
    </div> 
  } else {
    return <RedirectLobby />
  }
  
}
