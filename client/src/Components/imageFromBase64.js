import React from 'react';
import { Image, Row } from 'react-bootstrap';

function ImageComponent({ base64String }) {
    return (
        <Row>
            <Image id={"hikeImage"} src={base64String} />
        </Row>

    );
}

export { ImageComponent }