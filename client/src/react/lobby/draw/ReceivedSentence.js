import { useSelector } from "react-redux"

export default function ReceivedSentence(){
    let receivedSentence = useSelector(state => state.lobby.receivedData);
    return <div className="text-center">{content(receivedSentence)}</div>
}

function content(receivedSentence){
    if(receivedSentence === "" || receivedSentence === null || receivedSentence === undefined){
        return <h2>Draw something you like!</h2>
    } else {
        return(
            <>
                <h3>You received this sentence:</h3>
                <h2>"{receivedSentence}"</h2>
                <p>Draw the content of this sentence!</p>
            </>
        )
    }
}