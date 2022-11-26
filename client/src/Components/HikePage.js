import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col, ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import { ClickableOpacity } from "./clickableOpacity";
import API from "../API";
import { Pencil } from "react-bootstrap-icons";
import { Map } from "./Map"
import { calcCrow } from "../utilities";

function HikePage({ setIsLoading, loggedIn, user }) {
    const [seeAllHutsDetails, setSeeAllHutsDetails] = useState(false);
    const [seeAllParksDetails, setSeeAllParksDetails] = useState(false);
    const [seeAllPointsDetails, setSeeAllPointsDetails] = useState(false);
    const [editingStartPoint, setEditingStartPoint] = useState(false);
    const [editingEndPoint, setEditingEndPoint] = useState(false)
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
                if (err == 404)
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
                    <Row style={{ height: 20 }}></Row>
                    <Row>
                        <div className="titleBig">{hike.title}</div>
                    </Row>
                    <Row style={{ height: 20 }}></Row>
                    <Row>
                        <div className="textGrayPrimaryItalic">{hike.description}</div>
                    </Row>
                    <Row style={{ height: 20 }}></Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{hike.region}</div>
                    </Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{hike.city + " (" + hike.province + ")"}</div>
                    </Row>
                    <Row>
                        <div className="textGrayPrimaryBig">{"Ascent: " + hike.ascendent_meters + " m"}</div>
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
                    <Row style={{ height: 20 }}></Row>
                    {
                        (loggedIn && (user.role === "local guide" || user.role === "hiker")) ?
                            (
                                <>
                                    <Row>
                                        <Col xs={12} sm={10} md={8} lg={8} xl={8} xxl={8}>
                                            <Map hike={hike}></Map>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: 20 }}></Row>
                                </>
                            ) : false

                    }
                    <Row>
                        <div className='rowC' style={{ marginLeft: 10 }}>
                            {hike.lg_id === user.id
                                ?
                                <ClickableOpacity
                                    onClick={() => {
                                        setEditingStartPoint(editing => !editing)
                                    }}
                                >
                                    <Pencil color={editingStartPoint ? '#14A44D' : '#495057'} size={25} />
                                </ClickableOpacity>
                                : false
                            }
                            <div className="textGrayPrimaryBig" style={hike.lg_id === user.id ? { marginLeft: 20 } : {marginLeft: 0}}>{"Start Point:"}</div>
                        </div>
                    </Row>
                    {
                        editingStartPoint
                            ?
                            <EditStartEndPoint hike={hike} selected={"start point"} setIsLoading={setIsLoading} setHike={setHike} setEditable={setEditingStartPoint} />
                            :
                            <Row>
                                <ListGroup>
                                    <RefPointSwitcher type={hike.start_point_type} point={hike.start_point} user={user} />
                                </ListGroup>

                            </Row>
                    }

                    <Row style={{ height: 20 }}></Row>
                    <Row>
                        <div className='rowC' style={{ marginLeft: 10 }}>
                            {hike.lg_id === user.id
                                ?
                                <ClickableOpacity
                                    onClick={() => {
                                        setEditingEndPoint(editing => !editing)
                                    }}
                                >
                                    <Pencil color={editingEndPoint ? '#14A44D' : '#495057'} size={25} />
                                </ClickableOpacity>
                                : false
                            }
                            <div style={hike.lg_id === user.id ? { marginLeft: 20 } : {marginLeft:0}} className="textGrayPrimaryBig">{"End Point:"}</div>
                        </div>
                    </Row>
                    <Row>
                        {

                            editingEndPoint
                                ?
                                <EditStartEndPoint hike={hike} selected={"end point"} setIsLoading={setIsLoading} setHike={setHike} setEditable={setEditingEndPoint} />
                                :
                                <ListGroup>
                                    <RefPointSwitcher type={hike.end_point_type} point={hike.end_point} user={user} />
                                </ListGroup>
                        }
                    </Row>
                    {
                        hike.huts.length === 0
                            ?
                            undefined
                            :
                            (
                                <>
                                    <Row style={{ height: 20 }}></Row>
                                    <Row>
                                        <div className="seePointsButtonContainer">
                                            <ClickableOpacity
                                                onClick={() => setSeeAllHutsDetails(val => !val)}>
                                                <div className="seePointsButton">{seeAllHutsDetails ? "Hide details for all huts" : "See details for all huts"}</div>
                                            </ClickableOpacity>
                                        </div>
                                    </Row>
                                </>
                            )
                    }
                    {
                        seeAllHutsDetails
                            ?
                            (
                                <ListGroup>
                                    {
                                        hike.huts
                                            .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                            .map((h) =>
                                                <Hut key={h.id} hut={h} user={user}></Hut>
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

                                <>
                                    <Row style={{ height: 20 }}></Row>
                                    <Row>
                                        <div className="seePointsButtonContainer">
                                            <ClickableOpacity
                                                onClick={() => setSeeAllParksDetails(val => !val)}>
                                                <div className="seePointsButton">{seeAllParksDetails ? "Hide details for all parking lots" : "See details for all parking lots"}</div>
                                            </ClickableOpacity>
                                        </div>
                                    </Row>
                                </>
                            )
                    }
                    {
                        seeAllParksDetails
                            ?
                            (
                                <ListGroup>
                                    {
                                        hike.parking_lots
                                            .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                            .map((p) =>
                                                <Park key={p.id} park={p} user={user}></Park>
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

                                <>
                                    <Row style={{ height: 20 }}></Row>
                                    <Row>
                                        <div className="seePointsButtonContainer">
                                            <ClickableOpacity
                                                onClick={() => setSeeAllPointsDetails(val => !val)}>
                                                <div className="seePointsButton">{seeAllPointsDetails ? "Hide details for all points" : "See details for all points"}</div>
                                            </ClickableOpacity>
                                        </div>
                                    </Row>
                                </>
                            )
                    }
                    {
                        seeAllPointsDetails
                            ?
                            (
                                <ListGroup>
                                    {
                                        hike.points
                                            .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                            .map((p) =>
                                                <Point key={p.id} point={p}></Point>
                                            )
                                    }
                                </ListGroup>
                            )
                            :
                            undefined
                    }
                    <Row style={{ height: 80 }}></Row>
                </Col>


            </Container>
    );
}

const RefPointSwitcher = ({ point, type, user }) => {
    switch (type) {
        case "Hut point":
            return (<Hut hut={point} key={point.id} user={user} />);
        case "Parking point":
            return (<Park park={point} key={point.id} user={user} />);
        case "general point":
            return (<Point point={point} key={point.id} />);
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
                            <div className="textGrayPrimary">{"Address: " + point.address}</div>
                        </Row>)
                        :
                        undefined
                }
                <Row>
                    <div className="textGrayPrimary">{"Altitude: " + point.altitude + " m"}</div>
                </Row>
            </Col>
        </ListGroupItem>
    );
}


const Hut = ({ hut, key, user }) => {
    const navigate = useNavigate();
    return (
        <ListGroupItem key={key} className="m-3 border-2 rounded-3 shadow">
            <Col className='point'>
                <Row>
                    <div className="pointTitle">{hut.name + " (" + hut.type + ")"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{hut.region}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{hut.city + " (" + hut.province + ")"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"Altitude: " + hut.altitude + " m"}</div>
                </Row>
                {(user && (user.role === "local guide" || user.role === "hiker")) ?
                    <Row>
                        <div className="touchableOpacityWithTextContainer">
                            <ClickableOpacity
                                onClick={() => {
                                    navigate("/hut/" + hut.id)
                                }}>
                                <div className="seeMore">
                                    see more
                                </div>
                            </ClickableOpacity>
                        </div>
                    </Row> : false
                }
            </Col>
        </ListGroupItem>
    );
}


const Park = ({ park, key, user }) => {
    const navigate = useNavigate();
    return (
        <ListGroupItem key={key} className="m-3 border-2 rounded-3 shadow">
            <Col className='point'>
                <Row>
                    <div className="pointTitle">{park.name + " (Parking lot)"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{park.region}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{park.city + " (" + park.province + ")"}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{"Altitude: " + park.altitude + " m"}</div>
                </Row>
                {(user && (user.role === "local guide" || user.role === "hiker")) ?
                    <Row>
                        <div className="touchableOpacityWithTextContainer">
                            <ClickableOpacity
                                onClick={() => {
                                    navigate("/parkingLot/" + park.id)
                                }}>
                                <div className="seeMore">
                                    see more
                                </div>
                            </ClickableOpacity>
                        </div>
                    </Row> : false
                }
            </Col>
        </ListGroupItem>
    );
}


const EditStartEndPoint = ({ hike, selected, setIsLoading, setHike, setEditable }) => {
    const [type, setType] = useState("hut");
    const [parks, setParks] = useState([]);
    const [huts, setHuts] = useState([]);
    const [newPoint, setNewPoint] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editHike = selected === "start point" ?
            {
                start_point: newPoint,
                type_start: type === 'hut' ? 'Hut point' : 'Parking point',

            }
            :
            {
                end_point: newPoint,
                type_end: type === 'hut' ? 'Hut point' : 'Parking point',
            }
        try {
            setIsLoading(true);
            if (selected === "start point")
                await API.updateHikeStartPoint(editHike, hike.id); //updateHike
            else
                await API.updateHikeEndPoint(editHike, hike.id)
            const res = await API.getHikeById(hike.id);
            setHike(res);
            setIsLoading(false);
            setEditable(false);
            toast.success("Hike Updated Successively", { position: "top-center" }, { toastId: 110 });

        } catch (err) {
            setIsLoading(false);
            console.log(err)
            toast.error(err, { position: "top-center" }, { toastId: 120 });
        }

    };

    useEffect(() => {
        async function getParksAndHuts() {
            try {
                let point = selected === "start point" ? hike.start_point : hike.end_point;
                let point_type = selected === "start point" ? hike.start_point_type : hike.end_point_type;
                setIsLoading(true);
                let ps = await API.getParks()
                ps = ps
                    .filter(p => {
                        let first_cond = calcCrow(p.latitude, p.longitude, point.latitude, point.longitude) <= 0.3;
                        let sec_cond = !(p.id === point.id && point_type === "Parking point")
                        return first_cond && sec_cond
                    })
                    .sort((a, b) => a.name.trim().localeCompare(b.name.trim()));
                setParks(ps);
                let hs = await API.getHuts()
                hs = hs
                    .filter(h => {
                        let first_cond = calcCrow(h.latitude, h.longitude, point.latitude, point.longitude) <= 0.3;
                        let sec_cond = !(h.id === point.id && point_type === "Hut point")
                        return first_cond && sec_cond
                    })
                    .sort((a, b) => a.name.trim().localeCompare(b.name.trim()));
                setHuts(hs);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                toast.error("Server error", { position: "top-center" }, { toastId: 40 });
            }
        }
        getParksAndHuts()
    }, [])
    return (
        <Form className='m-3' onSubmit={handleSubmit}>
            <Row style={{ height: 20 }} />
            <Row>
                <Form.Group>
                    <Form.Label className='formLabel'>{"Select the new " + selected + ":"}</Form.Label>
                    <Form.Select
                        onChange={(e) => { setType(e.target.value) }}
                        style={{ width: 400, borderWidth: 3 }}
                    >
                        <option value={"hut"}>
                            Hut
                        </option>
                        <option value={"parking lot"}>
                            Parking Lot
                        </option>
                    </Form.Select>
                </Form.Group>
                <Row style={{ height: 10 }} />
                <HutParkSelector list={type === "hut" ? huts : parks} type={type} setNewPoint={setNewPoint}></HutParkSelector>
            </Row>
            <Row style={{ height: 20 }} />
            <Col className="mt-4">
                <Row md={3}>
                    <Button type="submit" variant="outline-success">Confirm</Button>
                </Row>

                <Row md={3} className="my-3">
                    <Button variant="outline-danger" onClick={() => {setEditable(false)}}>Cancel</Button>
                </Row>
            </Col>
        </Form>
    )
}

const HutParkSelector = ({ list, type, setNewPoint }) => {
    useEffect(()=>{
        if(list.length!==0){
            setNewPoint(list[0].id);
        }
    }, [list])
    return (
        <Row>
            {
                list.length === 0
                    ?
                    <div className='formLabel'>{"No addable " + type + " available in 300 meters"}</div>
                    :
                    <Form.Group>
                        <Form.Label>{"Select the " + type + ":"}</Form.Label>
                        <Form.Select
                            onChange={(e) => { setNewPoint(e.target.value) }}
                            style={{ width: 400, borderWidth: 3 }}
                        >
                            {
                                list.map(l => <option key={l.id} value={l.id}>{l.name}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
            }
        </Row>
    );
}




export { HikePage };