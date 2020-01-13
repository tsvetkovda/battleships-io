import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

import { setMessage } from "../actions";

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.on("chatMsg", data => this.handleReceiveMessage(data));
    }

    handleReceiveMessage(data) {
        if (data) {
            let div = document.createElement("div");
            document.querySelector(".chat").append(`${data.username}: ${data.msg}`, div);
        }
    }

    handleSendMessage() {
        const { message, setMessageClear, player, socket } = this.props;

        socket.emit("chatMsg", { username: player.name, msg: message });

        setMessageClear();
    }

    render() {
        const { message, setMessage } = this.props;

        return (
            <>
                <div className="chat"></div>
                <InputGroup>
                    <Input onChange={() => setMessage(event.target.value)} value={message} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => this.handleSendMessage()}>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </>
        );
    }
}

const mapStateToProps = state => {
    const { player, message } = state;
    return { player, message };
};

const mapDispatchToProps = dispatch => {
    return {
        setMessage: msg => dispatch(setMessage(msg)),
        setMessageClear: () => dispatch(setMessage("")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
