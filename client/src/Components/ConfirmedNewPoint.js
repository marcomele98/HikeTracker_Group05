import React from "react";
import {Row, Col} from "react-bootstrap";

const ConfirmedNewPoint = (props) => {

    return(
        <>
        <Row md={4} className="mb-1">
            <Col>Latitude: {props.point.latitude}</Col>
            <Col>Longitude: {props.point.longitude}</Col>
        </Row>

        <Row md={4} className="mb-1">
            <Col>Height: {props.point.altitude}</Col>
        </Row>
        
        <Row md={4} className="mb-2">
            <Col>Name: {props.point.name}</Col>
            <Col>Address: {props.point.address}</Col>
        </Row>

        
        </>
    )

}

export default ConfirmedNewPoint;
