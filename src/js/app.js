import React, { Component } from "react";
import { connect } from "react-redux";

import nanoid from "nanoid";

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
} from "reactstrap";

import { selectGameMode, SINGLEPLAYER, MULTIPLAYER, toogleRegistration } from "./actions";

class App extends Component {
    componentDidMount() {}

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
                                Back
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
                        <h3>Choose Game mode</h3>
                        <ListGroup className="text-center">
                            <ListGroupItem className="border-0">
                                <Button onClick={selectSingleplayer} color="primary">
                                    Play vs. Bot
                                </Button>
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <Button onClick={selectMultiplayer} color="primary">
                                    Play vs. Friend
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
