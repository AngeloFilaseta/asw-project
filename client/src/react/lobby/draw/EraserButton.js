import { Button } from "react-bootstrap"

import eraser from "../../../img/eraser.png"
import { erasePenSize } from "./DrawUtil"

export default function EraserButton(props){
    return(
        <Button className="mx-3" variant="outline-light" onClick={() => { props.draw.changePenColor("white"); props.draw.changePenWidth(erasePenSize); }}>
            <img alt="eraser" style={{ width: "40px", height: "40px" }} src={eraser} />
        </Button>
    )
}