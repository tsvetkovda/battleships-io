import React, { Component } from "react";
import { connect } from "react-redux";

import nanoid from "nanoid";

import { Button, Container, Row, Col, ButtonGroup, Badge } from "reactstrap";

import Lobby from "./lobby";

import { enemyField, generateRandomCell, generateRandomOrientation } from "./utils";

import {
    selectGameMode,
    LOBBY,
    selectShip,
    placeShip,
    changeOrientation,
    reset,
    setBattlePhase,
    WARM_UP,
    shootAtEnemy,
    setRandom,
} from "./actions";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    setRandom() {}

    handleEnemyCells(el) {
        if (el.destroyed) {
            return "cell-destroyed";
        } else if (el.missed) {
            return "cell-missed";
        } else {
            return "cell";
        }
    }

    render() {
        const {
            mode,
            selectLobby,
            selectShip,
            placeShip,
            player,
            changeOrientation,
            selectedShipSize,
            orientation,
            setBattlePhase,
            reset,
            setRandom,
            enemy,
            shootAtEnemy,
        } = this.props;

        return mode === LOBBY ? (
            <Lobby />
        ) : (
            <Container>
                <Row className="mb-4 mt-2">
                    <Col>
                        <Button color="primary" onClick={() => setBattlePhase(WARM_UP)}>
                            Start game
                        </Button>
                        <Button onClick={selectLobby} color="link">
                            Back to lobby
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
                        <ButtonGroup size="sm" className="mw-100">
                            <Button onClick={() => selectShip(1)} className="mb-1">
                                Size: 1 <Badge color="light">left:{player.availableShips[1]}</Badge>
                            </Button>
                            <Button onClick={() => selectShip(2)} className="mb-1">
                                Size: 2 <Badge color="light">left:{player.availableShips[2]}</Badge>
                            </Button>
                            <Button onClick={() => selectShip(3)} className="mb-1">
                                Size: 3 <Badge color="light">left:{player.availableShips[3]}</Badge>
                            </Button>
                            <Button onClick={() => selectShip(4)} className="mb-1">
                                Size: 4 <Badge color="light">left:{player.availableShips[4]}</Badge>
                            </Button>
                            <Button color="primary" onClick={changeOrientation} className="mb-1">
                                Rotate <Badge color="light">{orientation}</Badge>
                            </Button>
                            <Button color="primary" className="mb-1" onClick={reset}>
                                Reset
                            </Button>
                            <Button color="primary" className="mb-1" onClick={setRandom}>
                                Random
                            </Button>
                        </ButtonGroup>
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
                                    onClick={() =>
                                        shootAtEnemy({ x: cell.x, y: cell.y }, enemy.field)
                                    }
                                >
                                    <img src="../../src/assets/img/aspect-ratio.png"></img>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const {
        mode,
        isRegistrationFormOpened,
        isUserSignedIn,
        selectedShipSize,
        player,
        orientation,
        enemy,
    } = state;

    return {
        mode,
        isRegistrationFormOpened,
        isUserSignedIn,
        selectedShipSize,
        player,
        enemy,
        orientation,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectLobby: () => dispatch(selectGameMode(LOBBY)),
        openRegistrationForm: () => dispatch(toogleRegistration()),
        selectShip: size => dispatch(selectShip(size)),
        placeShip: (position, shipSize, orientation, availableShips) =>
            dispatch(placeShip(position, shipSize, orientation, availableShips)),
        changeOrientation: () => dispatch(changeOrientation()),
        reset: () => dispatch(reset()),
        setRandom: () => dispatch(setRandom()),
        setBattlePhase: phase => dispatch(setBattlePhase(phase)),
        shootAtEnemy: (position, enemyField) => dispatch(shootAtEnemy(position, enemyField)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
