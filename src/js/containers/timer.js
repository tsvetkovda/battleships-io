import React, { Component } from "react";
import { connect } from "react-redux";

import { decrementTimer, resetTimer, setBattlePhase, selectShip, reset, BATTLE } from "../actions";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.timerId = null;
    }

    componentDidMount() {
        const { resetTimer, reset } = this.props;

        resetTimer();
        reset();

        const timerWrap = () => {
            const { decrementTimer, timer, setBattlePhase, selectShip } = this.props;

            if (timer == 0) {
                clearInterval(this.timerId);

                selectShip(null);
                this.handleSendDataToOpponent();
                setTimeout(() => setBattlePhase(BATTLE), 1000);
            } else {
                decrementTimer();
            }
        };

        this.timerId = setInterval(timerWrap, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleSendDataToOpponent() {
        const { socket, player } = this.props;

        socket.emit("sendDataToOpponent", player.field);
    }

    render() {
        const { timer } = this.props;

        // let timerElement = timer > 0 ? <div className="timer">{timer}</div> : null;

        // return timerElement;

        return <div className="timer">{timer}</div>;
    }
}

const mapStateToProps = state => {
    const { timer, player } = state;

    return {
        timer,
        player,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        decrementTimer: () => dispatch(decrementTimer()),
        resetTimer: () => dispatch(resetTimer()),
        setBattlePhase: phase => dispatch(setBattlePhase(phase)),
        selectShip: size => dispatch(selectShip(size)),
        reset: () => dispatch(reset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
