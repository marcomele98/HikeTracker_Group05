import { Row, Container, Col, Form, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import API from "../API";
import img from "../Assets/Images/hut.jpg"

function ListHuts({ setIsLoading, user }) {

    const [huts, setHuts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchMargin, setSearchMargin] = useState(0);
    const navigate = useNavigate();
    let search_dim = user.role === 'local guide' ? 10 : 12;

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

    const searchFilter = (el) => {
        return (
            el.name.toLowerCase().includes(search.toLowerCase()) ||
            el.province.toLowerCase().includes(search.toLowerCase()) ||
            el.city.toLowerCase().includes(search.toLowerCase()) ||
            el.region.toLowerCase().includes(search.toLowerCase()) ||
            (el.email && el.email.toLowerCase().includes(search.toLowerCase())) ||
            (el.phone && el.phone.toLowerCase().includes(search.toLowerCase()))
        )
    }


    return (

        <>
            <div className="backImage" style={{ backgroundImage: `url(${img})` }}></div>
            <Container>
                <Row style={{ height: 30 }}></Row>
                <Row className="m-3" style={{ margin: 0, padding: 0 }}>
                    {
                        user.role !== 'local guide'
                            ?
                            false
                            :
                            <>
                                <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-success" style={{ borderWidth: 3, marginBottom: 10 }} onClick={() => navigate("/new-hut")}>New Hut</Button>
                            </>
                    }
                    <Col style={{ margin: 0 }} className="p-0" xs={12} sm={12} md={search_dim} lg={search_dim} xl={search_dim} xxl={search_dim}>
                        <Row>
                            {
                                user.role === 'local guide'
                                    ?
                                    <Col xs={0} sm={0} md={1} lg={1} xl={1} xxl={1}></Col>
                                    : false
                            }
                            <Col>
                                <Form.Control
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ borderWidth: 3 }}
                                    value={search}
                                    type="text"
                                    placeholder="Search"
                                    className="md"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ListGroup>
                    <Row>
                        {

                            huts
                                .filter(searchFilter)
                                .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                .map((h) => (
                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <ListGroupItem style={{ height: 170, opacity: "85%" }} key={h.id} className="m-3 border-2 rounded-3 shadow">

                                            <Row>
                                                <div className="title">{h.name + " (" + h.type + ")"}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{h.region}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{h.city + " (" + h.province + ")"}</div>
                                            </Row>
                                            {
                                                !h.phone
                                                    ?
                                                    false
                                                    :
                                                    <Row>
                                                        <div className="textGrayPrimary">{"Phone number: " + h.phone}</div>
                                                    </Row>
                                            }
                                            {
                                                !h.email
                                                    ?
                                                    false
                                                    :
                                                    <Row>
                                                        <div className="textGrayPrimary">{"Email: " + h.email}</div>
                                                    </Row>
                                            }

                                            <Row style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
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


export { ListHuts };