import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import './Login.css'

function NewUserForm(props) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [role, setRole] = useState("hiker");
    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const roles = ['local guide', 'hiker' /*, 'hut worker'*/];

    useEffect(() => {
        if (props.loggedIn) {
            Navigate("/");
        }
    }, [props.loggedIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();

        } else {
            const newUser = {
                name: name,
                surname: surname,
                role: role,
                password: password,
                email: email,
                phone_number: phone_number

            };

            props.addUser(newUser);
            setName("");
            setSurname("");
            setRole("hiker");
            setEmail("");
            setPassword("");
            setPhone_number("");
            setValidated(false);
            props.setLog(true);
        }

    };


    return (
        <div className="Registration" >
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-5">
                <br />
                <Row className="justify-content-center text-center">
                    <h2> REGISTER </h2>
                </Row>
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group  >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                autoFocus
                                type='text'
                                id="nameField"
                                value={name}
                                required
                                onChange={ev => setName(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>
                <br />
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group  >
                            <Form.Label>Surname:</Form.Label>
                            <Form.Control
                                type='text'
                                id="surnameField"
                                value={surname}
                                required
                                onChange={ev => setSurname(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a surname.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>
                <br />
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                id="emailField"
                                value={email}
                                required
                                onChange={ev => setEmail(ev.target.value)} />
                            {email.length === 0 && <Form.Control.Feedback type="invalid">
                                Please insert an email address.
                            </Form.Control.Feedback>}
                            {regex.test(email) === false && email.length > 0 &&
                                <Form.Control.Feedback type="invalid">
                                    Please insert an email address. '@' must be included.
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>
                <br />
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                id="pswField"
                                value={password}
                                required
                                onChange={ev => setPassword(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>
                <br />
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group controlId='phoneNumber'>
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control
                                type='text'
                                id="phoneNumberField"
                                value={phone_number}
                                required
                                onChange={ev => setPhone_number(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>
                <br />
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group>
                            <Form.Label>User Role:</Form.Label>
                            <Form.Select
                                id="selectRole"
                                onChange={(e) => { setRole(e.target.value) }}
                                defaultValue="hiker"
                            >
                                {roles.map((p) => (
                                    <option value={p}>
                                        {p}
                                    </option>
                                ))}

                            </Form.Select>

                        </Form.Group>
                        <br />

                        <Button id="clearButton" size="lg" onClick={() => { setName(""); setSurname(""); setEmail(""); setPassword(""); setRole("hiker"); setPhone_number(""); setValidated(false); }} type="button" variant="secondary" className="float-right">Clear</Button>
                        <Button variant="success" id="submitButton" type="submit" size="lg"  >Register</Button>

                    </Col>
                    <Col xs={2} />
                </Row>


            </Form >
        </div>
    )
}


export { NewUserForm };