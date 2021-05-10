import { Card } from "react-bootstrap"
import {Component} from "react";

export default class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = {height: 0}
    }

    componentDidMount() {
        const height = document.getElementById("canvas-container").clientWidth / 2;
        this.setState({ height : height });
    }

    render(){
        return(
            <div id="canvas-container" style={{ height: this.state.height, width: "100%" }}>
                <Card className="h-100 border border-primary rounded">
                    <div className="h-100" ref={this.props.renderRef}/>
                </Card>
            </div>
        )
    }

}