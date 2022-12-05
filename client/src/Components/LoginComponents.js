import React, { useState } from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import './Login.css'
import { toast } from "react-toastify";


function LoginForm(props) {
  const [username, setUsername] = useState(''); //si possono anche lasciare per l'esame
  const [password, setPassword] = useState(''); //così testano direttamente con questo utente

  const handleSubmit = (event) => {
    event.preventDefault(); //evita di ricaricare la pagina+
    const credentials = { username, password };

    // SOME VALIDATION, ADD MORE!!!
    let valid = true;
    if (username === '' || password === '' || password.length < 6) {
      valid = false;
      toast.error("Username and/or password wrong. Try again.", { position: "top-center" }, { toastId: 2 })
    }

    if (valid) {
      props.login(credentials) //gestiamo un'eventuale errore
        .catch((err) => { toast.error(err, { position: "top-center" }, { toastId: 4 }) })
        ;
    }
  };


  return (
    <div className="Login below-nav main-content text-center">
      <br />
      <Row className="justify-content-center text-center">
        <h2> LOGIN </h2>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        </Form.Group>
        <br />
        <Form.Group size="lg">
          <Button variant="success" size="lg" id="submitLogin" type="submit" >
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}


function LogoutButton(props) {
  return (
    <Col>
      <span>User: {props.user?.name}</span>{' '}<Button variant="outline-primary" onClick={props.logout}>Logout</Button>
    </Col>
  )
}

export { LoginForm, LogoutButton };