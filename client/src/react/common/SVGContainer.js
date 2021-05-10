import SVG from "react-inlinesvg"
import {Component} from "react";

export default class SVGContainer extends Component{

    render(){
        return (<div id={"svg-container"}>
            <h3>You received this draw:</h3>
            <SVG src={this.props.svgString}/>
            <p>What do you see?</p>
        </div>)
    }


}