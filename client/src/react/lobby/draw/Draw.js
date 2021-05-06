import { useSvgDrawing } from "react-hooks-svgdrawing"
import { drawPenSize } from "./DrawUtil"
import LoadingOverlay from "react-loading-overlay"
import ReceivedSentence from "./ReceivedSentence"
import Canvas from "./Canvas"
import ColorPicker from "./ColorPicker"
import ClearButton from "./ClearButton"
import EraserButton from "./EraserButton"
import SubmitDrawButton from "./SubmitDrawButton"
import GameTimer from "../../common/GameTimer"
import {submitDraw} from "../LobbyLogic"
import {DRAW_MAX_TIME} from "../../../util/global"

export default function Draw(props){

    const [renderRef, draw] = useSvgDrawing({penWidth: drawPenSize})

    let timeExpireHandler = () => submitDraw(props.dispatch, props.socket, props.id_user, props.report_to_id, props.lobbyCode, draw.getSvgXML())
    return(
        <LoadingOverlay active={props.waitingAllSubmit} spinner text='Waiting for other users to submit their drawings...'>
            <ReceivedSentence />
            <Canvas renderRef={renderRef} />
            <div align="center">
                <ColorPicker draw={draw} />
                <GameTimer timeExpireHandler={timeExpireHandler} nSeconds={DRAW_MAX_TIME}/>
                <SubmitDrawButton draw={draw} />
                <EraserButton draw={draw} />
                <ClearButton draw={draw} />
            </div>
        </LoadingOverlay>
    )
    
}
