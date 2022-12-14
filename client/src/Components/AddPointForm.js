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

	// useEffect(()=>{
	// 	setName(props.initialName)
	// 	if(props.point?.latitude){
	// 		setPointAddress({latitude: props.point.latitude, longitiude: props.point.longitude})
	// 	}
	// }, [])

	useEffect(() => {
		setName(props.point?.name)
		if (props.point?.address)
			setAddress(props.point.address)
		else if(props.point?.latitude && props.autoGetAddress)
			setPointAddress({latitude: props.point.latitude, longitude: props.point.longitude})
	}, [props.point])



	const setPointAddress = async (coordinates) => {
		const addr = (await getCoordsDetails(coordinates)).Address
		setAddress(addr)
	}

	function addReferencePoint(e) {

		const point = {
			latitude: lat,
			longitude: long,
			altitude: height,
			name,
			address
		}

		if (!lat) {
			setErrMsg("Please select a point.");
		}
		else {
			props.setReferencePoints([...props.referencePoints, point]);
			setLat("");
			setLong("");
			setHeight("");
			setName("");
			setAddress("");
			if (props.onConfirm){
				props.onConfirm(e, point)
			}
			props.setShowForm(false);
		}
	}

	const setStartEndPoint = (name, address) => {
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
				{
					props.hideTitle 
					? 
					false
					:
					<Row className={props.rowClassName ? props.rowClassName : "justify-content-center"}>
						<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
							<h2 className="text-left">{props.type}</h2>
						</Col>
					</Row>
				}
				{props.type === "New point" && props.points.length !== 0 ?
					<Row className={props.rowClassName ? props.rowClassName : "justify-content-center"}>
						<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
							<SelectorMap
								clearAddress={() => setAddress("")}
								onClick={(el) => {
									setLat(el.lat);
									setLong(el.lon);
									setPointAddress({ latitude: el.lat, longitude: el.lon });
									setHeight(el.ele)
								}}
								positions={props.points}
							/>
						</Col>
					</Row>
					: <></>
				}

				<Row  className={props.rowClassName ? props.rowClassName : "justify-content-center"}>
					<Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} style={{paddingRight:0}}>
						<Form.Group className={"mb-4"} controlId="validationCustom04">
							<Form.Label className={props.textSmall ? "formLabel" : "fs-4"}>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Insert name"
								value={name}
								style={props.boxStyle ? props.boxStyle : undefined}
								onChange={(e) => {
									setName(e.target.value)
									setStartEndPoint(e.target.value, address);
								}}
							/>
						</Form.Group>
					</Col>


					<Col style={{paddingRight:0}} xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
						{
							address
								?
								<Form.Group className={"mb-4"} controlId="validationCustom05">
									<Form.Label className={props.textSmall ? "formLabel" : "fs-4"}>Address</Form.Label>
									<Form.Control
										disabled
										type="text"
										placeholder="Insert address"
										value={address}
										style={props.boxStyle ? props.boxStyle : undefined}
									/>
								</Form.Group>
								:
								undefined
						}
					</Col>


				</Row>

				{props.type === "New point" && props.points ?
					<>
						<Row className={props.rowClassName ? props.rowClassName : "justify-content-center"}>
							<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
								{errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}
							</Col>
						</Row>
						<Row className={props.rowClassName ? props.rowClassName : "justify-content-center"}>
							<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
								<Button variant="outline-success" style={{ borderWidth: 3 }} onClick={addReferencePoint}>Confirm point</Button>
								<Button className="mx-4" variant="outline-danger" style={{ borderWidth: 3 }} onClick={() => props.setShowForm(false)}>Cancel point</Button>
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