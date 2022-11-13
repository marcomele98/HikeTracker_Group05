import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import AddPointForm from "./AddPointForm";
import ConfirmedNewPoint from "./ConfirmedNewPoint";
import API from "../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
let gpxParser = require('gpxparser');
var gpx = new gpxParser();

const HikeForm = (props) => {

	const [GPX, setGPX] = useState("");
	const [fileGPX, setFileGPX] = useState(null);
	const [title, setTitle] = useState("");
	const [length, setLength] = useState();
	const [expectedTime, setExpectedTime] = useState();
	const [ascent, setAscent] = useState();
	const [difficulty, setDifficulty] = useState("Tourist");
	const [region, setRegion] = useState("");
	const [city, setCity] = useState("");
	const [startPoint, setStartPoint] = useState(null);
	const [endPoint, setEndPoint] = useState(null);
	const [referencePoints, setReferencePoints] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [validated, setValidated] = useState(false);

	const reader = new FileReader();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			if (isNotValidPoint(startPoint) || isNotValidPoint(endPoint)) {
				setErrMsg("Please insert correct coordinates");
			}
			else {
				sendForm();
			}
		}

		setValidated(true);
	};


	const isNotValidPoint = (point) => {
		let regexpLatitude = new RegExp('^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$');
		let regexpLongitude = new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$');

		console.log(point)
		return point.latitude === undefined || point.latitude === '' ||
			point.latitude === null || point.latitude < -90 || point.latitude > 90 ||
			!regexpLatitude.test(point.latitude) ||
			point.longitude === undefined || point.longitude === '' ||
			point.longitude === null || point.longitude < -180 || point.longitude > 180 ||
			!regexpLongitude.test(point.longitude) ||
			point.altitude === undefined || point.altitude === '' ||
			point.altitude === null || isNaN(point.altitude);
	}

	const parseGPX = () => {
		gpx.parse(fileGPX)
		return gpx.tracks[0].points
	}


	useEffect(() => {
		if (props.user !== "" && props.user.role !== 'local guide') {
			navigate("/");
		}

	}, [props.user]);

	const loadGPXContent = (file) => {
			reader.readAsText(file[0]);
			reader.onloadend = () => {
				setFileGPX(reader.result);
			}
	}


	const deletePoint = (point) => {
		setReferencePoints(referencePoints.filter((p) => p !== point));
	}

	const sendForm = async () => {

		//let content = await loadGPXContent();

		const hike = {
			title,
			length_kms: length,
			expected_mins: expectedTime,
			ascendent_meters: ascent,
			difficulty,
			region,
			city,
			gpx: fileGPX,
			start_point: startPoint,
			end_point: endPoint,
			reference_points: referencePoints
		}

		try {
			props.setIsLoading(true);
			await API.newHikeDescription(hike);
			toast.success("Hike added correctly.", { position: "top-center" }, { toastId: 3 });
			props.setIsLoading(false);
			navigate("/");
		} catch (err) {
			toast.error(err, { position: "top-center" }, { toastId: 4 });
			props.setIsLoading(false);
		}
	};

	return (
		<>
			<Col className={"m-3"}>
				<h1>Hike</h1>

				<Form noValidate validated={validated} onSubmit={handleSubmit}>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom01">
						<Form.Label className={"fs-4"}>Title</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Insert title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">Please insert title</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom02">
						<Form.Label className={"fs-4"}>Length</Form.Label>
						<Form.Control
							required
							type="number"
							placeholder="Insert length"
							value={length}
							onChange={(e) => setLength(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">Please insert correct length</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom03">
						<Form.Label className={"fs-4"}>Expected Time</Form.Label>
						<Form.Control
							required
							type="number"
							placeholder="Insert expected time"
							value={expectedTime}
							onChange={(e) => setExpectedTime(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">Please insert correct expected time</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom04">
						<Form.Label className={"fs-4"}>Ascent</Form.Label>
						<Form.Control
							required
							type="number"
							placeholder="Insert ascent"
							value={ascent}
							onChange={(e) => setAscent(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">Please insert correct ascent</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom05">
						<Form.Label className={"fs-4"}>Difficulty</Form.Label>
						<Form.Select
							value={difficulty}
							onChange={(e) => setDifficulty(e.target.value)}>
							<option value="Tourist">Tourist</option>
							<option value="Hiker">Hiker</option>
							<option value="Professional Hiker">Professional Hiker</option>
						</Form.Select>
						<Form.Control.Feedback type="invalid">Please insert correct difficulty</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom06">
						<Form.Label className={"fs-4"}>Province</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Insert province"
							value={region}
							maxLength={2}
							onChange={(e) => setRegion(e.target.value.toUpperCase().replace(/[^a-z]/gi, ''))}
						/>
						<Form.Control.Feedback type="invalid">Please insert correct region</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom07">
						<Form.Label className={"fs-4"}>City</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Insert city"
							value={city}
							onChange={(e) => setCity(e.target.value.replace(/[^a-z]/gi, ''))}
						/>
						<Form.Control.Feedback type="invalid">Please insert correct city</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className={"mb-3"} as={Col} md="4" controlId="validationCustom08">
						<Form.Label className={"fs-4"}>GPX File</Form.Label>
						<Form.Control
							required
							type="file"
							placeholder="Insert GPX File"
							value={GPX}
							onChange={(e) => {
								setGPX(e.target.value);
								//parseGPX(e.target.value);
								loadGPXContent(e.target.files);
							}
							}
						/>
						<Form.Control.Feedback type="invalid">Please insert a gpx file</Form.Control.Feedback>
					</Form.Group>

					{
						!fileGPX
							?
							undefined
							:
							<>
								<Row>
									<AddPointForm points={parseGPX()} setStartPoint={setStartPoint} type={"Start point"}></AddPointForm>
								</Row>

								<Row>
									<AddPointForm points={parseGPX()} setEndPoint={setEndPoint} type={"End point"}></AddPointForm>
								</Row>

								{referencePoints.length > 0 ?
									<Row className="mt-3"><h2>List of added points:</h2></Row>
									:
									null
								}

								{
									referencePoints.map((point, index) => {
										return (
											<>
												<Row className="mb-1" md={4}>
													<Col className="fs-4">Point n°{index + 1}<Button className="mx-4" variant="danger" size="sm" onClick={() => deletePoint(point)}>Delete</Button></Col>
												</Row>
												<ConfirmedNewPoint point={point}></ConfirmedNewPoint>
											</>
										)
									})
								}

								<Row>
									<Col>
										{showForm ?
											<Col>
												<AddPointForm points={parseGPX()} setShowForm={setShowForm} setReferencePoints={setReferencePoints} referencePoints={referencePoints} type={"New point"}></AddPointForm>
											</Col>
											:
											<Col>
												<Button variant="outline-primary" onClick={() => setShowForm(true)}>Add new point</Button>
											</Col>
										}
									</Col>
								</Row>
							</>
					}
					<Col className="mt-4">
						<Row className="mt-2" md={3}>{errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}</Row>
						<Row md={3}>
							<Button type="submit" variant="outline-success" onSubmit={handleSubmit}>Create new hike</Button>
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

export default HikeForm;