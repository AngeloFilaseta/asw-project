import { AwesomeButton } from "react-awesome-button"

import eraser from "../../../img/eraser.png"
import { erasePenSize } from "./DrawUtil"

export default function EraserButton(props){
    return(
        <AwesomeButton 
            onPress={() => {props.draw.changePenColor("white"); props.draw.changePenWidth(erasePenSize);}} 
            className="mb-2" 
            style={{ display: 'inline', fontSize: 22}} 
            type="primary" 
            ripple={true}
            size="small"
            style={{marginLeft:"15px", marginRight:"15px"}}
        >
            <img alt="eraser" style={{ width: "40px", height: "40px" }} src={eraser} />
        </AwesomeButton>
    )
}