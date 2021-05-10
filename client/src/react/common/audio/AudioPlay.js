import ReactAudioPlayer from "react-audio-player"

export default function AudioPlay(props) {

    return <ReactAudioPlayer src={props.source} autoPlay/>

}