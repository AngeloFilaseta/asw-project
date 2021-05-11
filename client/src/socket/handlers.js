import {Channels} from "./enum/channels"
import {setIsLoading} from "../redux/util/actions"
import {joinHandler} from "./handlers/joinedHandler";
import {playersHandler} from "./handlers/playersHandler";
import {chatHandler} from "./handlers/chatHandler";
import {drawHandler} from "./handlers/drawHandler";
import {sentenceHandler} from "./handlers/sentenceHandler";
import {forwardDataHandler} from "./handlers/forwardDataHandler";
import {showReportHandler} from "./handlers/showReportHandler";
import {backToLobbyHandler} from "./handlers/bakToLobbyHandler";

export function assignHandlers(socket, dispatch, state){

    dispatch(setIsLoading(true))

    socket.on(Channels.JOINED, (json) => joinHandler(json, dispatch, socket))

    socket.on(Channels.PLAYERS, (players) => playersHandler(state, players, dispatch))

    socket.on(Channels.CHAT, (messages) => chatHandler(state, messages, dispatch))

    socket.on(Channels.SENTENCE, (id_next_user) => sentenceHandler(id_next_user, dispatch))

    socket.on(Channels.DRAW, (id_next_user) => drawHandler(id_next_user, dispatch))

    socket.on(Channels.FORWARD_DATA, (msg) => forwardDataHandler(state, msg, dispatch, socket))

    socket.on(Channels.SHOW_REPORT, () => showReportHandler(state, dispatch))

    socket.on(Channels.BACK_TO_LOBBY, () => backToLobbyHandler(state, dispatch))

}