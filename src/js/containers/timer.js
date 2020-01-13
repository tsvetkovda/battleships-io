import React, { Component } from "react";
import { connect } from "react-redux";

import { decrementTimer, setBattlePhase, selectShip, BATTLE } from "../actions";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.timerId = null;
    }

    componentDidMount() {
        const timerWrap = () => {
            const { decrementTimer, timer, setBattlePhase, selectShip } = this.props;

            if (timer == 0) {
                clearInterval(this.timerId);

                selectShip(null);
                setBattlePhase(BATTLE);
                this.handleSendDataToOpponent();
            } else {
                decrementTimer();
            }
        };

        this.timerId = setInterval(timerWrap, 1000);
    }

    handleSendDataToOpponent() {
        const { socket, player } = this.props;

        socket.emit("sendDataToOpponent", player.field);
    }

    render() {
        const { timer } = this.props;

        let timerElement = timer > 0 ? <div className="timer">{timer}</div> : null;

        return timerElement;
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
        setBattlePhase: phase => dispatch(setBattlePhase(phase)),
        selectShip: size => dispatch(selectShip(size)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
