import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col } from "react-bootstrap";
import { PointMap } from "./cliccableMap";
import API from "../API";


function HutPage({ setIsLoading, user }) {
    const [hut, setHut] = useState();
    const navigate = useNavigate();

    const { hutId } = useParams();

    useEffect(() => {
        if (user === "" || (user.role !== 'local guide' && user.role !== 'hiker')) {
            navigate("/");
        }
    }, [user])

    
    useEffect(() => {
        const getHutFromServer = async () => {
            try {
                setIsLoading(true);
                const res = await API.getHutById(hutId);
                console.log(res)
                setHut(res);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                if (err == 404)
                    navigate("/home")
                else
                    toast.error("Server error", { position: "top-center" }, { toastId: 10 });
            }
        };
        getHutFromServer()
    }, [hutId])
    return (
        (hut) ?
            <Container>
                <Col>
                    <Row style={{ height: 20 }}></Row>
                    <Row>
                        <div className="titleBig">{hut.name + " (" + hut.type + ")"}</div>
                    </Row>
                    {
                        !hut.description
                            ?
                            false
                            :
                            <>
                                <Row style={{ height: 20 }}></Row>
                                <Row>
                                    <div className="textGrayPrimaryItalic">{hut.description}</div>
                                </Row>
                                <Row style={{ height: 20 }}></Row>
                            </>
                    }
                    <Row>
                        <div className="textGrayPrimaryBig">{hut.region}</div>
                    </Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{hut.city + " (" + hut.province + ")"}</div>
                    </Row>

                    {
                        !hut.number_of_beds
                            ?
                            false
                            :
                                <Row>
                                    <div className="textGrayPrimaryBig">{"Beds: " + hut.number_of_beds}</div>
                                </Row>
                    }
                    <Row>
                        <Col xs={12} sm={10} md={8} lg={8} xl={8} xxl={8}>
                            <PointMap position={{ name: hut.name, lat: hut.latitude, lng: hut.longitude, altitude: hut.altitude }}></PointMap>
                        </Col>
                    </Row>


                </Col>
            </Container>
            : undefined
    );
}


export { HutPage };