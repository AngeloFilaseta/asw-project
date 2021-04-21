import { CirclePicker } from "react-color"

import { drawPenSize } from "./DrawUtil"

export default function ColorPicker(props){
    return (
        <CirclePicker 
            onChange={(color) => { 
                props.draw.changePenColor(color.hex); 
                props.draw.changePenWidth(drawPenSize); 
            }} 
            className={"py-3"} 
            width={"378px"} 
            colors={["black", "red", "orange", "yellow", "green", "blue", "cyan", "purple", "brown"]} 
        />
    )
}