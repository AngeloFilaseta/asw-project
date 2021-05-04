import { useSelector } from "react-redux"

import SVG from "react-inlinesvg"

export default function ReceivedDraw(){
    let user_draw_id = useSelector(state => state.lobby.receivedData)
    let reports = useSelector(state => state.lobby.reports)
    let receivedDraw = undefined
    reports.forEach((report) => {
        if(report.id === user_draw_id && report.draw.length !== 0){
            receivedDraw = report.draw[report.draw.length - 1]
        }
    });
    return <div className="text-center">{content(receivedDraw)}</div>
}

function content(receivedDraw){
    if(receivedDraw === "" || receivedDraw === null || receivedDraw === undefined){
        return <h2>Write something! Be creative!</h2>
    } else {
        return(
            <div>
                <h3>You received this draw:</h3>
                <SVG src={receivedDraw} />
                <p>What do you see?</p>
            </div>
        )
    }
}