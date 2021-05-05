import AudioWaiting from "../../../sound/waiting.mp3";
import AudioPlay from "./AudioPlay";

export default function ElevatorWaitingSound(){
    return <AudioPlay source={AudioWaiting}/>
}

