import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col } from "react-bootstrap";
import { PointMap } from "./cliccableMap";
import API from "../API";


function ParkingPage({ setIsLoading, loggedIn, user }) {
    const [park, setPark] = useState();
    const navigate = useNavigate();

    const { parkId } = useParams();

    useEffect(() => {
        if (user === "" || (user.role !== 'local guide' && user.role !== 'hiker')) {
            navigate("/");
        }
    }, [user])


    useEffect(() => {
        const getParkFromServer = async () => {
            try {
                setIsLoading(true);
                const res = await API.getParkById(parkId);
                setPark(res);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                if (err == 404)
                    navigate("/home")
                else
                    toast.error("Server error", { position: "top-center" }, { toastId: 4 });
            }
        };
        getParkFromServer()
    }, [parkId])
    return (
        (park) ?
            <Container>
                <Col>
                    <br/>
                    <Row className="paddingHorizontal">
                        <Col className='noMarginAndPadding' xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="titleBig">{park.name}</div>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="textGrayPrimaryBig">{park.region + " - " + park.city + " (" + park.province + ")"}</div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{"Parking places: " + park.capacity}</div>
                    </Row>

                    <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <PointMap position={{ name: park.name, lat: park.latitude, lng: park.longitude, altitude: park.altitude }}></PointMap>
                        </Col>
                    </Row>


                </Col>
            </Container>
            : undefined
    );
}


export { ParkingPage };