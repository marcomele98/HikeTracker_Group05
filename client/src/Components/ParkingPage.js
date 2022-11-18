import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col } from "react-bootstrap";
import { ClickableOpacity } from "./clickableOpacity";
import { PointMap } from "./cliccableMap";
import API from "../API";


function ParkingPage({ setIsLoading, loggedIn, user }) {
    const [seeMap, setSeeMap] = useState(false);
    const [park, setPark] = useState();
    const navigate = useNavigate();

    const { parkId } = useParams();

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
        (park && loggedIn && user.role === "local guide") ?
            <Container>
                <Col>
                    <Row>
                        <div className="hikeTitleBig">{park.name}</div>
                    </Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{park.region}</div>
                    </Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{park.city + " (" + park.province + ")"}</div>
                    </Row>


                    {
                        (loggedIn && user.role === "local guide") ?
                            (
                                <Row>
                                    <div className="seePointsButtonContainer">
                                        <ClickableOpacity
                                            onClick={() => setSeeMap(val => !val)}>
                                            <div className="seePointsButton">{seeMap ? "Hide Map" : "See Map"}</div>
                                        </ClickableOpacity>
                                    </div>
                                </Row>
                            ) : false

                    }

                    {
                        (loggedIn && user.role === "local guide" && seeMap) ?
                            (<Row>
                                {
                                    <PointMap position={{ name: park.name, lat: park.latitude, lng: park.longitude }}></PointMap>
                                }
                            </Row>
                            ) : false
                    }

                </Col>
            </Container>
            : undefined
    );
}


export { ParkingPage };