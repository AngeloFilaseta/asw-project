import { Button } from "react-bootstrap"

import clear from "../../../img/clear.png"

export default function ClearButton(props) {
    return (
        <Button
            className="mb-2"
            type="primary"
            size="small"
            style={{ display: 'inline', fontSize: 22, marginLeft: "15px", marginRight: "15px" }}
            onClick={() => props.draw.clear()}>
            <img alt="clear" style={{ width: "40px", height: "40px" }} src={clear} />
        </Button>
    )
}