import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CliccableMap } from "./cliccableMap";
import { toast } from "react-toastify";
import API from "../API";
import { getCoordsDetails } from "../utilities"
import { ImageInput } from "./imageInput"

const HutForm = (props) => {

    const [name, setName] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [position, setPosition] = useState();
    const [altitude, setAltitude] = useState("");
    const [type, setType] = useState("");
    const [numberBeds, setNumberBeds] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [validated, setValidated] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [image, setImage] = useState();
	const [imagePath, setImagePath] = useState("");

    const navigate = useNavigate();



    useEffect(() => {
        const positionChangeHandle = async () => {
            const details = await getCoordsDetails({ latitude: position.lat, longitude: position.lng })
            if (details.CountryCode !== "ITA") {
                setErrMsg("At the moment are no accepted points outside ita.");
                setPosition();
            } else {
                setCity(details.City)
                setRegion(details.Region)
                setProvince(details.SubregionCode)
            }
        }
        if (position)
            positionChangeHandle()
    }, [position])


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            if (isNotValidNumber(numberBeds))
                setErrMsg("Please insert a correct number of beds.");
            else if (!position)
                setErrMsg("Please select a point on the map.");
            else {
                sendForm();
            }
        }

        setValidated(true);
    };

    const isNotValidNumber = (number) => {
        return (number < 0)
    }


    useEffect(() => {
        if (!props.user !== "" && props.user.role !== 'local guide') {
            navigate("/");
        }

    }, [props.user]);


    const sendForm = async () => {

        const hut = {
            name,
            region,
            province,
            city,
            latitude: position.lat.toFixed(6),
            longitude: position.lng.toFixed(6),
            altitude,
            type,
            number_of_beds: numberBeds,
            phone,
            email,
            description, 
            image
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
        <div className="p-3 mt-3">
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                    <h1>New Hut</h1>
                </Col>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Row className={"mb-4"}></Row>


                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <Form.Group className={"mb-4"} controlId="validationCustom01">
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
                    </Col>


                    <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
                        <Form.Group className={"mb-4"} controlId="validationCustom08">
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
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <Form.Group className={"mb-4"} controlId="validationCustom09">
                            <Form.Label className={"fs-4"}>Number of beds</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Insert number of beds"
                                value={numberBeds}
                                onChange={(e) => {
                                    setNumberBeds(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Please insert correct number of beds</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
                        <Form.Group className={"mb-4"} controlId="validationCustom03">
                            <Form.Label className={"fs-4"}>{"Altitude (m)"}</Form.Label>
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
                    </Col>


                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <Form.Group className={"mb-4"} controlId="validationCustom11">
                            <Form.Label className={"fs-4"}>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insert phone number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Please insert correct phone number</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
                        <Form.Group className={"mb-4"} controlId="validationCustom12">
                            <Form.Label className={"fs-4"}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Insert email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Please insert correct email</Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                </Row>

                <Row className="justify-content-center">

                    <Form.Group className={"mb-4"} as={Col} xs={12} sm={12} md={11} lg={11} xl={11} xxl={11} controlId="validationCustom10">
                        <Form.Label className={"fs-4"}>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            as="textarea"
                            rows="3"
                            placeholder="Insert description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Please insert correct description</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <ImageInput setImage={setImage} imagePath={imagePath} setImagePath={setImagePath}></ImageInput>

                <Row className="justify-content-center mb-4">
                    <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                        <CliccableMap position={position} setPosition={setPosition}></CliccableMap>
                    </Col>
                </Row>

                {
                    !position
                        ?
                        undefined
                        :
                        <>
                            <Row className="justify-content-center">
                                <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <Form.Group className={"mb-4"} controlId="validationCustom02">
                                        <Form.Label className={"fs-4"}>Region</Form.Label>
                                        <Form.Control
                                            required
                                            disabled
                                            type="text"
                                            placeholder="Insert region"
                                            value={region}
                                        />
                                        <Form.Control.Feedback type="invalid">Please insert correct region</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={12} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 3, offset: 1 }}>
                                    <Form.Group className={"mb-4"} controlId="validationCustom06">
                                        <Form.Label className={"fs-4"}>Province</Form.Label>
                                        <Form.Control
                                            required
                                            disabled
                                            type="text"
                                            placeholder="Insert province"
                                            value={province}
                                        />
                                        <Form.Control.Feedback type="invalid">Please insert correct province</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={12} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 3, offset: 1 }}>
                                    <Form.Group className={"mb-4"} controlId="validationCustom07">
                                        <Form.Label className={"fs-4"}>City</Form.Label>
                                        <Form.Control
                                            required
                                            disabled
                                            type="text"
                                            placeholder="Insert city"
                                            value={city}

                                        />
                                        <Form.Control.Feedback type="invalid">Please insert correct city</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                }

                <Row className="justify-content-center mt-2" >
                    <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                        {errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <div className='rowCentered'>
                        <Button type="submit" variant="outline-success" style={{ width: 200, borderWidth: 3 }}>Create new hut</Button>
                        <Button variant="outline-danger" style={{ width: 200, borderWidth: 3, marginLeft: 20 }} onClick={() => navigate("/huts")}>Cancel</Button>
                    </div>
                </Row>
            </Form >
            <Row className="mb-4" ></Row>
        </div>
    )
}

export default HutForm;