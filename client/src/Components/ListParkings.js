import { Row, Container, Col, Form, ListGroupItem, ListGroup, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import { PlusCircle } from "react-bootstrap-icons";
import API from "../API";

function ListParkings({ setIsLoading, loggedIn, user }) {

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

        <Container>


            <div className="flex-shrink-0 m-5">
                <ClickableOpacity onClick={() => navigate("/new-parking")}>
                    <PlusCircle
                        color="#495057"
                        size={40}
                    />
                </ClickableOpacity>
            </div>

            <ListGroup>
                {

                    parks
                        .map((p) => (
                            <ListGroupItem key={p.id} className="m-3 border-2 rounded-3 shadow">
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

                                    <Row>
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
                        ))
                }
            </ListGroup>
        </Container>
    );
}


export { ListParkings };