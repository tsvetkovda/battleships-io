import React, { Component } from "react";
import { connect } from "react-redux";

import nanoid from "nanoid";

import { Button, Container, Row, Col, ButtonGroup, Badge } from "reactstrap";

import Lobby from "./lobby";

import { enemyField } from "./utils";

import {
    selectGameMode,
    LOBBY,
    selectShip,
    placeShip,
    changeOrientation,
    reset,
    setBattlePhase,
    WARM_UP,
} from "./actions";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

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
                                Rotate
                            </Button>
                            <Button color="primary" className="mb-1" onClick={reset}>
                                Reset
                            </Button>
                            <Button color="primary" className="mb-1">
                                Random
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col className="col-md-6">
                        <div className="grid d-flex flex-row mb-4">
                            {enemyField.map(el => (
                                <div
                                    className={el.className}
                                    key={nanoid()}
                                    data-x={el.x}
                                    data-y={el.y}
                                    onMouseOver={() => (event.target.className = "cell-selected")}
                                    onMouseLeave={() => (event.target.className = el.className)}
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
    } = state;

    return {
        mode,
        isRegistrationFormOpened,
        isUserSignedIn,
        selectedShipSize,
        player,
        orientation,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectLobby: () => dispatch(selectGameMode(LOBBY)),
        openRegistrationForm: () => dispatch(toogleRegistration()),
        selectShip: size => dispatch(selectShip(size)),
        placeShip: (position, size, orientation, ships) =>
            dispatch(placeShip(position, size, orientation, ships)),
        changeOrientation: () => dispatch(changeOrientation()),
        reset: () => dispatch(reset()),
        setBattlePhase: phase => dispatch(setBattlePhase(phase)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
