import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Badge, ButtonToggle } from "reactstrap";

import { selectShip, changeOrientation, reset, setRandom } from "../actions";

class Controls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { player, reset, setRandom, orientation, changeOrientation, selectShip } = this.props;

        return (
            <div className="controls mt-4">
                <ButtonToggle onClick={() => selectShip(1)} className="mb-1">
                    Size: 1 <Badge color="light">left:{player.availableShips[1]}</Badge>
                </ButtonToggle>{" "}
                <ButtonToggle onClick={() => selectShip(2)} className="mb-1">
                    Size: 2 <Badge color="light">left:{player.availableShips[2]}</Badge>
                </ButtonToggle>{" "}
                <ButtonToggle onClick={() => selectShip(3)} className="mb-1">
                    Size: 3 <Badge color="light">left:{player.availableShips[3]}</Badge>
                </ButtonToggle>{" "}
                <ButtonToggle onClick={() => selectShip(4)} className="mb-1">
                    Size: 4 <Badge color="light">left:{player.availableShips[4]}</Badge>
                </ButtonToggle>{" "}
                <Button color="primary" onClick={changeOrientation} className="mb-1">
                    Rotate <Badge color="light">{orientation}</Badge>
                </Button>{" "}
                <Button color="primary" className="mb-1" onClick={reset}>
                    Reset
                </Button>{" "}
                <Button color="primary" className="mb-1" onClick={setRandom}>
                    Random
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { player, orientation } = state;

    return {
        player,
        orientation,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectShip: size => dispatch(selectShip(size)),
        changeOrientation: () => dispatch(changeOrientation()),
        reset: () => dispatch(reset()),
        setRandom: () => dispatch(setRandom()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
