import SVG from "react-inlinesvg"
import {Component} from "react";
import {Card} from "react-bootstrap";
import {DELTA_SVG_VIEWBOX_REDUCER, DRAW_WIDTH_HEIGHT_RATIO, WIDTH_XML_LENGTH} from "../../util/global";

export default class SVGContainer extends Component{

    constructor(props) {
        super(props)
        let svgInitialWidth = this.getHeightValue(props.svgString)
        this.state = { width: 0,
                       height: 0,
                       svgInitialWidth: svgInitialWidth,
                       svgInitialHeight: svgInitialWidth * DRAW_WIDTH_HEIGHT_RATIO}
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
        const svgContainer = document.getElementById(this.props.containerID);
        const width = svgContainer.clientWidth;
        const height = width * DRAW_WIDTH_HEIGHT_RATIO
        this.setState({ width: width, height : height});
    }

    getViewBoxWidth(initialWidth){
        return parseInt(initialWidth) + DELTA_SVG_VIEWBOX_REDUCER
    }

    getViewBoxHeight(initialHeight){
        return parseInt(initialHeight) + DELTA_SVG_VIEWBOX_REDUCER
    }

    getHeightValue(svgString){
        let widthIndex = svgString.indexOf("width");
        let partialResult = svgString.substring(widthIndex + WIDTH_XML_LENGTH, svgString.length - 1);
        let widthEndIndex = partialResult.indexOf('"');
        return partialResult.substring(0, widthEndIndex)
    }

    render(){
        let viewBoxWidth = this.getViewBoxWidth(this.state.svgInitialWidth, this.state.width)
        let viewBoxHeight = this.getViewBoxHeight(this.state.svgInitialHeight, this.state.height)

        return (
            <div id={this.props.containerID} style={{ height: this.state.height, width: "100%" }}>
                <Card className="h-100 border border-dark rounded">
                    <SVG xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink"
                         viewBox={"0 -10 "+ viewBoxWidth + " "+ viewBoxHeight}
                         src={this.props.svgString}
                         height = {this.state.height}
                         width ={this.state.width}
                    />
                </Card>
            </div>
        )
    }


}