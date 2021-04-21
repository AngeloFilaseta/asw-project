import React from "react"

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
        if (this.state.seconds === 0) {
            clearInterval(this.timerID)
            this.props.handler()
        }
    }

    render() {
        return (
            <div>
                <h2>You have {this.state.seconds} seconds left.</h2>
            </div>
        )
    }
}

export default Timer;