import React from "react"
import TimeExpiring from "../../sound/time-expiring.mp3"
import {CRITICAL_TIME} from "../../util/global";

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
            <div>
                <h2>You have  <span className={this.state.seconds <= CRITICAL_TIME && "text-danger"}>{this.state.seconds}</span> seconds left.</h2>
            </div>
        )
    }
}

export default Timer;