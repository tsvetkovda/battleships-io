import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Badge } from "reactstrap";

import { selectShip, changeOrientation, reset, setRandom } from "../actions";

class Controls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { player, reset, setRandom, orientation, changeOrientation, selectShip } = this.props;

        return (
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
