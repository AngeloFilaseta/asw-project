import { Button } from "react-bootstrap"

export default function ClearButton(props){
    return <Button variant="danger" className="mx-3" onClick={() => props.draw.clear()}>Clear</Button>
}