import React from "react";
import { Form, Card, Row, Container, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import axios from 'axios'
import userContext from "../../context/user";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pseudo: "",
            pwd: "",
            validated: false,
            pseudoError: "",
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
            var url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/user/login"
            var data = {
                username: this.state.pseudo,
                password: this.state.pwd
            }
            axios.post(url, data)
            .then( (rep) => {
                setToken(rep.data.accessToken)
                signIn({user_name: data.username, id : rep.data.id})
                window.location.href = "/"
            }).catch( () => {
                this.setState({
                    pseudoError: "invalid pseudo or password",
                    passwordError: "invalid pseudo or password"
                })
            });
        } else {
            if (this.state.pseudo === "") {
                this.setState({
                    pseudoError: "Field must not be empty!",
                })
            }
            if (this.state.pwd === "") {
                this.setState({
                    passwordError: "Field must not be empty!",
                })
            }
        }
        this.setState({validated:false})
    };

    render () {
        const {pseudo, pwd, validated, passwordError, pseudoError } = this.state;
        return (
            <Container className="vh-100">
                <Row className="vh-100 justify-content-center align-items-center">
                    <Col lg={7}>
                        <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                            <Card.Body className="pb-0">
                                <Row className="justify-content-center">
                                    <h3>Signin</h3>
                                </Row>
                                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label htmlFor="idPseudo">Pseudo</Form.Label>
                                        <Form.Control
                                            required
                                            id="idPseudo"
                                            type="text"
                                            placeholder="Pseudo"
                                            value={pseudo}
                                            onChange={e => this.setState({pseudo: e.target.value, validated: false, pseudoError: "", passwordError: ""})}
                                        />
                                        {pseudoError}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="idPassword">Password</Form.Label>
                                        <Form.Control
                                            required
                                            id="idPassword"
                                            type="password"
                                            placeholder="Password"
                                            value={pwd}
                                            onChange={e => this.setState({pwd: e.target.value, validated: false, pseudoError: "", passwordError: ""})}
                                        />
                                        {passwordError}
                                    </Form.Group>
                                    <Row className="justify-content-center mt-4 mb-4">
                                        <Button 
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Signin
                                        </Button>
                                    </Row>
                                </Form>
                                <Row className="justify-content-center mt-4">
                                    <a href="/user/Sign-up">I don't have an account</a>
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

Login.contextType = userContext

export default Login;