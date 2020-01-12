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
    shootAtEnemy,
    canPlayerShoot,
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
        socket.on("defineFirstTurn", name => this.handleDefineFirstTurn(name));
    }

    handlePlayerLeft() {
        const { socket, selectLobby, player } = this.props;

        socket.emit("playerLeft", { username: player.name, roomId: player.roomId });

        selectLobby();
    }

    handleDefineFirstTurn(name) {
        const { player, canPlayerShoot } = this.props;
        console.log(name);

        if (player.name === name) {
            canPlayerShoot(true);
        }
    }

    handleSendShot(cell) {
        const { socket, player, canPlayerShoot } = this.props;

        if (player.canShoot) {
            socket.emit("sendShot", cell);
            canPlayerShoot(false);
        }
    }

    handleReceiveShot(data) {
        const { receiveShot, canPlayerShoot } = this.props;

        receiveShot(data);

        this.handleSendDataToOpponent();

        canPlayerShoot(true);
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
            enemy,
            phase,
            socket,
        } = this.props;

        return (
            <Container>
                <Row className="mb-4 mt-2">
                    <Col>
                        <Button onClick={() => this.handlePlayerLeft()} color="primary">
                            Back to lobby
                        </Button>{" "}
                        <Button onClick={() => this.handleSendDataToOpponent()}>
                            TEST SEND DATA
                        </Button>
                    </Col>
                </Row>
                <Row className="text-center mb-4">
                    <Col>
                        {phase === "WAIT" ? (
                            <h4>Waiting for other player to connect</h4>
                        ) : (
                            <h4>Place your ships and hit "Ready"</h4>
                        )}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col className="col-md-6">
                        <div className="grid d-flex flex-row">
                            {player.field.map(el => (
                                <div
                                    className={el.className}
                                    key={`k${nanoid()}`}
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
                        {phase === WARM_UP ? <Controls /> : null}
                    </Col>
                    <Col className="col-md-6">
                        <div className="grid d-flex flex-row">
                            {enemy.field.map(cell => (
                                <div
                                    className={this.handleEnemyCells(cell)}
                                    key={`k${nanoid()}`}
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
        canPlayerShoot: bool => dispatch(canPlayerShoot(bool)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
