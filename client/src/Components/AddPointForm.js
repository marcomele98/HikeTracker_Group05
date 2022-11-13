import React, {useState} from "react";
import {Form, Row, Col, Button, Alert} from "react-bootstrap";

const AddPointForm = (props) => {

    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [height, setHeight] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
	const [errMsg,setErrMsg] = useState("");

	const isNotValidPoint = (point) => {
        let regexpLatitude = new RegExp('^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$');
        let regexpLongitude = new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$');

        return point.latitude === undefined || point.latitude === '' ||
            point.latitude === null || point.latitude < -90 || point.latitude > 90 || 
            !regexpLatitude.test(point.latitude) ||
            point.longitude === undefined || point.longitude === '' ||
            point.longitude === null || point.longitude < -180 || point.longitude > 180 ||
            !regexpLongitude.test(point.longitude) ||
            point.altitude === undefined || point.altitude === '' ||
            point.altitude === null || isNaN(point.altitude);
    }

	function addReferencePoint(){

		const point = {
			latitude: lat,
			longitude: long,
			altitude: height,
			name,
			address
		}

		if(isNotValidPoint(point)){
			setErrMsg("Please insert correct coordinates");
		}
		else{
			let referencePoints = props.referencePoints;
			referencePoints.push(point);

			props.setReferencePoints(referencePoints);

			setLat("");
			setLong("");
			setHeight("");
			setName("");
			setAddress("");
			props.setShowForm(false);
		}
	}

	const confirmPoint = (lat, long, height, name, address) => {
		//TODO: validityCheck

		const point = {
			latitude: lat,
			longitude: long,
			altitude: height,
			name,
			address
		}
		
		if (props.type === "Start point"){
			props.setStartPoint(point);
		}
		else if(props.type === "End point"){
			props.setEndPoint(point);
		}
	}

    return(
        <>
        <Col>
            <h2>{props.type}</h2>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom01">
				<Form.Label className = {"fs-4"}>Latitude</Form.Label>
				<Form.Control
					required
					type="number"
					placeholder="Insert latitude"
					value={lat}
					onChange={(e) =>{
						setLat(e.target.value);
						confirmPoint(e.target.value, long, height, name, address);
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert correct latitude</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom02">
				<Form.Label className = {"fs-4"}>Longitude</Form.Label>
				<Form.Control
					required
					type="number"
					placeholder="Insert longitude"
					value={long}
					onChange={(e) =>{
						setLong(e.target.value);
						confirmPoint(lat, e.target.value, height, name, address);
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert correct longitude</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom03">
				<Form.Label className = {"fs-4"}>Height</Form.Label>
				<Form.Control
					required
					type="number"
					placeholder="Insert height"
					value={height}
					onChange={(e) =>{
						setHeight(e.target.value);
						confirmPoint(lat, long, e.target.value, name, address);
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert correct height</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom04">
				<Form.Label className = {"fs-4"}>Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert name"
					value={name}
					onChange={(e) =>{
						setName(e.target.value);
						confirmPoint(lat, long, height, e.target.value, address);
					}}
				/>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom05">
				<Form.Label className = {"fs-4"}>Address</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert address"
					value={address}
					onChange={(e) =>{
						setAddress(e.target.value);
						confirmPoint(lat, long, height, name, e.target.value);
					}}
				/>
			</Form.Group>

			{props.type==="New point"?
			<>
			<Row className="mt-2" md={3}>{errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}</Row>
			<Row>
				<Col>
					<Button variant = "outline-primary" onClick={addReferencePoint}>Confirm</Button>
					<Button className = "mx-4" variant = "outline-dark" onClick={() => props.setShowForm(false)}>Cancel new point</Button>		
				</Col>
			</Row>
			</>
			:
			null
			}

        
        </Col>
        </>
    )

}

export default AddPointForm;