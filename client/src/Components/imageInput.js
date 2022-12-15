import React, { useRef, useState } from 'react';
import { Form, Row, Col} from "react-bootstrap";
import { getCoordsDetails, loadImageContent } from "../utilities"


function ImageInput({ setImagePath, imagePath, setImage }) {
  return (

    <Row className="justify-content-center">
      <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
        <Form.Group className={"mb-4"} controlId="validationCustom25">
          <Form.Label className={"fs-4"}>Image</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="Insert Image"
            value={imagePath}
            onChange={(e) => {
              setImagePath(e.target.value)
              loadImageContent(e.target.files[0], setImage)
            }
            }
          />
          {/* <ImageCutter width={1100} height={300}></ImageCutter> */}
          <Form.Control.Feedback type="invalid">Please insert an image</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

  );
}

export {ImageInput}

