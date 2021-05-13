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
import { submitDraw } from "../LobbyLogic"
import { DRAW_MAX_TIME } from "../../../util/global"

import { useState } from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

export default function Draw(props) {

    const [renderRef, draw] = useSvgDrawing({ penWidth: drawPenSize })
    const [penWidth, setPenWidth] = useState(drawPenSize)

    let timeExpireHandler = () => submitDraw(props.dispatch, props.socket, props.id_user, props.report_to_id, props.lobbyCode, draw.getSvgXML())
    return (
        <LoadingOverlay active={props.waitingAllSubmit} spinner text='Waiting for other users to submit their drawings...'>
            <ReceivedSentence />
            <Canvas renderRef={renderRef} />
            <div align="center">
                {!props.waitingAllSubmit &&
                    <>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <EraserButton draw={draw} />
                            <GameTimer timeExpireHandler={timeExpireHandler} nSeconds={DRAW_MAX_TIME} />
                            <ClearButton draw={draw} />
                        </div>
                        <ColorPicker draw={draw} penWidth={penWidth} />
                        <Slider min={1} max={50} defaultValue={drawPenSize} onChange={v => { draw.changePenWidth(v); setPenWidth(v); }} />
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h3 style={{ display: 'inline', marginLeft: "3px", marginRight: "3px" }}> Stroke width: {penWidth} </h3>
                        </div>
                        <SubmitDrawButton draw={draw} />
                    </>
                }
            </div>
        </LoadingOverlay>
    )

}
