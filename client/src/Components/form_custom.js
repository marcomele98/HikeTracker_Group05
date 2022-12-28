import { Form, Col } from "react-bootstrap";
import "../App.css"

const DescriptionForm = ({ description, setDescription }) => {
    return (
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
    )
}

export { DescriptionForm };