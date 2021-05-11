import JoinSound from "../../sound/join.mp3";
import {NotificationManager} from "react-notifications";
import LeftSound from "../../sound/left.mp3";
import {setMyRoleAdmin, setReports, setUsers} from "../../redux/lobby/actions";
import PhaseTypes from "../../util/phaseType";

export function playersHandler(state, players, dispatch) {

    let currentPlayers = Array.from(state.lobby.info.users.map(p => {return p.username}))
    let updatedPlayers = Array.from(players.map(p => {return p.username}))
    if(updatedPlayers.length > currentPlayers.length){
        new Audio(JoinSound).play().then(/* does nothing */)
        NotificationManager.info(updatedPlayers[updatedPlayers.length-1] + " joined the lobby", '', 2000)
    } else if(updatedPlayers.length < currentPlayers.length){
        let diff = currentPlayers.filter(p => !updatedPlayers.includes(p))
        if(diff.length > 0){
            new Audio(LeftSound).play().then(/* does nothing */)
            NotificationManager.info(diff[0] + " left the lobby", '', 2000)
        }
    }
    dispatch(setUsers(players))

    let reportsArray = []
    players.forEach((player) => {
        if(player.id === state.userInfo.id){
            dispatch(setMyRoleAdmin(player.type))
        }
        reportsArray.push(
            {
                id: player.id,
                username: player.username,
                sentence: [],
                draw: []
            }
        )
    })
    if(PhaseTypes.INSIDE_LOBBY === state.lobby.status){
        dispatch(setReports(reportsArray))
    }
}