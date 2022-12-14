import { Row, Container, Col, Form, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import API from "../API";
import img from "../Assets/Images/hut.jpg"
import { HutCard } from "./hut_card";

function ListHuts({ setIsLoading, user }) {

    const [huts, setHuts] = useState([]);
    const [search, setSearch] = useState("");
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
            el.type.toLowerCase().includes(search.toLowerCase()) ||
            (el.email && el.email.toLowerCase().includes(search.toLowerCase())) ||
            (el.phone && el.phone.toLowerCase().includes(search.toLowerCase()))
        )
    }


    return (

        <>
            <div className="backImage" style={{ backgroundImage: `url(${img})` }}></div>
            <Container>
            <br/>
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
                                .sort((a, b) => (a.type.trim() + a.name.trim()).localeCompare(b.type.trim() + b.name.trim()))
                                .map((h, i) => (
                                    <Col key={i} xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <HutCard h={h} user={user}></HutCard>
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