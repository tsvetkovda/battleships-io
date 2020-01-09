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
        socket.on("chatMsg", this.handleRecieveMessage);
    }

    handleRecieveMessage(msg, username) {
        console.log(msg, username);
        if (msg) {
            let div = document.createElement("div");
            document.querySelector(".chat").append(`${username}: ${msg}`, div);
        }
    }

    handleSendMessage() {
        const { message, setMessageClear, player, socket } = this.props;

        socket.emit("chatMsg", message, player.name);

        setMessageClear();
    }

    render() {
        const { message, setMessage } = this.props;

        return (
            <div className="chat">
                <InputGroup>
                    <Input onChange={() => setMessage(event.target.value)} value={message} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => this.handleSendMessage()}>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
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
