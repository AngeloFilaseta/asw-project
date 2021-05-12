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

import { AwesomeButton } from "react-awesome-button"
import { useState } from "react"

export default function Draw(props){

    const [renderRef, draw] = useSvgDrawing({penWidth: drawPenSize})
    const [penWidth, setPenWidth] = useState(drawPenSize)

    let timeExpireHandler = () => submitDraw(props.dispatch, props.socket, props.id_user, props.report_to_id, props.lobbyCode, draw.getSvgXML())
    return(
        <LoadingOverlay active={props.waitingAllSubmit} spinner text='Waiting for other users to submit their drawings...'>
            <ReceivedSentence />
            <Canvas renderRef={renderRef} />
            <div align="center">
                {!props.waitingAllSubmit &&
                <>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <EraserButton draw={draw}/>
                        <GameTimer timeExpireHandler={timeExpireHandler} nSeconds={DRAW_MAX_TIME} />
                        <ClearButton draw={draw}/>
                    </div>
                    <ColorPicker draw={draw} penWidth={penWidth}/>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <AwesomeButton 
                            onPress={() => {setPenWidth(penWidth - 1); draw.changePenWidth(penWidth);}} 
                            className="mb-2" 
                            style={{ display: 'inline', fontSize: 22}} 
                            type="primary" 
                            ripple={true}
                            size="small"
                            disabled={penWidth === 1 ? true : false}
                        >-</AwesomeButton>
                        <h3 style={{ display: 'inline', marginLeft:"3px", marginRight:"3px" }}> Width: {penWidth} </h3>
                        <AwesomeButton 
                            onPress={() => {setPenWidth(penWidth + 1); draw.changePenWidth(penWidth);}} 
                            className="mb-2" 
                            style={{ display: 'inline', fontSize: 22}} 
                            type="primary" 
                            ripple={true}
                            size="small"
                            disabled={penWidth === 50 ? true : false}
                        >+</AwesomeButton>
                    </div>
                    <SubmitDrawButton draw={draw}/>
                </>
                }
            </div>
        </LoadingOverlay>
    )
    
}
