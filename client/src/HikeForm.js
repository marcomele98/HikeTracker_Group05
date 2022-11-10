import React, {useState} from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import AddPointForm from "./Components/AddPointForm";
import API from "./API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HikeForm = () => {

    const [GPX, setGPX] = useState("");
	const [fileGPX, setFileGPX] = useState(null);
    const [title, setTitle] = useState("Posto di prova");
    const [length, setLength] = useState("14");
    const [expectedTime, setExpectedTime] = useState("14");
    const [ascent, setAscent] = useState("13");
    const [difficulty, setDifficulty] = useState("Medium");
    const [region, setRegion] = useState("Piemonte");
    const [city, setCity] = useState("Bardonecchia");
	const [startPoint, setStartPoint] = useState(null);
	const [endPoint, setEndPoint] = useState(null);
	const [referencePoints, setReferencePoints] = useState([]);

	const reader = new FileReader();
	const navigate = useNavigate();

	function loadContent() {
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
        
        //navigate("/");
    };

    return (
        <>
        <Col className={"m-3"}>
            <h1>Hike</h1>

            <Form>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom01">
					<Form.Label className = {"fs-4"}>Title</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom02">
					<Form.Label className = {"fs-4"}>Length</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert length"
						value={length}
						onChange={(e) => setLength(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom03">
					<Form.Label className = {"fs-4"}>Expected Time</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert expected time"
						value={expectedTime}
						onChange={(e) => setExpectedTime(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom04">
					<Form.Label className = {"fs-4"}>Ascent</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert ascent"
						value={ascent}
						onChange={(e) => setAscent(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
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
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
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
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
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
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
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
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

            </Form>
            
        </Col>
        <AddPointForm setStartPoint = {setStartPoint} type = {"Start point"}></AddPointForm>
        <AddPointForm setEndPoint = {setEndPoint} type = {"End point"}></AddPointForm>
		
		<Row className={"m-2"}>
			<Col>
				<Button variant = "outline-success" onClick={sendForm}>New Hike</Button>
				<Button className = "mx-4" variant = "outline-danger">Cancel</Button>
			</Col>
		</Row>
        </>
    )
}

export default HikeForm;