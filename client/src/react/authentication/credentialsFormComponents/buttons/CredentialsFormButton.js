import { useSelector } from "react-redux"

import Button from "react-bootstrap/Button"

export default function CredentialsFormButton(props){
    return (
        <Button
            style={useSelector(state => state.util.isLoading) ? { pointerEvents: "none", opacity: "0.4" } : {}}
            className="col-lg-12 mt-3"
            variant="primary"
            size="lg"
            block
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    )
}
