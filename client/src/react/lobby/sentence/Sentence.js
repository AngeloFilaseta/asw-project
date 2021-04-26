import { useState } from "react"
import { useSelector } from "react-redux"
import LoadingOverlay from "react-loading-overlay"
import ReceivedDraw from "./ReceivedDraw"
import SentenceInput from "./SentenceInput"
import SentenceTimer from "./SentenceTimer"
import SubmitSentenceButton from "./SubmitSentenceButton"

export default function Sentence(props) {

    const [sentence, setSentence] = useState("")
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)

    return (
        <LoadingOverlay active={waitingAllSubmit} spinner text="Waiting for other users to submit their sentences...">
            <ReceivedDraw />
            <SentenceInput sentence={sentence} onChange={e => setSentence(e.target.value)} />
            <div align="center">
                <SentenceTimer sentence={sentence} />
                <SubmitSentenceButton sentence={sentence} />
            </div>
        </LoadingOverlay>
    )

}
