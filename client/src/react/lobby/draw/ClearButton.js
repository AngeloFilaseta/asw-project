import { AwesomeButton } from "react-awesome-button"
import clear from "../../../img/clear.png"

export default function ClearButton(props){
    return (
        <AwesomeButton 
            onPress={() => props.draw.clear()} 
            className="mb-2" 
            style={{ display: 'inline', fontSize: 22}} 
            type="primary" 
            ripple={true}
            size="small"
            style={{marginLeft:"15px", marginRight:"15px"}}
        >
            <img alt="clear" style={{ width: "40px", height: "40px" }} src={clear} />
        </AwesomeButton>
    )
}