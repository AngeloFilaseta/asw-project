import Timer from "./Timer"

export default function GameTimer(props){
    return <Timer nSeconds={props.nSeconds} handler={props.timeExpireHandler}/>
}