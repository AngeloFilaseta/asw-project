import { useSelector } from "react-redux"

import $ from "jquery"
import { useSvgDrawing } from "react-hooks-svgdrawing"
import { Card, Button } from "react-bootstrap"
import { CirclePicker } from "react-color"
import { drawPenSize, erasePenSize } from "../util/inGameSettings"
import LoadingOverlay from "react-loading-overlay"

import Timer from "../components/Timer"
import eraser from "../img/eraser.png"

export default function Draw(props) {

    const [renderRef, draw] = useSvgDrawing({
        penWidth: drawPenSize
    })

    var waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)

    return (
        <LoadingOverlay
            active={props.waitingAllSubmit}
            spinner
            text="Waiting for other users to submit their drawings...">
            <div className="text-center">
                {(props.receivedSentence === "" || props.receivedSentence === null || props.receivedSentence === undefined) ?
                    <h2>Draw something you like!</h2> :
                    <>
                        <h3>You received this sentence:</h3>
                        <h2>"{props.receivedSentence}"</h2>
                        <p>Draw the content of this sentence!</p>
                    </>
                }
            </div>
            <div style={{ height: "50vmin", width: "100%" }} >
                <Card className="h-100 border border-primary rounded">
                    <div className="h-100" ref={renderRef}></div>
                </Card>
            </div>
            <div align="center">
                <CirclePicker onChange={(color, event) => { draw.changePenColor(color.hex); draw.changePenWidth(drawPenSize); }} className={"py-3"} width={"378px"} colors={["black", "red", "orange", "yellow", "green", "blue", "cyan", "purple", "brown"]} />
                {!waitingAllSubmit && <Timer nSeconds={120} handler={() => submitDraw(props.eventbus, props.username, props.lobbyCode, draw.getSvgXML())} />}
                <Button id="submitDraw"
                    className="mx-3"
                    onClick={() => { props.submitHandler(); submitDraw(props.eventbus, props.username, props.lobbyCode, draw.getSvgXML()); }}>
                    Submit
                </Button>
                <Button className="mx-3"
                    variant="outline-light"
                    onClick={() => { draw.changePenColor("white"); draw.changePenWidth(erasePenSize); }}>
                    <img alt="eraser" style={{ width: "40px", height: "40px" }} src={eraser} />
                </Button>
                <Button variant="danger"
                    className="mx-3"
                    onClick={() => draw.clear()}>
                    Clear
                </Button>
                <h2 id={"submittedDraw"}>{""}</h2>
            </div>
        </ LoadingOverlay>
    )
}

function submitDraw(eventbus, username, lobbyCode, svgImageString) {
    $("#submitDraw").prop("disabled", true)
    $("#submittedDraw").append("You submitted your draw. Wait for other players.")
    var msgBody = {
        username: username,
        code: lobbyCode,
        draw: svgImageString
    }
    eventbus.send('draw', msgBody)
}

