import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CliccableMap } from "./cliccableMap";
import { toast } from "react-toastify";
import API from "../API";


const ParkingForm = (props) => {

    const [name, setName] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [position, setPosition] = useState();
    const [altitude, setAltitude] = useState("");
    const [capacity, setCapacity] = useState("");
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
            if (!position)
                setErrMsg("Please select a point on the map.");
            else {
                sendForm();
            }
        }

        setValidated(true);
    };



    useEffect(() => {
        if (!props.user !== "" && props.user.role !== 'local guide') {
            navigate("/");
        }

    }, [props.user]);


    const sendForm = async () => {

        const pos = { lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) }

        const parking = {
            name,
            region,
            province,
            city,
            capacity,
            latitude: pos.lat,
            longitude: pos.lng,
            altitude
        }


        try {
            props.setIsLoading(true);
            await API.newPark(parking);
            toast.success("Parking Lot added correctly.", { position: "top-center" }, { toastId: 8 });
            props.setIsLoading(false);
            navigate("/parkingLots");
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
                    <h1>New Parking Lot</h1>
                </Col>
            </Row>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Row className={"mb-4"}></Row>

                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
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

                    <Col xs={12} sm={12} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 3, offset: 1 }}>
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

                    <Col xs={12} sm={12} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 3, offset: 1 }}>
                        <Form.Group className={"mb-4"} controlId="validationCustom02">
                            <Form.Label className={"fs-4"}>Available Slots</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Insert available slots"
                                value={capacity}
                                onChange={(e) => {
                                    setCapacity(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Please insert correct capacity</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-4">
                    <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                        <CliccableMap position={position} setPosition={setPosition} setCity={setCity} setRegion={setRegion} setProvince={setProvince} setErrMsg={setErrMsg}></CliccableMap>
                    </Col>
                </Row>
                {
                    !position ?
                        false
                        :
                        <Row className="justify-content-center">

                            <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>

                                <Form.Group className={"mb-4"} controlId="validationCustom02">
                                    <Form.Label className={"fs-4"}>Region</Form.Label>
                                    <Form.Control
                                        required
                                        disabled={true}
                                        type="text"
                                        placeholder="Insert region"
                                        value={region}
                                    />
                                    <Form.Control.Feedback type="invalid">Please insert correct length</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={12} sm={12} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 3, offset: 1 }}>
                                <Form.Group className={"mb-4"} controlId="validationCustom06">
                                    <Form.Label className={"fs-4"}>Province</Form.Label>
                                    <Form.Control
                                        required
                                        disabled={true}
                                        type="text"
                                        placeholder="Insert province"
                                        value={province}
                                        maxLength={2}
                                    />
                                    <Form.Control.Feedback type="invalid">Please insert correct province</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={12} sm={12} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 3, offset: 1 }}>
                                <Form.Group className={"mb-4"} controlId="validationCustom07">
                                    <Form.Label className={"fs-4"}>City</Form.Label>
                                    <Form.Control
                                        required
                                        disabled={true}
                                        type="text"
                                        placeholder="Insert city"
                                        value={city}
                                    />
                                    <Form.Control.Feedback type="invalid">Please insert correct city</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                }
                <Row className="justify-content-center mt-2" >
                    <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>{errMsg ?
                        <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <div className='rowCentered'>
                        <Button type="submit" variant="outline-success" style={{ width: 200, borderWidth: 3 }}>Create new parking lot</Button>
                        <Button variant="outline-danger" style={{ width: 200, borderWidth: 3, marginLeft: 20 }} onClick={() => navigate("/parkingLots")}>Cancel</Button>
                    </div>
                </Row>
            </Form >
            <Row className="mb-4" ></Row>
        </div>
    )
}

export default ParkingForm;