import React, {useState} from "react";
import {Form, Row, Col, Button} from "react-bootstrap";

const AddPointForm = (props) => {

    const [lat, setLat] = useState(45.17778);
    const [long, setLong] = useState(7.08337);
    const [height, setHeight] = useState(2147.107666);
    const [name, setName] = useState("prova");
    const [address, setAddress] = useState("prova");

	function addReferencePoint(){

		const point = {
			latitude: lat,
			longitude: long,
			altitude: height,
			name,
			address
		}

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

	function confirmPoint(){
		//TODO: validityCheck

		const point = {
			latitude: lat,
			longitude: long,
			altitude: height,
			name,
			address
		}

		console.log(point);

		if (props.type === "Start point"){
			props.setStartPoint(point);
		}
		else if(props.type === "End point"){
			props.setEndPoint(point);
		}
		else{
			
		}
	}

    return(
        <>
        <Col className="m-3">
            <h2>{props.type}</h2>
            <Form>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom01">
				<Form.Label className = {"fs-4"}>Latitude</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="Insert latitude"
					value={lat}
					onChange={(e) =>{
						setLat(e.target.value);
						confirmPoint();
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom02">
				<Form.Label className = {"fs-4"}>Longitude</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="Insert longitude"
					value={long}
					onChange={(e) =>{
						setLong(e.target.value);
						confirmPoint();
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom03">
				<Form.Label className = {"fs-4"}>Height</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="Insert height"
					value={height}
					onChange={(e) =>{
						setHeight(e.target.value);
						confirmPoint();
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom04">
				<Form.Label className = {"fs-4"}>Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert name"
					value={name}
					onChange={(e) =>{
						setName(e.target.value);
						confirmPoint();
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom05">
				<Form.Label className = {"fs-4"}>Address</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert address"
					value={address}
					onChange={(e) =>{
						setAddress(e.target.value);
						confirmPoint();
					}}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

			{props.type==="New point"?
			<Row>
				<Col>
					<Button variant = "outline-primary" onClick={addReferencePoint}>Confirm</Button>
					<Button className = "mx-4" variant = "outline-dark" onClick={() => props.setShowForm(false)}>Cancel new point</Button>		
				</Col>
			</Row>
			:
			null
			}

        </Form>
        </Col>
        </>
    )

}

export default AddPointForm;