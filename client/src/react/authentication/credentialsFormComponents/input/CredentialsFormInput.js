import { useSelector } from "react-redux"

import Form from "react-bootstrap/Form"

export default function CredentialsFormButton(props){
    return (
        <>
            <h2>{props.text}</h2>
            <Form.Control
                style={useSelector(state => state.util.isLoading) ? { pointerEvents: "none", opacity: "0.4" } : {}}
                type={props.type}
                onChange={e => props.onChange(e.target.value)}
                placeholder={props.placeholder}
                onKeyPress={event => { if (event.charCode === 13) props.onEnter() }}
            />
        </>
    )
}
