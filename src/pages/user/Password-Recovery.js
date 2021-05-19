import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import userContext from "../../context/user";

const mail_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const steps = [
    "mail",
    "code",
    "new Password"
]

class PasswordRecovery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: "",
            code: "",
            pwd: "",
            confirmPwd: "",
            activeStep: 0,
        };
    }

    componentDidMount() {
    }

    sendMail = () => {
        if (mail_reg.test(this.state.mail)) {
            console.log("api call to server")
        } else {
            console.log("invalid mail")
        }
        return (mail_reg.test(this.state.mail))
    }

    sendCode = () => {
        if (this.state.code == "") {
            return false
        }
        console.log("api call to send code to server")
        return (true)
    }

    changePassword = () => {
        if (this.state.pwd == "") {
            return false
        } else if (this.state.pwd != this.state.confirmPwd) {
            return
        }
        console.log("api call to send password to server")
        return (true)
    }

    handleNext = () => {
        if (this.state.activeStep == 0) {
            if (!this.sendMail()) {
                return
            }
        } else if (this.state.activeStep == 1) {
            if (!this.sendCode()) {
                return
            }
        } else if (this.state.activeStep == 2) {
            if (!this.changePassword()) {
                return
            }
        }
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    };

    getfirstStep = ()  => {
        return (
            <>
            <Row className="justify-content-center">
                <TextField
                    label="Mail"
                    variant="outlined"
                    value={this.state.mail}
                    onChange={(e) => {this.setState({mail: e.target.value})}}
                />
            </Row>
            </>
        )
    }
    
    getSecondStep = () => {
        return (
            <>
            <Row className="justify-content-center">
                <TextField
                    label="Code"
                    variant="outlined"
                    value={this.state.code}
                    onChange={(e) => {this.setState({code: e.target.value})}}
                />
            </Row>
            </>
        )
    }
    
    getThirdStep = ()  => {
        return (
            <>
            <Row className="justify-content-center">
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={this.state.pwd}
                    onChange={(e) => {this.setState({pwd: e.target.value})}}
                />
            </Row>
            &nbsp;
            <Row className="justify-content-center">
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={this.state.confirmPwd}
                    onChange={(e) => {this.setState({confirmPwd: e.target.value})}}
                />
            </Row>
            </>
        )
    }
    
    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return this.getfirstStep();
              case 1:
                return this.getSecondStep();
              case 2:
                return this.getThirdStep();
              default:
                return 'Unknown stepIndex';
        }
    }
    
    render () {
        const { activeStep } = this.state;
        return (
            <Container className="vh-100">
                <Row className="vh-100 justify-content-center align-items-center">
                    <Col lg={7}>
                        <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                            <Card.Body className="pb-0">
                                <Row className="justify-content-center">
                                    <h3>Password Recovery</h3>
                                </Row>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                {this.getStepContent(activeStep)}
                                &nbsp;
                                <Row className="justify-content-center">
                                    <Col>
                                        <Row className="justify-content-center">
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                            >
                                                Back
                                            </Button>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Button 
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                            >
                                                {activeStep === steps.length - 1 ? 'Validate new password' : 'Next'}
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                                &nbsp;
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }    
}

PasswordRecovery.contextType = userContext

export default PasswordRecovery;