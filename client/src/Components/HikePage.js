import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col, ListGroupItem, ListGroup } from "react-bootstrap";
import { ClickableOpacity } from "./clickableOpacity";
import API from "../API";

function HikePage({ setIsLoading }) {
    const [seeStartPointDetails, setSeeStartPointDetails] = useState(false);
    const [seeEndPointDetails, setSeeEndPointDetails] = useState(false);
    const [seeAllHutsDetails, setSeeAllHutsDetails] = useState(false);
    const [seeAllParksDetails, setSeeAllParksDetails] = useState(false);
    const [seeAllPointsDetails, setSeeAllPointsDetails] = useState(false);
    const [hike, setHike] = useState();
    const navigate = useNavigate();

    const { hikeId } = useParams();
    useEffect(() => {
        const getHikesFromServer = async () => {
            try {
                setIsLoading(true);
                const res = await API.getHikeById(hikeId);
                setHike(res);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                if(err == 404)
                    navigate("/home")
                else
                    toast.error("Server error", { position: "top-center" }, { toastId: 4 });
            }
        };
        getHikesFromServer()
    }, [hikeId])
    return (
        !hike ? 
        undefined
        :
        <Container>
            <Col>
                <Row>
                    <div className="hikeTitleBig">{hike.title}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimaryBig">{hike.city + " (" + hike.region + ")"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimaryBig">{"Ascendent: " + hike.ascendent_meters + " m"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimaryBig">{"Length: " + hike.length_kms + " km"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimaryBig">{"Expected time: " + hike.expected_mins + " min"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimaryBig">{"Difficulty: " + hike.difficulty}</div>
                </Row>
                <Row>
                    <div className="seePointsButtonContainer">
                        <ClickableOpacity
                            onClick={() => setSeeStartPointDetails(val => !val)}>
                            <div className="seePointsButton">{seeStartPointDetails ? "Hide start point details" : "See start point details"}</div>
                        </ClickableOpacity>
                    </div>
                </Row>
                {
                    seeStartPointDetails
                        ?
                        (
                            <Row>
                                <ListGroup>
                                    <RefPointSwitcher type={hike.start_point_type} point={hike.start_point} />
                                </ListGroup>
                            </Row>
                        )
                        :
                        undefined
                }
                <Row>
                    <div className="seePointsButtonContainer">
                        <ClickableOpacity
                            onClick={() => setSeeEndPointDetails(val => !val)}>
                            <div className="seePointsButton">{seeEndPointDetails ? "Hide end point details" : "See end point details"}</div>
                        </ClickableOpacity>
                    </div>
                </Row>
                {
                    seeEndPointDetails
                        ?
                        (
                            <Row>
                                <ListGroup>
                                    <RefPointSwitcher type={hike.end_point_type} point={hike.end_point} />
                                </ListGroup>
                            </Row>
                        )
                        :
                        undefined
                }
                {
                    hike.huts.length === 0
                        ?
                        undefined
                        :
                        (
                            <Row>
                                <div className="seePointsButtonContainer">
                                    <ClickableOpacity
                                        onClick={() => setSeeAllHutsDetails(val => !val)}>
                                        <div className="seePointsButton">{seeAllHutsDetails ? "Hide details for all huts" : "See details for all huts"}</div>
                                    </ClickableOpacity>
                                </div>
                            </Row>
                        )
                }
                {
                    seeAllHutsDetails
                        ?
                        (
                            <ListGroup>
                                {
                                    hike.huts.map((h) => 
                                        <Hut key={h.id} hut={h}></Hut>
                                    )
                                }
                            </ListGroup>
                        )
                        :
                        undefined
                }
                {
                    hike.parking_lots.length === 0
                        ?
                        undefined
                        :
                        (
                            <Row>
                                <div className="seePointsButtonContainer">
                                    <ClickableOpacity
                                        onClick={() => setSeeAllParksDetails(val => !val)}>
                                        <div className="seePointsButton">{seeAllParksDetails ? "Hide details for all parking lots" : "See details for all parking lots"}</div>
                                    </ClickableOpacity>
                                </div>
                            </Row>
                        )
                }
                {
                    seeAllParksDetails
                        ?
                        (
                            <ListGroup>
                                {
                                    hike.parking_lots.map((p) => 
                                        <Park key={p.id} park={p}></Park>
                                    )
                                }
                            </ListGroup>
                        )
                        :
                        undefined
                }
                {
                    hike.points.length === 0
                        ?
                        undefined
                        :
                        (
                            <Row>
                                <div className="seePointsButtonContainer">
                                    <ClickableOpacity
                                        onClick={() => setSeeAllPointsDetails(val => !val)}>
                                        <div className="seePointsButton">{seeAllPointsDetails ? "Hide details for all points" : "See details for all points"}</div>
                                    </ClickableOpacity>
                                </div>
                            </Row>
                        )
                }
                {
                    seeAllPointsDetails
                        ?
                        (
                            <ListGroup>
                                {
                                    hike.points.map((p) => 
                                        <Point key={p.id} point={p}></Point>
                                    )
                                }
                            </ListGroup>
                        )
                        :
                        undefined
                }
            </Col>
        </Container>
    );
}

const RefPointSwitcher = ({ point, type }) => {
    switch (type) {
        case "Hut point":
            return (<Hut hut={point} key={point.id}/>);
        case "Parking point":
            return (<Park park={point}  key={point.id}/>);
        case "general point":
            return (<Point point={point}  key={point.id}/>);
        default:
            console.log("Errore, tipo :" + type + "non valido per un ref. point");
            return (<></>);
    }
}



const Point = ({ point, key }) => {
    return (
        <ListGroupItem key={key} className="m-3 border-2 rounded-3 shadow">
            <Col className='point'>
                {
                    point.name
                        ?
                        (<Row>
                            <div className="pointTitle">{point.name}</div>
                        </Row>)
                        :
                        undefined
                }
                {
                    point.address
                        ?
                        (<Row>
                            <div className="pointTitle">{point.address}</div>
                        </Row>)
                        :
                        undefined
                }
                <Row>
                    <div className="textGrayPrimary">{"lat: " + point.latitude}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"long: " + point.longitude}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"Altitude: " + point.altitude + " m"}</div>
                </Row>
            </Col>
        </ListGroupItem>
    );
}

const Hut = ({ hut, key }) => {
    return (
        <ListGroupItem key={key} className="m-3 border-2 rounded-3 shadow">
            <Col className='point'>
                <Row>
                    <div className="pointTitle">{hut.name + " (Hut)"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"lat: " + hut.latitude}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"long: " + hut.longitude}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"Altitude: " + hut.altitude + " m"}</div>
                </Row>
            </Col>
        </ListGroupItem>
    );
}


const Park = ({ park, key }) => {
    return (
        <ListGroupItem key={key}  className="m-3 border-2 rounded-3 shadow">
            <Col className='point'>
                <Row>
                    <div className="pointTitle">{park.name + " (Parking lot)"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"lat: " + park.latitude}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"long: " + park.longitude}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"Altitude: " + park.altitude + " m"}</div>
                </Row>
            </Col>
        </ListGroupItem>
    );
}

export { HikePage };