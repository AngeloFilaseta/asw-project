import React from "react"
import TimeExpiring from "../../sound/time-expiring.mp3"
import {CRITICAL_TIME} from "../../util/global";

import "./TimerCSS.css"
import ReactCountdownClock from "react-countdown-clock"

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { seconds: props.nSeconds }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState((state, props) => ({
            seconds: state.seconds - 1
        }))
        if (this.state.seconds === CRITICAL_TIME){
            let audio = new Audio(TimeExpiring);
            audio.play().then( /* does nothing */)
        }

        if (this.state.seconds === 0) {
            clearInterval(this.timerID)
            this.props.handler()
        }
    }

    render() {
        return (
            <ReactCountdownClock 
                seconds={this.props.nSeconds}
                color={this.state.seconds > CRITICAL_TIME ? "#000000" : "#FF0000"}
                alpha={0.9}
                size={75}
                weight={10}
                showMilliseconds={true}
            />      
        )
    }
}

export default Timer;