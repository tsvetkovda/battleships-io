import React, { Component } from "react";
import { connect } from "react-redux";

import nanoid from "nanoid";

import { Button, Container, Row, Col, ButtonGroup, Badge } from "reactstrap";

import Lobby from "./lobby";

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

    handleReset() {
        this.props.reset();
        this.forceUpdate();
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
                    <Col>
                        <div className="grid d-flex flex-row w-100 mb-4">
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
                                            player.ships
                                        )
                                    }
                                    onMouseOver={() => (event.target.className = "cell-selected")}
                                    onMouseLeave={() => (event.target.className = el.className)}
                                >
                                    <img src="../../src/assets/img/aspect-ratio.png"></img>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col>
                        <ButtonGroup vertical>
                            <Button onClick={() => selectShip(1)} className="mb-1">
                                Submarine *<Badge color="light">{player.ships[1]}</Badge>
                            </Button>
                            <Button onClick={() => selectShip(2)} className="mb-1">
                                Destroyer **<Badge color="light">{player.ships[2]}</Badge>
                            </Button>
                            <Button onClick={() => selectShip(3)} className="mb-1">
                                Cruiser ***
                                <Badge color="light">{player.ships[3]}</Badge>
                            </Button>
                            <Button onClick={() => selectShip(4)} className="mb-1">
                                Battleship ****<Badge color="light">{player.ships[4]}</Badge>
                            </Button>
                            <Button color="primary" onClick={changeOrientation} className="mb-1">
                                Rotate
                            </Button>
                            <Button
                                color="primary"
                                className="mb-1"
                                onClick={() => this.handleReset()}
                            >
                                Reset
                            </Button>
                            <Button color="primary" className="mb-1">
                                Set random
                            </Button>
                        </ButtonGroup>
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
