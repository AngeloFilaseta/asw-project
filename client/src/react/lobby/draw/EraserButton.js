import { Button } from "react-bootstrap"

import eraser from "../../../img/eraser.png"
import { erasePenSize } from "./DrawUtil"

export default function EraserButton(props) {
    return (
        <Button
            className="mb-2"
            type="primary"
            size="small"
            style={{ display: 'inline', fontSize: 22, marginLeft: "15px", marginRight: "15px" }}
            onClick={() => { props.draw.changePenColor("white"); props.draw.changePenWidth(erasePenSize); }}>
            <img alt="eraser" style={{ width: "40px", height: "40px" }} src={eraser} />
        </Button>
    )
}