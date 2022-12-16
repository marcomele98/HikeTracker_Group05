import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col } from "react-bootstrap";
import { PointMap } from "./cliccableMap";
import { ImageComponent } from './imageFromBase64';
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

                    {
                        hut.image ?
                            <>
                                <br/>
                                <ImageComponent base64String={hut.image}></ImageComponent>
                            </>
                            : false
                    }

                    <br/>
                    <Row className="paddingHorizontal">
                        <Col className='noMarginAndPadding' xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="titleBig">{hut.type + " " + hut.name}</div>
                        </Col>
                    </Row>
                    {
                        !hut.description
                            ?
                            false
                            :
                            <>
                                <br/>
                                <Row>
                                    <div className="textGrayPrimaryItalic">{hut.description}</div>
                                </Row>
                                <br/>
                            </>
                    }
                    <Row >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="textGrayPrimaryBig">{hut.region + " - " + hut.city + " (" + hut.province + ")"}</div>
                        </Col>
                    </Row>
                    <br/>
                    <Row >

                        {
                            !hut.phone
                                ?
                                false
                                :
                                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                                    <div className="textGrayPrimaryBig">{"Phone number: " + hut.phone}</div>
                                </Col>
                        }

                        {
                            !hut.email
                                ?
                                false
                                :
                                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                                    <div className="textGrayPrimaryBig">{"Email: " + hut.email}</div>
                                </Col>
                        }
                        {
                            !hut.number_of_beds
                                ?
                                false
                                :
                                <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                                    <div className="textGrayPrimaryBig">{"Beds: " + hut.number_of_beds}</div>
                                </Col>
                        }

                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <PointMap position={{ name: hut.name, lat: hut.latitude, lng: hut.longitude, altitude: hut.altitude }}></PointMap>
                        </Col>
                    </Row>


                </Col>
            </Container>
            : undefined
    );
}


export { HutPage };