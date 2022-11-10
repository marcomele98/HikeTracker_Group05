import React, {useState} from "react";
import {Form, Col, Button} from "react-bootstrap";

const AddPointForm = (props) => {

    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [height, setHeight] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

	function confirmPoint(){
		//TODO: validityCheck

		const point = {
			lat,
			long,
			height,
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
					onChange={(e) => setLat(e.target.value)}
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
					onChange={(e) => setLong(e.target.value)}
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
					onChange={(e) => setHeight(e.target.value)}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom04">
				<Form.Label className = {"fs-4"}>Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

            <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom05">
				<Form.Label className = {"fs-4"}>Address</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			</Form.Group>

			<Button onClick={confirmPoint}>Confirm</Button>
        </Form>
        </Col>
        </>
    )

}

export default AddPointForm;