import { Row, Container, Col, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import API from "../API";
import img from "../Assets/Images/parking.jpeg"

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

                {/* <Row style={{ height: 30 }}></Row> */}
                <Row className="m-3" style={{ margin: 0, padding: 0 }}>
                    {
                        user.role !== 'local guide'
                            ?
                            false
                            :
                            <>
                                <Row style={{ height: 30 }}></Row>
                                <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-success" style={{ borderWidth: 3, marginRight: 10, marginBottom: 10, width: 200 }} onClick={() => navigate("/new-parking")}>New Parking Lot</Button>

                            </>
                    }
                </Row>
                <ListGroup>
                    <Row>
                        {

                            parks
                                .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                .map((p) => (
                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <ListGroupItem style={{ height: 150, opacity: "85%" }} key={p.id} className="m-3 border-2 rounded-3 shadow">
                                            <Col>
                                                <Row>
                                                    <div className="title">{p.name}</div>
                                                </Row>
                                                <Row>
                                                    <div className="textGrayPrimary">{p.region}</div>
                                                </Row>
                                                <Row>
                                                    <div className="textGrayPrimary">{p.city + " (" + p.province + ")"}</div>
                                                </Row>

                                                <Row style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
                                                    <div className="touchableOpacityWithTextContainer">
                                                        <ClickableOpacity
                                                            onClick={() => {
                                                                navigate("/parkingLot/" + p.id)
                                                            }}>
                                                            <div className="seeMore">
                                                                see more
                                                            </div>
                                                        </ClickableOpacity>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </ListGroupItem>
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