import { Row, Container, Col, Form, ListGroupItem, ListGroup, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import { PlusCircle } from "react-bootstrap-icons";
import API from "../API";

function ListHuts({ setIsLoading, user }) {

    const [huts, setHuts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === "" || (user.role !== 'local guide' && user.role !== 'hiker')) {
            navigate("/");
        }
        const getHutsFromServer = async () => {
            try {
                setIsLoading(true);
                const res = await API.getHuts();
                setHuts(res);
                setIsLoading(false);
            } catch (err) {
                toast.error("Server error.", { position: "top-center" }, { toastId: 4 });
                setIsLoading(false);
            }
        };
        getHutsFromServer()
    }, [user])


    return (

        <Container>

            {/*
                user.role !== 'local guide'
                    ?
                    <Row style={{ height: 30 }}></Row>
                    :
                    <div className="flex-shrink-0 m-5">
                        <ClickableOpacity onClick={() => navigate("/new-hut")}>
                            <PlusCircle
                                color="#495057"
                                size={40}
                            />
                        </ClickableOpacity>
                    </div>
            */}
            <ListGroup>
                {

                    huts
                        .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                        .map((h) => (
                            <ListGroupItem key={h.id} className="m-3 border-2 rounded-3 shadow">
                                <Col>
                                    <Row>
                                        <div className="title">{h.name + "(" + h.type + ")"}</div>
                                    </Row>
                                    <Row>
                                        <div className="textGrayPrimary">{h.region}</div>
                                    </Row>
                                    <Row>
                                        <div className="textGrayPrimary">{h.city + " (" + h.province + ")"}</div>
                                    </Row>

                                    <Row>
                                        <div className="touchableOpacityWithTextContainer">
                                            <ClickableOpacity
                                                onClick={() => {
                                                    navigate("/hut/" + h.id)
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


export { ListHuts };