import { useSelector } from "react-redux"

import LoadingOverlay from "react-loading-overlay"
import { Button, Form } from "react-bootstrap"
import SVG from "react-inlinesvg"
import $ from "jquery"

import Timer from "../common/Timer"

export default function Sentence(props) {

    var sentence = ""
    var waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)

    return (
        <>
            <LoadingOverlay
                active={props.waitingAllSubmit}
                spinner
                text="Waiting for other users to submit their sentences..."
            />
            <div className="text-center">
                {(props.receivedDraw === "" || props.receivedDraw === null || props.receivedDraw === undefined) ?
                    <h2>Write something! Be creative!</h2> :
                    <div>
                        <h3>You received this draw:</h3>
                        {renderDraw(props.receivedDraw)}
                        <p>What do you see?</p>
                    </div>
                }
            </div>
            <Form className="border border-primary rounded mx-3 mx-md-0 p-3" onSubmit={s => { s.preventDefault(); props.submitHandler(); submitSentence(props.eventbus, props.username, props.lobbyCode, sentence); }}>
                <h5 align="center">Write your sentence:</h5>
                <Form.Control type="text" placeholder="Sentence" onChange={e => { sentence = e.target.value }} />
                <h1 id="submittedSentence">{""}</h1>
            </Form>
            <div align="center">
                {!waitingAllSubmit && <Timer nSeconds={60} handler={() => submitSentence(props.eventbus, props.username, props.lobbyCode, sentence)} />}
                <Button
                    id="submitSentence"
                    className="mt-3 col-6"
                    size="lg"
                    onClick={() => {
                        props.submitHandler();
                        submitSentence(props.eventbus, props.username, props.lobbyCode, sentence);
                    }
                    }>
                    Submit
                </Button>
                {props.isAdmin === true ? (<Button id="exitButton" className="mt-3 col-6" variant="secondary" size="lg" onClick={() => { exitButtonClick(props.eventbus, props.username, props.lobbyCode); }}>End game</Button>) : (<></>)}
            </div>
        </>
    );

}

function submitSentence(eventbus, username, lobbyCode, sentence) {
    var msgBody = {
        username: username,
        code: lobbyCode,
        sentence: sentence
    }
    $("#submitSentence").prop("disabled", true)
    $("#submittedSentence").append("You submitted your sentence. Wait for other players.")

    eventbus.send("sentence", msgBody)
}

function exitButtonClick(eventbus, username, lobbyCode) {
    var msgBody = {
        username: username,
        code: lobbyCode,
        action: "end game"
    }
    eventbus.send("lobby", msgBody)
}

function renderDraw(svgImage) {
    return <SVG src={svgImage} />
}