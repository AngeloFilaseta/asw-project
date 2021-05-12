import { AwesomeButton } from "react-awesome-button"

import eraser from "../../../img/eraser.png"
import { erasePenSize } from "./DrawUtil"

export default function EraserButton(props) {
    return (
        <AwesomeButton
            onPress={() => { props.draw.changePenColor("white"); props.draw.changePenWidth(erasePenSize); }}
            className="mb-2"
            style={{ display: 'inline', fontSize: 22, marginLeft: "15px", marginRight: "15px" }}
            type="primary"
            ripple={true}
            size="small"
        >
            <img alt="eraser" style={{ width: "40px", height: "40px" }} src={eraser} />
        </AwesomeButton>
    )
}