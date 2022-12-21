import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import moment from 'moment';


const CompletedModal = (props) => {

    useEffect(() => console.log(props), [props])

    return (
        <Modal  {...props}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Completed
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{paddingBottom:0, paddingTop:0}}>
                <ListGroup variant='flush'>
                    {
                        props.list
                            ?.filter((l) => l.end_time != undefined)
                            .map((el) =>
                                <ListGroupItem>
                                    <Row className='justify-content-center'>{"Started at " + el.start_time}</Row>
                                    <Row className='justify-content-center'>{"Completed at " + el.end_time}</Row>
                                    <Row className='justify-content-center'>{"Completed in " + moment(el.end_time).diff(moment(el.start_time), 'minutes') + " mins"}</Row>
                                </ListGroupItem>
                            )
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default CompletedModal;