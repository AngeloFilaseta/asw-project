import { useSelector } from "react-redux"

import { useSvgDrawing } from "react-hooks-svgdrawing"
import { drawPenSize } from "./DrawUtil"

import LoadingOverlay from "react-loading-overlay"
import ReceivedSentence from "./ReceivedSentence"
import Canvas from "./Canvas"
import ColorPicker from "./ColorPicker"
import DrawTimer from "./DrawTimer"
import ClearButton from "./ClearButton"
import EraserButton from "./EraserButton"
import SubmitDrawButton from "./SubmitDrawButton"

export default function Draw(){

    const [renderRef, draw] = useSvgDrawing({penWidth: drawPenSize})
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)

    return(
        <LoadingOverlay active={waitingAllSubmit} spinner text='Waiting for other users to submit their drawings...'>
            <ReceivedSentence />
            <Canvas renderRef={renderRef} />
            <div align="center">
                <ColorPicker draw={draw} />
                <DrawTimer draw={draw} />
                <SubmitDrawButton draw={draw} />
                <EraserButton draw={draw} />
                <ClearButton draw={draw} />
            </div>
        </LoadingOverlay>
    )
    
}
