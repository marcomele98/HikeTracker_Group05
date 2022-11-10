import React, {useState} from "react";
import {Form, Col, Button} from "react-bootstrap";
import AddPointForm from "./Components/AddPointForm";

const HikeForm = () => {

    const [GPX, setGPX] = useState("");
    const [name, setName] = useState("");
    const [lenght, setLenght] = useState("");
    const [expectedTime, setExpectedTime] = useState("");
    const [ascent, setAscent] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");

	const reader = new FileReader();

    return (
        <>
        <Col className={"m-3"}>
            <h1>Hike</h1>

            <Form>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom01">
					<Form.Label className = {"fs-4"}>GPX File</Form.Label>
					<Form.Control
						required
						type="file"
						placeholder="Insert GPX File"
						value={GPX}
						onChange={(e) => {
							setGPX(e.target.value); 
							let file = e.target.files;
							reader.readAsText(file[0]);
							reader.onloadend = () =>  {
								let content = reader.result;
								console.log(content);
							}
							
						}
					}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom02">
					<Form.Label className = {"fs-4"}>Name</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom03">
					<Form.Label className = {"fs-4"}>Lenght</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert lenght"
						value={lenght}
						onChange={(e) => setLenght(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom04">
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

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom05">
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

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom06">
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

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom07">
					<Form.Label className = {"fs-4"}>Description</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Insert description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">Please insert value</Form.Control.Feedback>
			    </Form.Group>

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom08">
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

                <Form.Group className ={"mb-3"} as={Col} md="4" controlId="validationCustom09">
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

            </Form>
            
        </Col>
        <AddPointForm type={"Start point"}></AddPointForm>
        <AddPointForm type ={"End point"}></AddPointForm>
        </>
    )
}

export default HikeForm;