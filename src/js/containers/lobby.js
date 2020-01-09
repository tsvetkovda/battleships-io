import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Input, InputGroup } from "reactstrap";
import io from "socket.io-client";

import { selectGameMode, MULTIPLAYER, setName, setRoomId } from "../actions";

const socket = io("/");

class Lobby extends Component {
    constructor() {
        super();
    }

    handleGameCreation() {
        let username = this.props.player.name;
        let roomId = this.props.player.roomId;

        socket.emit("createRoom", { username, roomId });

        this.props.selectMultiplayer();
    }

    handleJoinGame() {
        let username = this.props.player.name;
        let roomId = this.props.player.roomId;

        socket.emit("joinRoom", { username, roomId });

        this.props.selectMultiplayer();
    }

    render() {
        const { setName, setRoomId, player } = this.props;

        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>Battleships</h1>
                        <p>A classic strategy game for two players.</p>
                    </Col>
                </Row>
                <hr />
                <Row className="mb-4">
                    <Col className="text-center">
                        <h3>Your name:</h3>
                        <InputGroup size="lg">
                            <Input
                                onChange={() => setName(event.target.value)}
                                value={player.name}
                            />
                        </InputGroup>
                        <h3>Room id:</h3>
                        <InputGroup size="lg">
                            <Input
                                defaultValue={player.roomId}
                                onChange={() => setRoomId(event.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <Button size="lg" color="primary" onClick={() => this.handleGameCreation()}>
                            Create game
                        </Button>{" "}
                        <Button size="lg" onClick={() => this.handleJoinGame()}>
                            Join
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { mode } = state;
    const { player } = state;

    return { mode, player };
};

const mapDispatchToProps = dispatch => {
    return {
        selectMultiplayer: () => dispatch(selectGameMode(MULTIPLAYER)),
        setName: name => dispatch(setName(name)),
        setRoomId: roomId => dispatch(setRoomId(roomId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
