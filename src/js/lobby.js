import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Button,
    Container,
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
} from "reactstrap";

import { selectGameMode, SINGLEPLAYER, MULTIPLAYER, toogleRegistration } from "./actions";

class Lobby extends Component {
    constructor() {
        super();
    }
    render() {
        const {
            isRegistrationFormOpened,
            openRegistrationForm,
            selectSingleplayer,
            selectMultiplayer,
        } = this.props;

        const registrationForm = (
            <>
                {isRegistrationFormOpened ? (
                    <>
                        <h3>Registration</h3>
                        <p>Create your account</p>
                    </>
                ) : (
                    <>
                        <h3>Sign in</h3>
                        <p>Login to your account with username and password</p>
                    </>
                )}
                <Form>
                    <FormGroup>
                        <Input
                            type="username"
                            name="username"
                            id="usernameInput"
                            placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="password"
                            name="password"
                            id="passwordInput"
                            placeholder="Password"
                        />
                    </FormGroup>
                    {isRegistrationFormOpened && (
                        <FormGroup>
                            <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPasswordInput"
                                placeholder="Confirm password"
                            />
                        </FormGroup>
                    )}
                    {isRegistrationFormOpened ? (
                        <>
                            <Button color="primary">Complete registration</Button>
                            <Button onClick={openRegistrationForm} color="link">
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="primary">Sign in</Button>
                            <Button onClick={openRegistrationForm} color="link">
                                Not registered?
                            </Button>
                        </>
                    )}
                </Form>
            </>
        );
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>Battleships</h1>
                        <p>A classic strategy game for two players.</p>
                    </Col>
                </Row>
                <hr />
                {registrationForm}
                {this.props.isUserSignedIn && (
                    <>
                        <hr />
                        <h3 className="text-center mb-4">Choose Game mode</h3>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <ButtonGroup vertical className="" size="lg">
                                    <Button
                                        onClick={selectSingleplayer}
                                        color="primary"
                                        className="mb-2"
                                    >
                                        Play vs. Bot
                                    </Button>
                                    <Button
                                        onClick={selectMultiplayer}
                                        color="primary"
                                        className="mb-2"
                                    >
                                        Play vs. Friend
                                    </Button>
                                    <Button color="info">Show rules</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { mode } = state;
    const { isRegistrationFormOpened } = state;
    const { isUserSignedIn } = state;

    return { mode, isRegistrationFormOpened, isUserSignedIn };
};

const mapDispatchToProps = dispatch => {
    return {
        selectSingleplayer: () => dispatch(selectGameMode(SINGLEPLAYER)),
        selectMultiplayer: () => dispatch(selectGameMode(MULTIPLAYER)),
        openRegistrationForm: () => dispatch(toogleRegistration()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
