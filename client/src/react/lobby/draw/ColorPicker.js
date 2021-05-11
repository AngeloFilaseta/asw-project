import { CirclePicker } from "react-color"

export default function ColorPicker(props){
    return (
        <CirclePicker 
            onChange={(color) => { 
                props.draw.changePenColor(color.hex); 
                props.draw.changePenWidth(props.penWidth); 
            }} 
            className={"py-3"} 
            width={"378px"}
            colors={["black", "red", "orange", "yellow", "green", "blue", "cyan", "pink", "brown"]}
        />
    )
}