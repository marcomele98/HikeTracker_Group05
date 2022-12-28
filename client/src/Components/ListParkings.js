import { Row, Container, Col, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import API from "../API";
import img from "../Assets/Images/parking.jpeg"
import { ParkCard } from "./park_card";

function ListParkings({ setIsLoading, user }) {

    const [parks, setParks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === "" || (user.role !== 'local guide' && user.role !== 'hiker')) {
            navigate("/");
        }
        const getParksFromServer = async () => {
            try {
                setIsLoading(true);
                const res = await API.getParks();
                setParks(res);
                setIsLoading(false);
            } catch (err) {
                toast.error("Server error.", { position: "top-center" }, { toastId: 4 });
                setIsLoading(false);
            }
        };
        getParksFromServer()
    }, [user])


    return (
        <>
            <div className="backImage" style={{ backgroundImage: `url(${img})` }}></div>
            <Container>
                <br />
                {
                    user.role !== 'local guide'
                        ?
                        false
                        :
                        <Row className="m-3" style={{ margin: 0, padding: 0 }}>
                            <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-success" className="styleButtonMargin" onClick={() => navigate("/new-parking")}>New Parking Lot</Button>
                        </Row>
                }

                <ListGroup>
                    <Row>
                        {

                            parks
                                .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                .map((p) => (
                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <ParkCard p={p} user={user}></ParkCard>
                                    </Col>
                                ))
                        }
                    </Row>
                </ListGroup>
            </Container>
        </>
    );
}


export { ListParkings };