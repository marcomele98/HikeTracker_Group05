import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Row, Container, Col, ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import { ClickableOpacity } from "./clickableOpacity";
import API from "../API";
import { Pencil } from "react-bootstrap-icons";
import { Map } from "./Map"
import { calcCrow } from "../utilities";
import { ImageComponent } from './imageFromBase64';
import AddPointForm from "./AddPointForm";
import EditDateModal from "./dateModal"
import "../App.css"


let gpxParser = require('gpxparser');

function HikePage({ setIsLoading, loggedIn, user }) {
    const [editingStartPoint, setEditingStartPoint] = useState(false);
    const [editingEndPoint, setEditingEndPoint] = useState(false)
    const [hike, setHike] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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


    const onHandleStart = async(timestamp) => {
        handleClose();
        try {
            setIsLoading(true);
            await API.startHike(hike.id, timestamp)
            const res = await API.getHikeById(hike.id);
            setHike(res);
            setIsLoading(false);
            toast.success("Hike Started Successfully", { position: "top-center" }, { toastId: 110 });

        } catch (err) {
            setIsLoading(false);
            toast.error(err, { position: "top-center" }, { toastId: 120 });
        }
    }

    const onHandleEnd = async(timestamp) => {
        handleClose();
        try {
            setIsLoading(true);
            await API.endHike(hike.id, timestamp)
            const res = await API.getHikeById(hike.id);
            setHike(res);
            setIsLoading(false);
            toast.success("Hike Ended Successfully", { position: "top-center" }, { toastId: 111 });

        } catch (err) {
            setIsLoading(false);
            toast.error(err, { position: "top-center" }, { toastId: 120 });
        }
        //console.log("passerò al backend: " + timestamp)
    }



    return (
        !hike ?
            undefined
            :
            <Container>
                <Col>

                    {
                        hike.image ?
                            <>
                                <br />
                                <ImageComponent base64String={hike.image}></ImageComponent>
                            </>
                            : false
                    }
                    <br />
                    <Row className='paddingHorizontal'>
                        <Col className='noMarginAndPadding' xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}>
                            <div className="titleBig">{hike.title}</div>
                        </Col>
                        {
                            (user.role === "hiker" && !hike.end_time) ?
                                <>
                                <EditDateModal onHandle={!hike.start_time ? onHandleStart : onHandleEnd} start_time={hike.start_time} onHide={handleClose} show={show}></EditDateModal>
                                    <Button className="styleButton" variant={!hike.start_time ? "outline-success" : "outline-danger"} as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}
                                        onClick={handleShow}>
                                        {!hike.start_time ? "Start" : "End"}
                                    </Button>
                                </>
                                : false
                        }
                    </Row>
                    {
                        user.role !== "hiker" || !hike.start_time
                            ?
                            false
                            :
                            <>
                                <Row className='paddingHorizontal'>
                                    <Col className='noMarginAndPadding' xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <div className={!hike.end_time ? "textStarted" : "textCompleted"}>
                                            {!hike.end_time ? "STARTED" : "COMPLETED"}
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                            </>
                    }
                    <Row >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="textGrayPrimaryBig">{hike.region + " - " + hike.city + " (" + hike.province + ")"}</div>
                        </Col>
                    </Row>
                    <br />
                    <Row >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="textGrayPrimaryItalic">{hike.description}</div>
                        </Col>
                    </Row>


                    <br />
                    <Row >

                        <Col xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                            <div className="textGrayPrimaryBig">{"Ascent: " + hike.ascendent_meters + " m"}</div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                            <div className="textGrayPrimaryBig">{"Length: " + hike.length_kms + " km"}</div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                            <div className="textGrayPrimaryBig">{"Expected time: " + hike.expected_mins + " min"}</div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                            <div className="textGrayPrimaryBig">{"Difficulty: " + hike.difficulty}</div>
                        </Col>

                    </Row>
                    <br />
                    {
                        (loggedIn && (user.role === "local guide" || user.role === "hiker")) ?
                            (
                                <>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Map hike={hike}></Map>
                                        </Col>
                                    </Row>
                                    <br />
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
                            <div className="textGrayPrimaryBig" style={hike.lg_id === user.id ? { marginLeft: 20 } : { marginLeft: 0 }}>{"Start Point"}</div>
                        </div>
                    </Row>
                    {
                        editingStartPoint
                            ?
                            <EditStartEndPoint intialType={hike.start_point_type} hike={hike} selected={"start point"} setIsLoading={setIsLoading} setHike={setHike} setEditable={setEditingStartPoint} />
                            :
                            <Row>
                                <ListGroup>
                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <RefPointSwitcher type={hike.start_point_type} point={hike.start_point} user={user} />
                                    </Col>
                                </ListGroup>

                            </Row>
                    }

                    <br />
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
                            <div style={hike.lg_id === user.id ? { marginLeft: 20 } : { marginLeft: 0 }} className="textGrayPrimaryBig">{"End Point"}</div>
                        </div>
                    </Row>
                    <Row>
                        {

                            editingEndPoint
                                ?
                                <EditStartEndPoint intialType={hike.start_end_type} hike={hike} selected={"end point"} setIsLoading={setIsLoading} setHike={setHike} setEditable={setEditingEndPoint} />
                                :
                                <ListGroup>
                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <RefPointSwitcher type={hike.end_point_type} point={hike.end_point} user={user} />
                                    </Col>
                                </ListGroup>
                        }
                    </Row>

                    <br />
                    <div className="textGrayPrimaryBig" style={{ marginLeft: 10 }}>{"Huts"}</div>


                    {
                        hike.huts.length === 0
                            ?
                            <div className="textGrayPrimary" style={{ marginLeft: 10 }}>No hut linked to this hike</div>
                            :
                            (
                                <>
                                    <Row>
                                        <ListGroup>
                                            {
                                                hike.huts
                                                    .sort((a, b) => (a.type.trim() + a.name.trim()).localeCompare(b.type.trim() + b.name.trim()))
                                                    .map((h) =>
                                                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                                            <Hut key={h.id} hut={h} user={user}></Hut>
                                                        </Col>
                                                    )
                                            }
                                        </ListGroup>
                                    </Row>
                                </>
                            )
                    }

                    <NewHut user={user} hike={hike} setIsLoading={setIsLoading} setHike={setHike} />

                    <br />
                    <div className="textGrayPrimaryBig" style={{ marginLeft: 10 }}>{"Parking Lots"}</div>

                    {

                        hike.parking_lots.length === 0
                            ?
                            <div className="textGrayPrimary" style={{ marginLeft: 10 }}>No parking lots linked to this hike</div>
                            :
                            (
                                <>
                                    <Row>
                                        < ListGroup >
                                            {
                                                hike.parking_lots
                                                    .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
                                                    .map((p) =>
                                                        <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                                            <Park key={p.id} park={p} user={user}></Park>
                                                        </Col>
                                                    )
                                            }
                                        </ListGroup>
                                    </Row>
                                </>)
                    }


                    <br />
                    <div className="textGrayPrimaryBig" style={{ marginLeft: 10 }}>{"Reference Points"}</div>

                    {hike.points.length === 0
                        ?
                        <div className="textGrayPrimary" style={{ marginLeft: 10 }}>No reference points linked to this hike</div>
                        :
                        (
                            <>
                                <Row>
                                    <ListGroup>
                                        {
                                            hike.points
                                                .sort((a, b) => a.name?.trim().localeCompare(b.name?.trim()))
                                                .map((p) =>
                                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                                        <Point key={p.id} point={p}></Point>
                                                    </Col>
                                                )
                                        }
                                    </ListGroup>
                                </Row>
                            </>
                        )
                    }

                    <NewRefPoint user={user} hike={hike} setIsLoading={setIsLoading} setHike={setHike}></NewRefPoint>

                    <Row style={{ height: 80 }}></Row>
                </Col>


            </Container >
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
                            <div className={point.name ? "textGrayPrimary" : "pointTitle"}>{"Address: " + point.address}</div>
                        </Row>)
                        :
                        undefined
                }
                {
                    !point.address && !point.name
                        ?
                        (<Row>
                            <div className="pointTitle">{point.latitude + ", " + point.longitude}</div>
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
                    <div className="pointTitle">{hut.type + " " + hut.name}</div>
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
    const [type, setType] = useState("default");
    const [parks, setParks] = useState([]);
    const [huts, setHuts] = useState([]);
    const [newPoint, setNewPoint] = useState({});
    let condition = type === "default" || (type === "hut" && huts.length !== 0) || (type === "parking lot" && parks.length !== 0)

    useEffect(() => {
        if (type === "default") {
            let gpx = new gpxParser();
            gpx.parse(hike.gpx);
            const point = selected ===
                "start point"
                ?
                gpx.tracks[0].points[0]
                :
                gpx.tracks[0].points[gpx.tracks[0].points.length - 1];
            const point_type = selected ===
                "start point"
                ?
                hike.start_point_type
                :
                hike.end_point_type
            if (point_type === "general point")
                point.name = selected === "start point" ? hike.start_point.name : hike.end_point.name;
            setNewPoint({ latitude: point.lat, longitude: point.lon, altitude: point.ele, name: point.name })
        }
    }, [type])

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
                if (type === "default")
                    await API.resetHikeStartPoint(newPoint, hike.id)
                else
                    await API.updateHikeStartPoint(editHike, hike.id);
            else
                if (type === "default")
                    await API.resetHikeEndPoint(newPoint, hike.id)
                else
                    await API.updateHikeEndPoint(editHike, hike.id)
            const res = await API.getHikeById(hike.id);
            setHike(res);
            setIsLoading(false);
            setEditable(false);
            toast.success("Hike Updated Successfully", { position: "top-center" }, { toastId: 110 });

        } catch (err) {
            setIsLoading(false);
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
                        let first_cond = calcCrow(p.latitude, p.longitude, point.latitude, point.longitude) <= 5;
                        let sec_cond = !(p.id === point.id && point_type === "Parking point")
                        return first_cond && sec_cond
                    })
                    .sort((a, b) => a.name.trim().localeCompare(b.name.trim()));
                setParks(ps);
                let hs = await API.getHuts()
                hs = hs
                    .filter(h => {
                        let first_cond = calcCrow(h.latitude, h.longitude, point.latitude, point.longitude) <= 5;
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

            <Col className="mb-1 mt-2" xs={12} sm={10} md={8} lg={8} xl={8} xxl={8}>
                <Form.Group>
                    <Form.Label className='formLabel'>{"Select the new " + selected + ":"}</Form.Label>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <Form.Select
                            onChange={(e) => { setType(e.target.value) }}
                            style={{ borderWidth: 3 }}
                        >
                            <option value={"default"}>
                                Default
                            </option>
                            <option value={"hut"}>
                                Hut
                            </option>
                            <option value={"parking lot"}>
                                Parking Lot
                            </option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Row style={{ height: 10 }} />
                {
                    type === "default"
                        ?
                        <AddPointForm autoGetAddress={type === "default"} rowClassName='justify-content-left' boxStyle={{ borderWidth: 3 }} hideTitle={true} textSmall={true} textStyle={{}} point={newPoint} setPoint={setNewPoint} type={selected === "start point" ? "Start point" : "End point"} />
                        :
                        <HutParkSelector list={type === "hut" ? huts : parks} type={type} setNewPoint={setNewPoint}></HutParkSelector>
                }
            </Col>

            {
                type === "default" ?
                    <Row style={{ height: 0 }} />
                    :
                    <Row style={{ height: 20 }} />
            }
            <Row>
                {
                    <div className='rowC'>
                        {
                            condition ?
                                <Button type="submit" variant="outline-success" style={{ width: 100, borderWidth: 3 }}>Confirm</Button>
                                :
                                false
                        }
                        <Button variant="outline-danger" style={{ width: 100, borderWidth: 3, marginLeft: condition ? 20 : 0 }} onClick={() => { setEditable(false) }}>Cancel</Button>
                    </div>
                }
            </Row>
            <Row style={{ height: 20 }} />
        </Form>
    )
}

const HutParkSelector = ({ list, type, setNewPoint }) => {
    useEffect(() => {
        if (list.length !== 0) {
            setNewPoint(list[0].id);
        }
    }, [list])
    return (
        <Row>
            {
                list.length === 0
                    ?
                    <div className='formLabel'>{"No addable " + type + " available in 5km"}</div>
                    :
                    <Form.Group>
                        <Form.Label className='formLabel'>{"Select the " + type + ":"}</Form.Label>
                        <Form.Select
                            onChange={(e) => { setNewPoint(e.target.value) }}
                            style={{ borderWidth: 3 }}
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

const NewRefPoint = ({ user, hike, setIsLoading, setHike, }) => {

    const [gpxPoints, setGpxPoints] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [referencePoints, setReferencePoints] = useState([]);


    useEffect(() => {
        let gpx = new gpxParser();
        gpx.parse(hike.gpx);
        const points = gpx.tracks[0].points
        setGpxPoints(points);
    }, [hike])

    const onConfirm = async (e, point) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await API.addNewReferencePoint(point, hike.id)
            const res = await API.getHikeById(hike.id);
            setHike(res);
            setIsLoading(false);
            toast.success("Hike Updated Successfully", { position: "top-center" }, { toastId: 110 });

        } catch (err) {
            setIsLoading(false);
            toast.error(err, { position: "top-center" }, { toastId: 120 });
        }
    }

    return (
        <>

            {hike.lg_id === user.id
                ?
                <div style={{ marginLeft: 10 }}>

                    <Col className="mb-1 mt-2" xs={12} sm={10} md={8} lg={8} xl={8} xxl={8}>
                        {showForm ?
                            <AddPointForm points={gpxPoints} setShowForm={setShowForm} setReferencePoints={setReferencePoints} referencePoints={referencePoints} type={"New point"} onConfirm={onConfirm} rowClassName='justify-content-left' boxStyle={{ borderWidth: 3 }} hideTitle={true} textSmall={true} textStyle={{}} ></AddPointForm>
                            :
                            <Col className="mb-1 mt-2" xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                                <Button variant="outline-success" style={{ width: 200, borderWidth: 3 }} onClick={() => setShowForm(true)}>Add new point</Button>
                            </Col>

                        }
                    </Col>
                </div>
                : false
            }
        </>
    )
}




const NewHut = ({ user, hike, setIsLoading, setHike }) => {

    const [showForm, setShowForm] = useState(false);
    const [availableHuts, setAvailableHuts] = useState([]);
    const [hut, setHut] = useState()

    useEffect(() => {
        const getHuts = async () => {
            setIsLoading(true)
            let huts = await API.getHuts()
            let gpx = new gpxParser();
            gpx.parse(hike.gpx);
            const points = gpx.tracks[0].points
            huts = huts.filter((h) =>
                points.find(p => calcCrow(h.latitude, h.longitude, p.lat, p.lon) < 5) && !hike.huts.find((h2) => h.id === h2.id)
            )
            setAvailableHuts(huts);
            setIsLoading(false);
        }
        getHuts()
    }, [hike])


    const onConfirm = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await API.hutHikeLink({ hut_id: hut }, hike.id)
            const res = await API.getHikeById(hike.id);
            setHike(res);
            setIsLoading(false);
            toast.success("Hike Updated Successfully", { position: "top-center" }, { toastId: 210 });
            setShowForm(false)

        } catch (err) {
            setIsLoading(false);
            toast.error(err, { position: "top-center" }, { toastId: 130 });
        }
    }

    return (
        <Row>
            {hike.lg_id === user.id
                ?
                <div style={{ marginLeft: 10 }}>

                    <Col className="mb-1 mt-2" xs={12} sm={10} md={8} lg={8} xl={8} xxl={8}>
                        {showForm ?
                            <>
                                <HutParkSelector list={availableHuts} type="hut" setNewPoint={setHut}></HutParkSelector>
                                <Row style={{ height: 20 }} />
                                <Row>
                                    <div className='rowC'>
                                        {availableHuts.length !== 0
                                            ?
                                            <Button type="submit" variant="outline-success" onClick={onConfirm} style={{ width: 100, borderWidth: 3 }}>Confirm</Button>
                                            :
                                            <></>
                                        }
                                        <Button variant="outline-danger" style={{ width: 100, borderWidth: 3, marginLeft: availableHuts.length !== 0 ? 20 : 0 }} onClick={() => { setShowForm(false) }}>Cancel</Button>
                                    </div>
                                </Row>
                                <Row style={{ height: 20 }} />
                            </>
                            :
                            <Col className="mb-1 mt-2" xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                                <Button variant="outline-success" style={{ width: 200, borderWidth: 3 }} onClick={() => setShowForm(true)}>Add new hut</Button>
                            </Col>

                        }
                    </Col>
                </div>
                : false
            }
        </Row>
    )
}






export { HikePage };