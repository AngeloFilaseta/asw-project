import { useSelector } from "react-redux"

export default function ReceivedSentence(){
    let user_sentence_id = useSelector(state => state.lobby.receivedData)
    let reports = useSelector(state => state.lobby.reports)
    let receivedSentence = undefined
    reports.forEach((report) => {
        if(report.id === user_sentence_id){
            receivedSentence = report.sentence[report.sentence.length - 1]
        }
    });
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