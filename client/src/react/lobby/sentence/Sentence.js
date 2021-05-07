import { useState } from "react"
import LoadingOverlay from "react-loading-overlay"
import ReceivedDraw from "./ReceivedDraw"
import SentenceInput from "./SentenceInput"
import SubmitSentenceButton from "./SubmitSentenceButton"
import GameTimer from "../../common/GameTimer"
import {SENTENCE_MAX_TIME} from "../../../util/global"
import {submitSentence} from "../LobbyLogic"

export default function Sentence(props) {

    const [sentence, setSentence] = useState("")

    let timeExpireHandler = () => submitSentence(props.dispatch, props.socket, props.id_user, props.report_to_id, props.lobbyCode, sentence)

    return (
        <LoadingOverlay active={props.waitingAllSubmit} spinner text="Waiting for other users to submit their sentences...">
            <ReceivedDraw />
            <SentenceInput sentence={sentence} onChange={e => setSentence(e.target.value)} />
            <div align="center">
                {!props.waitingAllSubmit &&
                    <>
                    <GameTimer timeExpireHandler={timeExpireHandler} nSeconds={SENTENCE_MAX_TIME}/>
                    <SubmitSentenceButton sentence={sentence}/>
                    </>}
            </div>
        </LoadingOverlay>
    )

}
