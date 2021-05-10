import { Card } from "react-bootstrap"

export default function Canvas(props){
    return(
        <div style={{ height: "50vmin", width: "100%" }} >
            <Card className="h-100 border border-primary rounded">
                <div className="h-100" ref={props.renderRef}/>
            </Card>
        </div>
    )
}