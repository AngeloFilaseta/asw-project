import SVG from "react-inlinesvg"
import {Component} from "react";
import {Card} from "react-bootstrap";

export default class SVGContainer extends Component{

    constructor(props) {
        super(props)
        let svgInitialWidth = this.getHeightValue(props.svgString)
        this.state = { width: 0,
                       height: 0,
                       svgInitialWidth: svgInitialWidth,
                       svgInitialHeight: svgInitialWidth / 2}
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
        const svgContainer = document.getElementById('svg-container');
        const width = svgContainer.clientWidth;
        const height = width/2
        this.setState({ width: width,
            height : height});
    }

    render(){
        let viewBoxWidth = this.getViewBoxWidth(this.state.svgInitialWidth, this.state.width)
        let viewBoxHeight = this.getViewBoxHeight(this.state.svgInitialHeight, this.state.height)

        return (
            <div id="svg-container" style={{ height: this.state.height, width: "100%" }}>
                <h3>You received this draw:</h3>
                <Card className="h-100 border border-primary rounded">
                    <SVG xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink"
                         viewBox={"0 -10 "+ viewBoxWidth + " "+ viewBoxHeight}
                         src={this.props.svgString}
                         height = {this.state.height}
                         width ={this.state.width}
                    />
                </Card>
            </div>)
    }

    getViewBoxWidth(initialWidth){
        return parseInt(initialWidth) + 30
    }

    getViewBoxHeight(initialHeight){
        return parseInt(initialHeight) + 30
    }

    getHeightValue(svgString){
        let widthIndex = svgString.indexOf("width");
        let partialResult = svgString.substring(widthIndex + 7, svgString.length - 1);
        let widthEndIndex = partialResult.indexOf('"');
        return partialResult.substring(0, widthEndIndex)
    }


}