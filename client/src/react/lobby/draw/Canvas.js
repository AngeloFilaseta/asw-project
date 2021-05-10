import { Card } from "react-bootstrap"
import {Component} from "react";
import {DRAW_WIDTH_HEIGHT_RATIO} from "../../../util/global";

export default class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = {height: 0}
        this.updateSVGContainerSize = this.updateSVGContainerSize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateSVGContainerSize);
        this.updateSVGContainerSize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSVGContainerSize);
    }

    updateSVGContainerSize() {
        let svgContainer = document.getElementById('canvas-container');
        let height = svgContainer.clientWidth * DRAW_WIDTH_HEIGHT_RATIO
        this.setState({height : height});
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