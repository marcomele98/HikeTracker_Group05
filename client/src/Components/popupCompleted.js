import React from 'react';
import { Modal, Row, ListGroupItem, ListGroup } from 'react-bootstrap';
import moment from 'moment';


const CompletedModal = (props) => {

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
                            .map((el, i) =>
                                <ListGroupItem key={i}>
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