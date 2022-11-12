import React, {useEffect, useState} from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import AddPointForm from "./Components/AddPointForm";
import API from "./API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HikeForm = (props) => {

    const [GPX, setGPX] = useState("");
	const [fileGPX, setFileGPX] = useState(null);
    const [title, setTitle] = useState("");
    const [length, setLength] = useState();
    const [expectedTime, setExpectedTime] = useState();
    const [ascent, setAscent] = useState();
    const [difficulty, setDifficulty] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
	const [startPoint, setStartPoint] = useState(null);
	const [endPoint, setEndPoint] = useState(null);
	const [referencePoints, setReferencePoints] = useState([]);
	const [showForm,setShowForm] = useState(false);
	
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
			sendForm();
		}

		setValidated(true);
	};
	

	useEffect( () => {
		if (props.user !== "" && props.user.role !== 'local guide'){
			navigate("/");
		}

	}, [props.user]);

	const loadContent = () => {
		return new Promise(resolve => {
			reader.readAsText(fileGPX[0]);
			reader.onloadend = () => {
				resolve(reader.result);
			}
		});
	}

	const sendForm = async () => {

		//TODO: validityCheck

		let content = await loadContent();

		const hike = {
			title,
			length_kms: length,
			expected_mins: expectedTime,
			ascendent_meters: ascent,
			difficulty,
			region,
			city,
			gpx: content,
			start_point: startPoint,
			end_point: endPoint,
			reference_points: referencePoints
		}

		//console.log(hike);

        try {
            await API.newHikeDescription(hike);
            toast.success("Hike added correctly.", { position: "top-center" }, { toastId: 3 });
        } catch {
            toast.error("Error during adding hike. Try Again.", { position: "top-center" }, { toastId: 4 });
        }

		navigate("/");
    };

    return (
        <>
        <Col className={"m-3"}>
            <h1>Hike</h1>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom01">
					<Form.Label className = {"fs-4"}>Title</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert title</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom02">
					<Form.Label className = {"fs-4"}>Length</Form.Label>
					<Form.Control
						required
						type="number"
						placeholder="Insert length"
						value={length}
						onChange={(e) => setLength(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert correct length</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom03">
					<Form.Label className = {"fs-4"}>Expected Time</Form.Label>
					<Form.Control
						required
						type="number"
						placeholder="Insert expected time"
						value={expectedTime}
						onChange={(e) => setExpectedTime(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert correct expected time</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom04">
					<Form.Label className = {"fs-4"}>Ascent</Form.Label>
					<Form.Control
						required
						type="number"
						placeholder="Insert ascent"
						value={ascent}
						onChange={(e) => setAscent(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert correct ascent</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom05">
					<Form.Label className = {"fs-4"}>Difficulty</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert difficulty"
						value={difficulty}
						onChange={(e) => setDifficulty(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert correct difficulty</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom06">
					<Form.Label className = {"fs-4"}>Region</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert region"
						value={region}
						onChange={(e) => setRegion(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert correct region</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom07">
					<Form.Label className = {"fs-4"}>City</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert correct city</Form.Control.Feedback>
			    </Form.Group>

				<Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom08">
					<Form.Label className = {"fs-4"}>GPX File</Form.Label>
					<Form.Control
						required
						type="file"
						placeholder="Insert GPX File"
						value={GPX}
						onChange={(e) => {
							setGPX(e.target.value); 
							setFileGPX(e.target.files);
						}
					}
					/>
					<Form.Control.Feedback type="invalid">Please insert a gpx file</Form.Control.Feedback>
			    </Form.Group>

				<Row>
					<AddPointForm setStartPoint = {setStartPoint} type = {"Start point"}></AddPointForm>
				</Row>

				<Row>
					<AddPointForm setEndPoint = {setEndPoint} type = {"End point"}></AddPointForm>
				</Row>

				<Row>
					<Col>
						{showForm?
						<Col>
							<AddPointForm setShowForm={setShowForm} setReferencePoints={setReferencePoints} referencePoints={referencePoints} type={"New point"}></AddPointForm>
						</Col>
						:
						<Col>
							<Button variant = "outline-primary" onClick={() => setShowForm(true)}>Add new point</Button>
						</Col>
					}
					</Col>
				</Row>

				<Row className="fs-5 mt-2">Points added: {referencePoints.length}</Row>

				<Col className="mt-3">
					<Row md={3}>
						<Button type="submit" variant = "outline-success" onSubmit={handleSubmit}>Create new hike</Button>
					</Row>

					<Row md={3} className="my-3">
						<Button variant = "outline-danger" onClick={()=> navigate("/")}>Cancel</Button>
					</Row>
				</Col>

            </Form>
            
    	</Col>
        
        </>
    )
}

export default HikeForm;