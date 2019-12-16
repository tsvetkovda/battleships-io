import React, { Component } from "react";
import { connect } from "react-redux";

class Clock extends Component {
    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.props.dispatch({ type: "TICK" });
    }

    render() {
        return <div className="clock">{this.props.time}</div>;
    }
}

const mapStateToProps = state => {
    return {
        time: state.time,
    };
};

export default connect(mapStateToProps)(Clock);
