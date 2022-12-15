import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import AddPointForm from "./AddPointForm";
import ConfirmedNewPoint from "./ConfirmedNewPoint";
import API from "../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Map } from "./Map"
import { getCoordsDetails } from "../utilities"
import { ImageInput } from "./imageInput"
let gpxParser = require('gpxparser');

const HikeForm = (props) => {

	let gpx = new gpxParser();
	const [GPX, setGPX] = useState("");
	const [fileGPX, setFileGPX] = useState(null);
	const [title, setTitle] = useState("");
	const [length, setLength] = useState();
	const [expectedTime, setExpectedTime] = useState();
	const [ascent, setAscent] = useState();
	const [difficulty, setDifficulty] = useState("Tourist");
	const [description, setDescription] = useState("");
	const [region, setRegion] = useState("");
	const [province, setProvince] = useState("");
	const [city, setCity] = useState("");
	const [startPoint, setStartPoint] = useState(null);
	const [endPoint, setEndPoint] = useState(null);
	const [referencePoints, setReferencePoints] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [validated, setValidated] = useState(false);
	const [allPoints, setAllPoints] = useState([]);
	const [gpxPoints, setGpxPoints] = useState([])
	const [image, setImage] = useState();
	const [imagePath, setImagePath] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (fileGPX) {
			setReferencePoints([])
			setStartPoint();
			setEndPoint();
			setAllPoints([]);
			getValuesFromGPX(fileGPX);
		}
	}, [fileGPX])


	useEffect(() => {
		const points = [...referencePoints];
		if (startPoint)
			points.push(startPoint)
		if (endPoint)
			points.push(endPoint)
		setAllPoints(points);
	}, [referencePoints.length, startPoint, endPoint])

	const getValuesFromGPX = async (fileGPX) => {
		gpx.parse(fileGPX);
		const l = parseFloat(gpx.tracks[0].distance.total / 1000).toFixed(2);
		const a = parseFloat(gpx.tracks[0].elevation.max - gpx.tracks[0].elevation.min).toFixed(2);
		setGpxPoints(gpx.tracks[0].points)
		setLength(l);
		setAscent(a);
		let point = gpx.tracks[0].points[0];
		const start = {
			latitude: point.lat,
			longitude: point.lon,
			altitude: point.ele,
			name: ""
		}

		point = gpx.tracks[0].points[gpx.tracks[0].points.length - 1];
		const end = {
			latitude: point.lat,
			longitude: point.lon,
			altitude: point.ele,
			name: "",
			address: ""
		}
		const startPointDetails = await getCoordsDetails(start);
		if (startPointDetails.CountryCode !== "ITA") {
			toast.error("At the moment are no accepted hike outside ita.", { position: "top-center" }, { toastId: 10 });
			setGPX("")
			setFileGPX(null)
		} else {
			setCity(startPointDetails.City)
			setRegion(startPointDetails.Region)
			setProvince(startPointDetails.SubregionCode)
			start.address = startPointDetails.Address
			end.address = (await getCoordsDetails(start)).Address
			setStartPoint(start);
			setEndPoint(end);
		}
	}


	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			sendForm();
		}
		setValidated(true);
	};


	useEffect(() => {
		if (!props.user !== "" && props.user.role !== 'local guide') {
			navigate("/");
		}

	}, [props.user]);



	const loadGPXContent = (file) => {
		const reader = new FileReader();
		reader.readAsText(file[0]);
		reader.onloadend = () => {
			setFileGPX(reader.result);
		}
	}



	const deletePoint = (point) => {
		setReferencePoints(referencePoints.filter((p) => p !== point));
	}

	const sendForm = async () => {

		const hike = {
			title,
			length_kms: length,
			expected_mins: expectedTime,
			ascendent_meters: ascent,
			difficulty,
			description,
			region,
			province,
			city,
			gpx: fileGPX,
			image,
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
		<div className="p-3 mt-3">
			<Row className="justify-content-center">
				<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
					<h1 >New Hike</h1>
				</Col>
			</Row>


			<Form noValidate validated={validated} onSubmit={handleSubmit}>

				<Row className={"mb-4"}></Row>

				<Row className="justify-content-center">
					<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
						<Form.Group className={"mb-4"} controlId="validationCustom01">
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
					</Col>
				</Row>


				<Row className="justify-content-center">
					<Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
						<Form.Group className={"mb-4"} controlId="validationCustom03">
							<Form.Label className={"fs-4"}>{"Expected Time (mins)"}</Form.Label>
							<Form.Control
								required
								type="number"
								placeholder="Insert expected time"
								value={expectedTime}
								onChange={(e) => setExpectedTime(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">Please insert correct expected time</Form.Control.Feedback>
						</Form.Group>
					</Col>


					<Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
						<Form.Group className={"mb-4"} controlId="validationCustom05">
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


				<Row className="justify-content-center">
					<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
						<Form.Group className={"mb-4"} controlId="validationCustom08">
							<Form.Label className={"fs-4"}>GPX File</Form.Label>
							<Form.Control
								required
								type="file"
								placeholder="Insert GPX File"
								value={GPX}
								onChange={(e) => {
									setGPX(e.target.value);
									loadGPXContent(e.target.files);

								}
								}
							/>
							<Form.Control.Feedback type="invalid">Please insert a gpx file</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				{
					!fileGPX
						?
						undefined
						:
						<>

							<Row className="justify-content-center">
								<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
									<Map hike={{ gpx: fileGPX, points: allPoints, huts: [], parking_lots: [] }}></Map>
								</Col>
							</Row>

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
									</Form.Group>
								</Col>
							</Row>



							<Row className="justify-content-center">
								<Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
									<Form.Group className={"mb-4"} controlId="validationCustom02">
										<Form.Label className={"fs-4"}>{"Length (km)"}</Form.Label>
										<Form.Control
											required
											disabled
											type="text"
											placeholder="Load GPX to get length"
											value={length}
										//onChange={(e) => setLength(e.target.value)}
										/>
										{/*<Form.Control.Feedback type="invalid">Please insert correct GPX to get length</Form.Control.Feedback>*/}
									</Form.Group>
								</Col>


								<Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
									<Form.Group className={"mb-4"} controlId="validationCustom04">
										<Form.Label className={"fs-4"}>{"Ascent (m)"}</Form.Label>
										<Form.Control
											required
											disabled
											type="text"
											placeholder="Load GPX file to get ascent"
											value={ascent}
										//onChange={(e) => setAscent(e.target.value)}
										/>
										{/*<Form.Control.Feedback type="invalid">Please insert correct GPX to get ascent</Form.Control.Feedback>*/}
									</Form.Group>
								</Col>
							</Row>


							{
								(startPoint?.latitude === endPoint?.latitude && startPoint?.longitude === endPoint?.longitude)
									?
									<AddPointForm point={startPoint} setPoint={(el) => { setStartPoint(el); setEndPoint(el) }} type={"Start and End point"} />
									:
									<>

										<AddPointForm point={startPoint} setPoint={setStartPoint} type={"Start point"} />
										<AddPointForm point={endPoint} setPoint={setEndPoint} type={"End point"} />
									</>
							}
							{referencePoints.length > 0 ?
								<Row className="justify-content-center">
									<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
										<Row className="mt-3"><h2>List of added points:</h2></Row>
									</Col>
								</Row>
								:
								null
							}

							{
								referencePoints.map((point, index) => {
									return (
										<>
											<Row className="justify-content-center">

												<Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11} className="fs-4">Point n°{index + 1}<Button className="mx-4" variant="outline-danger" style={{ borderWidth: 3 }} size="sm" onClick={() => deletePoint(point)}>Delete</Button></Col>
											</Row>
											<ConfirmedNewPoint point={point}></ConfirmedNewPoint>
										</>
									)
								})
							}

							<Row>
								<Col>
									{showForm ?
										<AddPointForm points={gpxPoints} setShowForm={setShowForm} setReferencePoints={setReferencePoints} referencePoints={referencePoints} type={"New point"}></AddPointForm>
										:
										<Row className="justify-content-center">
											<Col className="mb-1 mt-2" xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
												<Button variant="outline-success" style={{ width: 200, borderWidth: 3 }} onClick={() => setShowForm(true)}>Add new point</Button>
											</Col>
										</Row>
									}
								</Col>
							</Row>
						</>
				}
				<Row className="justify-content-center mt-2" xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>{errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}</Row>
				<Row className="justify-content-center mt-5">
					<div className='rowCentered'>
						<Button type="submit" variant="outline-success" style={{ width: 200, borderWidth: 3 }}>Create new hike</Button>
						<Button variant="outline-danger" style={{ width: 200, borderWidth: 3, marginLeft: 20 }} onClick={() => navigate("/")}>Cancel</Button>
					</div>
				</Row>

			</Form>
			<Row className="mb-4" ></Row>
		</div >
	)
}

export default HikeForm;