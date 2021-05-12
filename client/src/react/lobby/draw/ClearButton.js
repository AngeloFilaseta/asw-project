import { AwesomeButton } from "react-awesome-button"
import clear from "../../../img/clear.png"

export default function ClearButton(props) {
    return (
        <AwesomeButton
            onPress={() => props.draw.clear()}
            className="mb-2"
            style={{ display: 'inline', fontSize: 22, marginLeft: "15px", marginRight: "15px" }}
            type="primary"
            ripple={true}
            size="small"
        >
            <img alt="clear" style={{ width: "40px", height: "40px" }} src={clear} />
        </AwesomeButton>
    )
}