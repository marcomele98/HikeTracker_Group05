import React, { useState } from 'react';
import { Modal, Form, Button, InputGroup, Row } from 'react-bootstrap';
import moment from 'moment';
import dayjs from 'dayjs'


const EditDateModal = (props) => {
    const [date, setDate] = useState(); // Initial value of date is current date
    const [time, setTime] = useState(); // Initial value of time is empty string


    React.useEffect(()=>{
        if(props.show===true){
            setDate(moment().format('YYYY-MM-DD'))
            setTime(dayjs().format('HH:mm'))
        }
    }, [props.show])

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onHandle(date + " " + time + ":00");   
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Date and Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type='date'
                            value={date}
                            min={props.start_time ? props.start_time.split(" ")[0] : undefined}
                            onChange={handleDateChange}>
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <InputGroup>
                            <Form.Control 
                            type="time" 
                            value={time} 
                            min={(props.start_time && props.start_time.split(" ")[0] === date)?props.start_time.split(" ")[1]:undefined}
                            onChange={handleTimeChange}/>
                        </InputGroup>
                    </Form.Group>
                    <br/>
                    <Button className="styleButtonWidth100" variant="outline-success" type="submit">
                        Confirm
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditDateModal;