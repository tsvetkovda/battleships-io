import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Input, InputGroup } from "reactstrap";

import { selectGameMode, MULTIPLAYER, setName, setRoomId } from "../actions";

class Lobby extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { socket } = this.props;
    }

    handleGameCreation() {
        const { socket, player } = this.props;

        socket.emit("createRoom", { username: player.name, roomId: player.roomId });

        socket.on("roomCreation", data => {
            if (data.canCreate) this.props.selectMultiplayer();
            else console.log(data.msg);
        });
    }

    handleJoinGame() {
        const { socket, player } = this.props;

        socket.emit("joinRoom", { username: player.name, roomId: player.roomId });

        socket.on("playerConnection", data => {
            if (data.canConnect) this.props.selectMultiplayer();
            else console.log(data.msg);
        });
    }

    render() {
        const { setName, setRoomId, player } = this.props;

        return (
            <Container>
                <Row className="logo text-center">
                    <Col>
                        <h1 className="logo-text">Battleships</h1>
                        <p className="logo-description">Classic strategy game for two players</p>
                    </Col>
                </Row>
                <hr />
                <Row className="mb-4">
                    <Col className="text-center col-sm-6 offset-sm-3">
                        <h4>Your name:</h4>
                        <InputGroup size="lg" className="mb-4">
                            <Input
                                onChange={() => setName(event.target.value)}
                                value={player.name}
                                className="text-center"
                            />
                        </InputGroup>
                        <h4>Room id:</h4>
                        <InputGroup size="lg" className="mb-4">
                            <Input
                                defaultValue={player.roomId}
                                onChange={() => setRoomId(event.target.value)}
                                className="text-center"
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
