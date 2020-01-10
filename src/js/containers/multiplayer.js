import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import nanoid from "nanoid";

import {
    selectGameMode,
    LOBBY,
    placeShip,
    setBattlePhase,
    WARM_UP,
    setEnemyField,
    receiveShot,
} from "../actions";

import Chat from "./chat";
import Controls from "./controls";

class Multiplayer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.on("allPlayersConnected", () => this.handleAllPlayersConnected());
        socket.on("sendDataToOpponent", data => this.handleReceiveOpponentData(data));
        socket.on("sendShot", data => this.handleReceiveShot(data));
    }

    handleSendShot(cell) {
        const { socket } = this.props;

        socket.emit("sendShot", cell);
    }

    handleReceiveShot(data) {
        const { receiveShot } = this.props;

        receiveShot(data);
    }

    handleReceiveOpponentData(data) {
        const { setEnemyField } = this.props;

        setEnemyField(data);
    }

    handleSendDataToOpponent() {
        const { socket, player } = this.props;

        socket.emit("sendDataToOpponent", player.field);
    }

    handleAllPlayersConnected() {
        const { setBattlePhase } = this.props;
        setBattlePhase("WARM_UP");
    }

    handleEnemyCells(cell) {
        if (cell.destroyed) {
            return "cell-destroyed";
        } else if (cell.missed) {
            return "cell-missed";
        } else {
            return "cell";
        }
    }

    render() {
        const {
            selectedShipSize,
            orientation,
            selectLobby,
            placeShip,
            player,
            setBattlePhase,
            enemy,
            phase,
            socket,
        } = this.props;

        return (
            <Container>
                <Row className="mb-4 mt-2">
                    <Col>
                        <Button color="primary" onClick={() => setBattlePhase(WARM_UP)}>
                            Start game
                        </Button>
                        <Button onClick={selectLobby} color="link">
                            Back to lobby
                        </Button>
                        {phase === "WAIT" ? (
                            <div>Waiting for other player to connect...</div>
                        ) : (
                            <div>Place your ships</div>
                        )}
                        <Button onClick={() => this.handleSendDataToOpponent()}>
                            TEST SEND DATA
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-6">
                        <div className="grid d-flex flex-row mb-4">
                            {player.field.map(el => (
                                <div
                                    className={el.className}
                                    key={nanoid()}
                                    data-x={el.x}
                                    data-y={el.y}
                                    onClick={() =>
                                        placeShip(
                                            { x: el.x, y: el.y },
                                            selectedShipSize,
                                            orientation,
                                            player.availableShips
                                        )
                                    }
                                    onMouseOver={() => (event.target.className = "cell-selected")}
                                    onMouseLeave={() => (event.target.className = el.className)}
                                >
                                    <img src="../../src/assets/img/aspect-ratio.png"></img>
                                </div>
                            ))}
                        </div>
                        <Controls />
                    </Col>
                    <Col className="col-md-6">
                        <div className="grid d-flex flex-row mb-4">
                            {enemy.field.map(cell => (
                                <div
                                    className={this.handleEnemyCells(cell)}
                                    key={nanoid()}
                                    data-x={cell.x}
                                    data-y={cell.y}
                                    onMouseOver={() => (event.target.className = "cell-selected")}
                                    onMouseLeave={() =>
                                        (event.target.className = this.handleEnemyCells(cell))
                                    }
                                    onClick={() => this.handleSendShot({ x: cell.x, y: cell.y })}
                                >
                                    <img src="../../src/assets/img/aspect-ratio.png"></img>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Chat socket={socket} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { mode, selectedShipSize, player, orientation, enemy, phase } = state;

    return {
        mode,
        selectedShipSize,
        player,
        enemy,
        orientation,
        phase,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectLobby: () => dispatch(selectGameMode(LOBBY)),
        placeShip: (position, shipSize, orientation, availableShips) =>
            dispatch(placeShip(position, shipSize, orientation, availableShips)),
        setBattlePhase: phase => dispatch(setBattlePhase(phase)),
        shootAtEnemy: (position, enemyField) => dispatch(shootAtEnemy(position, enemyField)),
        setEnemyField: field => dispatch(setEnemyField(field)),
        receiveShot: position => dispatch(receiveShot(position)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
