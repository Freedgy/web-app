import React from "react";
import { Form, Card, Row, Container, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import userContext from "../../context/user";


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: "",
            name: "",
            last_name: "",
            pwd: "",
            checked: false,
            validated: false,
            mailError: "",
            nameError: "",
            last_nameError: "",
            passwordError: "",
        };
    }

    componentDidMount() {
    }

    handleSubmit = (event) => {
        const { signIn, setToken } = this.context
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            var url = "http://35.210.17.248:8080/user/register"
            var data = {
                name: this.state.name,
                last_name: this.state.last_name,
                password: this.state.pwd,
                email: this.state.mail
            }
            axios.post(url, data)
            .then((rep) => {
                setToken("41df65b1df56r16er")
                signIn({name: data.name, last_name : data.last_name, email: data.email})
                window.location.href = "/"
            }).catch(() => {
                this.setState({
                    mailError: "user already exist",
                })
            });
            // var data = {
            //     username: this.state.mail,
            //     fakeid: "156871568162",
            //     faketoken: "41df65b1df56r16er"
            // }
            // setToken(data.faketoken)
            // signIn({user_name: data.username, id : data.fakeid})
            // window.location.href = "/"
        } else {
            if (this.state.mail === "") {
                this.setState({
                    mailError: "Field must not be empty!",
                })
            }
            if (this.state.pwd === "") {
                this.setState({
                    passwordError: "Field must not be empty!",
                })
            }
        }
        this.setState({validated:true})
    };

    handleCheck = (event) => {
        this.setState({
            checked: event.target.checked
        });
    };

    render () {
        const { mail, name, last_name, pwd, checked, validated, passwordError, mailError } = this.state;
        return (
            <Container className="vh-100">
                <Row className="vh-100 justify-content-center align-items-center">
                    <Col lg={7}>
                        <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                            <Card.Body className="pb-0">
                                <Row className="justify-content-center">
                                    <h3>Sign-up</h3>
                                </Row>
                                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                        <Form.Label htmlFor="idmail">mail</Form.Label>
                                        <Form.Control
                                            required
                                            id="idmail"
                                            type="text"
                                            placeholder="mail"
                                            value={mail}
                                            onChange={e => this.setState({mail: e.target.value, validated: false, mailError: ""})}
                                        />
                                        {mailError}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="idname">name</Form.Label>
                                        <Form.Control
                                            required
                                            id="idname"
                                            type="text"
                                            placeholder="name"
                                            value={name}
                                            onChange={e => this.setState({name: e.target.value, validated: false, nameError: ""})}
                                        />
                                        {mailError}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="idmail">last_name</Form.Label>
                                        <Form.Control
                                            required
                                            id="idlast_name"
                                            type="text"
                                            placeholder="last_name"
                                            value={last_name}
                                            onChange={e => this.setState({last_name: e.target.value, validated: false, last_nameError: ""})}
                                        />
                                        {mailError}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="idPassword">Password</Form.Label>
                                        <Form.Control
                                            required
                                            id="idPassword"
                                            type="password"
                                            placeholder="Password"
                                            value={pwd}
                                            onChange={e => this.setState({pwd: e.target.value, validated: false, passwordError: ""})}
                                        />
                                        {passwordError}
                                    </Form.Group>
                                    <Row className="justify-content-center mt-4">
                                        <Form.Check
                                            type="checkbox"
                                            label="I agree with CGU"
                                            required
                                            checked={checked}
                                            onChange={this.handleCheck}
                                        />
                                    </Row>
                                    <Row className="justify-content-center mt-4 mb-4">
                                        <Button 
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Sign-up
                                        </Button>
                                    </Row>
                                </Form>
                                <Row className="justify-content-center mt-4">
                                    <a href="/user/Login">I already have an account</a>
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

Signup.contextType = userContext

export default Signup;