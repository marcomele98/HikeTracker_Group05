import React from "react";
import { Row, Col } from "react-bootstrap";

const ConfirmedNewPoint = (props) => {

    return (
        <Row className="justify-content-center">

            <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
            <Row className="mb-1">
                    {
                        props.point.name ?
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>Name: {props.point.name}</Col>
                            : undefined
                    }
                    {
                        props.point.address ?
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>Address: {props.point.address}</Col>
                            : undefined
                    }
                </Row>
                <Row className="mb-1">
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>Latitude: {props.point.latitude}</Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>Longitude: {props.point.longitude}</Col>
                </Row>

                <Row className="mb-2">
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>Height: {props.point.altitude}</Col>
                </Row>


            </Col>


        </Row>
    )

}

export default ConfirmedNewPoint;
