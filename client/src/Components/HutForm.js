import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CliccableMap } from "./cliccableMap";
import { toast } from "react-toastify";
import API from "../API";


const HutForm = (props) => {

    const [name, setName] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [position, setPosition] = useState();
    const [altitude, setAltitude] = useState("");
    const [type, setType] = useState("");
    const [numberBeds, setNumberBeds] = useState("");
    const [description, setDescription] = useState("");
    const [validated, setValidated] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            if (isNotValidNumber(numberBeds))
				setErrMsg("Please insert a correct number of beds");
            else if (!position)
                setErrMsg("Please select a point on the map");
			else {
				sendForm();
			}
        }

        setValidated(true);
    };

    const isNotValidNumber= (number) => {
        if (number < 0){
            return true;
        }
        else
            return false;
    }


    useEffect(() => {
        if (!props.user !== "" && props.user.role !== 'local guide') {
            navigate("/");
        }

    }, [props.user]);


    const sendForm = async () => {

        const pos = { lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) }

        const hut = {
            name,
            region,
            province,
            city,
            latitude: pos.lat,
            longitude: pos.lng,
            altitude,
            type,
            number_of_beds: numberBeds,
            description
        }


        try {
            props.setIsLoading(true);
            await API.newHut(hut);
            toast.success("Hut added correctly.", { position: "top-center" }, { toastId: 8 });
            props.setIsLoading(false);
            navigate("/huts");
        } catch (err) {
            console.log(err)
            toast.error(err, { position: "top-center" }, { toastId: 9 });
            props.setIsLoading(false);
        }
    };

    return (
        <>
            <Col className={"m-3"}>
                <h1>New Hut</h1>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className={"fs-4"}>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Insert name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Please insert name</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom02">
                        <Form.Label className={"fs-4"}>Region</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Insert region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value.replace(/[^a-z" "]/gi, ''))}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct length</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom06">
                        <Form.Label className={"fs-4"}>Province</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Insert province"
                            value={province}
                            maxLength={2}
                            onChange={(e) => setProvince(e.target.value.toUpperCase().replace(/[^a-z]/gi, ''))}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct province</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom07">
                        <Form.Label className={"fs-4"}>City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Insert city"
                            value={city}
                            onChange={(e) => setCity(e.target.value.replace(/[^a-z" "]/gi, ''))}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct city</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom08">
                        <Form.Label className={"fs-4"}>Type</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Insert type"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct type</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom09">
                        <Form.Label className={"fs-4"}>Number of beds</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Insert number of beds"
                            value={numberBeds}
                            onChange={(e) => {
                                setNumberBeds(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct number of beds</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom10">
                        <Form.Label className={"fs-4"}>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Insert description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct description</Form.Control.Feedback>
                    </Form.Group>
                    <Col xs={12} sm={10} md={8} lg={8} xl={8} xxl={8}>
                        <CliccableMap position={position} setPosition={setPosition}></CliccableMap>
                    </Col>
                    <Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom03">
                        <Form.Label className={"fs-4"}>Altitude</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Insert altitude"
                            value={altitude}
                            onChange={(e) => {
                                setAltitude(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct altitude</Form.Control.Feedback>
                    </Form.Group>
                    



                    <Col className="mt-4">
                        <Row className="mt-2" md={3}>{errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}</Row>
                        <Row md={3}>
                            <Button type="submit" variant="outline-success" onSubmit={handleSubmit}>Create new hut</Button>
                        </Row>

                        <Row md={3} className="my-3">
                            <Button variant="outline-danger" onClick={() => navigate("/")}>Cancel</Button>
                        </Row>
                    </Col>

                </Form>

            </Col>

        </>
    )
}

export default HutForm;