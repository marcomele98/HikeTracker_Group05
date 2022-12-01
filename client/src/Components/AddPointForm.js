import { point } from "leaflet";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { SelectorMap } from "./Map"
import { getCoordsDetails } from "../utilities"

const AddPointForm = (props) => {

	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [height, setHeight] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		if (props.point?.address)
			setAddress(props.point.address)
	}, [props.point])


	const setPointAddress = async (coordinates) => {
		const addr = (await getCoordsDetails(coordinates)).Address
		setAddress(addr)
	}

	function addReferencePoint() {

		const point = {
			latitude: lat,
			longitude: long,
			altitude: height,
			name,
			address
		}

		if (point) {
			setErrMsg("Please select a point.");
		}
		else {
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


		if (props.type === "Start point" || props.type === "Start and End point" || props.type === "End point") {
			props.setPoint({ ...props.point, name: name, address: address });
		}
	}

	return (
		(!props.points && !props.point)
			?
			<></>
			:
			<>
				<Row className="justify-content-center">
					<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
						<h2 className="text-left">{props.type}</h2>
					</Col>
				</Row>

				{props.type === "New point" && props.points.length !== 0 ?
					<Row className="justify-content-center">
						<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
							<SelectorMap
								clearAddress={() => setAddress("")}
								onClick={(el) => {
									setLat(el.lat);
									setLong(el.lon)
									setPointAddress({ latitude: el.lat, longitude: el.lon });
									setHeight(el.ele)
									confirmPoint(el.lat, el.lon, el.ele, name, address)
								}}
								positions={props.points}
							/>
						</Col>
					</Row>
					: <></>
				}

				<Row className="justify-content-center">
					<Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
						<Form.Group className={"mb-4"} controlId="validationCustom04">
							<Form.Label className={"fs-4"}>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Insert name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									confirmPoint(lat, long, height, e.target.value, address);
								}}
							/>
						</Form.Group>
					</Col>


					<Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
						{
							address
								?
								<Form.Group className={"mb-4"} controlId="validationCustom05">
									<Form.Label className={"fs-4"}>Address</Form.Label>
									<Form.Control
										disabled
										type="text"
										placeholder="Insert address"
										value={address}
									/>
								</Form.Group>


								:
								undefined
						}
					</Col>


				</Row>

				{props.type === "New point" && props.points ?
					<>
						<Row className="justify-content-center">
							<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
								{errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}
							</Col>
						</Row>
						<Row className="justify-content-center">
							<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
								<Button variant="success" onClick={addReferencePoint}>Confirm point</Button>
								<Button className="mx-4" variant="danger" onClick={() => props.setShowForm(false)}>Cancel point</Button>
							</Col>
						</Row>
					</>
					:
					null
				}



			</>
	)

}

export default AddPointForm;