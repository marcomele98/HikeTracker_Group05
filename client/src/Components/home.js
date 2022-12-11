import { Row, Container, Col, Form, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import API from "../API";
import 'rc-slider/assets/index.css';
import { CliccableMap } from "./cliccableMap";
import { calcCrow } from "../utilities";
import img from "../Assets/Images/home.jpeg"

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);



function Home({ setIsLoading, user, setUser }) {

    const [seeFilters, setSeeFilters] = useState(false);
    const [province, setProvince] = useState("");
    const [coordinates, setCoordinates] = useState();
    const [radius, setRadius] = useState();
    const [city, setCity] = useState("");
    const [maxAscent, setMaxAscent] = useState("");
    const [minAscent, setMinAscent] = useState("");
    const [maxLength, setMaxLength] = useState("");
    const [minLength, setMinLength] = useState("");
    const [maxExpectedTime, setMaxExpectedTime] = useState("");
    const [minExpectedTime, setMinExpectedTime] = useState("");
    const [minDifficulty, setMinDifficulty] = useState("Tourist");
    const [maxDifficulty, setMaxDifficulty] = useState("Professional Hiker");
    const [hikes, setHikes] = useState([]);
    const navigate = useNavigate();

    const getPreferences = async () => {
        try {
            const preferences = await API.getPreferencesByUserId(user.id);
            setProvince(preferences.province ? preferences.province : "");
            setCity(preferences.city ? preferences.city : "");
            setRadius(preferences.radius);
            setCoordinates((preferences.point_latitude && preferences.point_longitude) ? { lat: preferences.point_latitude, lng: preferences.point_longitude } : undefined);
            setMaxAscent(preferences.max_ascendent_meters ? preferences.max_ascendent_meters : "");
            setMinAscent(preferences.min_ascendent_meters ? preferences.min_ascendent_meters : "");
            setMaxLength(preferences.max_length_kms ? preferences.max_length_kms : "");
            setMinLength(preferences.min_length_kms ? preferences.min_length_kms : "");
            setMaxExpectedTime(preferences.max_expected_mins ? preferences.max_expected_mins : "");
            setMinExpectedTime(preferences.min_expected_mins ? preferences.min_expected_mins : "");
            setMaxDifficulty(preferences.max_difficulty ? preferences.max_difficulty : "Professional Hiker");
            setMinDifficulty(preferences.min_difficulty ? preferences.min_difficulty : "Tourist");
        } catch (err) {
            console.log(err)
            toast.error(err === 404 ? "No saved preferences" : "Server error.", { position: "top-center" }, { toastId: 25 });
            setIsLoading(false);
        }
    }

    const setPreferences = async () => {
        var lat = coordinates ? parseFloat(coordinates?.lat).toFixed(6) : null
        var lon = coordinates ? parseFloat(coordinates?.lng).toFixed(6) : null
        try {
            setIsLoading(true);
            await API.setPreferences(
                {
                    province: province,
                    point_latitude: lat,
                    point_longitude: lon,
                    radius: radius,
                    city: city,
                    max_ascendent_meters: maxAscent,
                    min_ascendent_meters: minAscent,
                    max_length_kms: maxLength,
                    min_length_kms: minLength,
                    max_expected_mins: maxExpectedTime,
                    min_expected_mins: minExpectedTime,
                    min_difficulty: minDifficulty,
                    max_difficulty: maxDifficulty
                }
            )
            toast.success("Preferences saved correctly.", { position: "top-center" }, { toastId: 83 });
            setIsLoading(false);
        } catch (err) {
            console.log("aaa", err)
            toast.error(err, { position: "top-center" }, { toastId: 97 });
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const setUserFilters = async () => {
            setUser({
                ...user,
                filters: {
                    province: province,
                    coordinates: coordinates ? { ...coordinates } : undefined,
                    radius: radius,
                    city: city,
                    maxAscent: maxAscent,
                    minAscent: minAscent,
                    maxLength: maxLength,
                    minLength: minLength,
                    maxExpectedTime: maxExpectedTime,
                    minExpectedTime: minExpectedTime,
                    minDifficulty: minDifficulty,
                    maxDifficulty: maxDifficulty
                }
            })
        }
        setUserFilters()
    }, [province, coordinates, radius, city, maxAscent, minAscent, maxLength, minLength, maxExpectedTime, minExpectedTime, minDifficulty, maxDifficulty])


    const getUserFilters = () => {
        if (user.filters) {
            setProvince(user.filters.province ? user.filters.province : "");
            setCity(user.filters.city ? user.filters.city : "");
            setRadius(user.filters.radius);
            setCoordinates(user.filters.coordinates ? { ...user.filters.coordinates } : undefined);
            setMaxAscent(user.filters.maxAscent ? user.filters.maxAscent : "");
            setMinAscent(user.filters.minAscent ? user.filters.minAscent : "");
            setMaxLength(user.filters.maxLength ? user.filters.maxLength : "");
            setMinLength(user.filters.minLength ? user.filters.minLength : "");
            setMaxExpectedTime(user.filters.maxExpectedTime ? user.filters.maxExpectedTime : "");
            setMinExpectedTime(user.filters.minExpectedTime ? user.filters.minExpectedTime : "");
            setMaxDifficulty(user.filters.maxDifficulty ? user.filters.maxDifficulty : "Professional Hiker");
            setMinDifficulty(user.filters.minDifficulty ? user.filters.minDifficulty : "Tourist");
        }
    }

    useEffect(() => {
        const getHikesFromServer = async () => {
            try {
                setIsLoading(true);
                const res = await API.getHikes();
                setHikes(res);
                setIsLoading(false);
            } catch (err) {
                toast.error("Server error.", { position: "top-center" }, { toastId: 4 });
                setIsLoading(false);
            }
        };
        // if(user)
        getUserFilters()
        getHikesFromServer()
    }, [])

    useEffect(() => {
        if (!user.filters) {
            setProvince("");
            setCity("");
            setMaxAscent("");
            setMinAscent("");
            setMaxLength("");
            setMinLength("");
            setMaxExpectedTime("");
            setMinExpectedTime("");
            setMinDifficulty("Tourist");
            setMaxDifficulty("Professional Hiker");
            setRadius("");
            setCoordinates(undefined);
        }
    }, [user])


    return (

        <>
            <div className="backImage" style={{ backgroundImage: `url(${img})`, opacity: seeFilters ? 0.2 : 1 }}></div>
            <Container>
                <Row style={{ height: 30 }}></Row>
                <Row className="m-3" style={{ margin: 0, padding: 0 }}>

                    
                        {
                            user.role !== 'local guide' ?
                                false
                                :
                                <>
                                    <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-success" style={{ borderWidth: 3, marginBottom: 10, marginRight:10 }} onClick={() => navigate("/new-hike")}>New Hike</Button>
                                </>

                        }
                        
                        <Col style={{ margin: 0, padding: 0, marginBottom: 10 }}>
                        <>
                            <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-secondary" style={{ borderWidth: 3 }} onClick={() => {
                                setSeeFilters((val) => !val);
                            }}>{seeFilters ? "Hide Filters" : "Show Filters"}</Button>
                            </>
                        </Col>
    
                        {
                            user.role !== 'hiker' ?
                                false
                                :
                                <>
                                    <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-success" style={{ borderWidth: 3, marginRight: 10,  marginBottom: 10 }} onClick={() => {
                                        getPreferences();
                                    }}>Get Filters From Preferences</Button>
                                    <Button as={Col} xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} type="submit" variant="outline-success" style={{ borderWidth: 3, marginRight: 10, marginBottom: 10 }} onClick={() => { setPreferences() }}>Save Filters As Preferences</Button>
                                </>

                        }
                </Row>
                {
                    seeFilters ?
                        (
                            <FilterForm
                                setProvinceFilter={setProvince}
                                setCityFilter={setCity}
                                setPositionFilter={setCoordinates}
                                setRadiusFilter={setRadius}
                                setMaxAscentFilter={setMaxAscent}
                                setMinAscentFilter={setMinAscent}
                                setMaxLengthFilter={setMaxLength}
                                setMinLengthFilter={setMinLength}
                                setMaxExpectedTimeFilter={setMaxExpectedTime}
                                setMinExpectedTimeFilter={setMinExpectedTime}
                                setMinDifficultyFilter={setMinDifficulty}
                                setMaxDifficultyFilter={setMaxDifficulty}
                                setSeeFilters={setSeeFilters}
                                prov={province}
                                cit={city}
                                pos={coordinates}
                                rad={radius}
                                maxA={maxAscent}
                                minA={minAscent}
                                maxL={maxLength}
                                minL={minLength}
                                maxE={maxExpectedTime}
                                minE={minExpectedTime}
                                maxD={maxDifficulty}
                                minD={minDifficulty}
                                user={user}
                            ></FilterForm>
                        ) : undefined

                }

                <ListGroup>
                    <Row>

                        {
                            hikes
                                .filter((h) => {
                                    if ((province && !h.province.toLocaleLowerCase().includes(province.toLocaleLowerCase()))
                                        || (city && !h.city.toLocaleLowerCase().includes(city.toLocaleLowerCase()))
                                        || (maxAscent && maxAscent < h.ascendent_meters)
                                        || (minAscent && minAscent > h.ascendent_meters)
                                        || (maxLength && maxLength < h.length_kms)
                                        || (minLength && minLength > h.length_kms)
                                        || (maxExpectedTime && maxExpectedTime < h.expected_mins)
                                        || (minExpectedTime && minExpectedTime > h.expected_mins)
                                        || (maxDifficulty?.toLowerCase() === "tourist" && h.difficulty.toLowerCase() !== "tourist")
                                        || (maxDifficulty?.toLowerCase() === "hiker" && h.difficulty.toLowerCase() === "professional hiker")
                                        || (minDifficulty?.toLowerCase() === "professional hiker" && h.difficulty.toLowerCase() !== "professional hiker")
                                        || (minDifficulty?.toLowerCase() === "hiker" && h.difficulty.toLowerCase() === "tourist")
                                        || (coordinates !== undefined && radius && calcCrow(coordinates.lat, coordinates.lng, h.start_point_lat, h.start_point_lon) > radius)) {
                                        return false;
                                    }
                                    return true;
                                })
                                .sort((a, b) => a.title.trim().localeCompare(b.title.trim()))
                                .map((h) => (
                                    <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                                        <ListGroupItem style={{ height: 250, opacity: "85%" }} key={h.id} className="m-3 border-2 rounded-3 shadow">

                                            <Row>
                                                <div className="title">{h.title}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{h.region}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{h.city + " (" + h.province + ")"}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{"Ascent: " + h.ascendent_meters + " m"}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{"Length: " + h.length_kms + " km"}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{"Expected time: " + h.expected_mins + " min"}</div>
                                            </Row>
                                            <Row>
                                                <div className="textGrayPrimary">{"Difficulty: " + h.difficulty}</div>
                                            </Row>
                                            <Row style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
                                                <div className="touchableOpacityWithTextContainer">
                                                    <ClickableOpacity
                                                        onClick={() => {
                                                            navigate("/hike/" + h.id)
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




function FilterForm({
    setSeeFilters,
    setProvinceFilter,
    setCityFilter,
    setPositionFilter,
    setRadiusFilter,
    setMaxAscentFilter,
    setMinAscentFilter,
    setMaxLengthFilter,
    setMinLengthFilter,
    setMaxExpectedTimeFilter,
    setMinExpectedTimeFilter,
    setMinDifficultyFilter,
    setMaxDifficultyFilter,
    prov,
    cit,
    pos,
    rad,
    maxA,
    minA,
    maxL,
    minL,
    maxE,
    minE,
    maxD,
    minD,
    user
}) {

    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [maxAscent, setMaxAscent] = useState("");
    const [minAscent, setMinAscent] = useState("");
    const [maxLength, setMaxLength] = useState("");
    const [minLength, setMinLength] = useState("");
    const [maxExpectedTime, setMaxExpectedTime] = useState("");
    const [minExpectedTime, setMinExpectedTime] = useState("");
    const [minDifficulty, setMinDifficulty] = useState("Tourist");
    const [maxDifficulty, setMaxDifficulty] = useState("Professional Hiker");
    const [radius, setRadius] = useState("");
    const [position, setPosition] = useState();


    const resetForm = () => {
        setProvince(prov);
        setCity(cit);
        setMaxAscent(maxA);
        setMinAscent(minA);
        setMaxLength(maxL);
        setMinLength(minL);
        setMaxExpectedTime(maxE);
        setMinExpectedTime(minE);
        setMinDifficulty(minD);
        setMaxDifficulty(maxD);
        setRadius(rad);
        setPosition(pos);
    }

    useEffect(() => {
        resetForm();
    }, [prov, cit, maxA, minA, maxL, minL, maxE, minE, minD, maxD, rad, pos])

    const deleteAllFilters = () => {
        setProvince("");
        setCity("");
        setMaxAscent("");
        setMinAscent("");
        setMaxLength("");
        setMinLength("");
        setMaxExpectedTime("");
        setMinExpectedTime("");
        setMinDifficulty("Tourist");
        setMaxDifficulty("Professional Hiker");
        setRadius("");
        setPosition(undefined);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setProvinceFilter(province);
        setCityFilter(city);
        setMaxAscentFilter(maxAscent);
        setMinAscentFilter(minAscent);
        setMaxLengthFilter(maxLength);
        setMinLengthFilter(minLength);
        setMaxExpectedTimeFilter(maxExpectedTime);
        setMinExpectedTimeFilter(minExpectedTime);
        setMinDifficultyFilter(minDifficulty);
        setMaxDifficultyFilter(maxDifficulty);
        setRadiusFilter(radius);
        setPositionFilter(position);
        setSeeFilters(false)
    };

    return (
        <>
            <Form className="filterForm" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <FormElement
                            label="Province"
                            onChange={(ev) => setProvince(ev.target.value.toUpperCase().replace(/[^a-z]/gi, ''))}
                            type="text"
                            placeholder="Insert province code"
                            value={province}
                            maxLength={2}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
                        <FormElement
                            label="City"
                            onChange={(ev) => setCity(ev.target.value.replace(/[^a-z\s]/gi, ''))}
                            type="text"
                            placeholder="Insert city"
                            value={city}
                        />
                    </Col>
                </Row>
                <div style={{ height: 20 }}></div>

                <Form.Group>
                    <Row style={{ height: 10 }}></Row>
                    <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11} >
                        <FormElement
                            label="Radius (km)"
                            onChange={(ev) => setRadius(ev.target.value)}
                            type="number"
                            placeholder={"Insert maximum distance from the selected point"}
                            value={radius}
                        />
                    </Col>
                    <Row style={{ height: 5 }}></Row>

                    <Row>
                        <Col xs={12} sm={12} md={11} lg={11} xl={11} xxl={11} >
                            <CliccableMap
                                setPosition={setPosition}
                                position={position}
                            />
                        </Col>
                    </Row>

                </Form.Group>

                <div style={{ height: 30 }}></div>

                <Row>

                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MaxMinRange
                            label={"Ascent (m): "}
                            setMax={setMaxAscent}
                            setMin={setMinAscent}
                            max={maxAscent}
                            min={minAscent}
                            rangeMax={7000}
                            rangeMin={0}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
                        <MaxMinRange
                            label={"Length (km): "}
                            setMax={setMaxLength}
                            setMin={setMinLength}
                            max={maxLength}
                            min={minLength}
                            rangeMax={30}
                            rangeMin={0}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MaxMinRange
                            label={"Expected time (min): "}
                            setMax={setMaxExpectedTime}
                            setMin={setMinExpectedTime}
                            max={maxExpectedTime}
                            min={minExpectedTime}
                            rangeMax={600}
                            rangeMin={0}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }} xxl={{ span: 5, offset: 1 }}>
                        <DifficultyRange
                            label="Difficulty:"
                            setMin={setMinDifficulty}
                            setMax={setMaxDifficulty}
                            min={minDifficulty}
                            max={maxDifficulty}
                        />
                    </Col>
                </Row>
                <Row style={{ height: 40 }}></Row>
                <Row>
                    <div className='rowC'>
                        <Button type="submit" variant="outline-success" style={{ width: 100, borderWidth: 3 }}>Confirm</Button>
                        <Button variant="outline-danger" style={{ width: 100, borderWidth: 3, marginLeft: 20 }} onClick={deleteAllFilters}>Delete</Button>
                    </div>
                </Row>
                <div style={{ height: 40 }}></div>
            </Form>
        </>

    );
}

function FormElement({ label, onChange, type, placeholder, textBoxWidth, value, step, maxLength }) {

    return (
        <Form.Group>
            <Form.Label className="formLabel">{label}</Form.Label>
            <Form.Control
                value={value}
                style={{ width: textBoxWidth, color: "#495057" }}
                placeholder={placeholder}
                onChange={onChange}
                maxLength={maxLength}
                type={type}
                step={step}
                size="sm"

            ></Form.Control>
        </Form.Group>
    );
}


function MaxMinRange({ label, setMax, setMin, max, min, rangeMax, rangeMin }) {

    return (
        <Form.Group column={false}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                    <Form.Label style={{ paddingLeft: 10 }} className="formLabel">{label}</Form.Label>
                </Col>
            </Row>
            <Row style={{ marginLeft: 5 }}>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                    {"Min: " + (min ? min : rangeMin)}
                </Col>
                <Col style={{ textAlign: "right" }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                    {"Max: " + (max ? max : rangeMax + "+")}
                </Col>
            </Row>
            <Row style={{ marginLeft: 5, marginBottom: 20 }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                    <Range min={rangeMin} max={rangeMax} allowCross={false} value={[min ? min : rangeMin, max ? max : rangeMax]} onChange={(range) => {
                        setMin(range[0] === rangeMin ? "" : range[0]);
                        setMax(range[1] === rangeMax ? "" : range[1]);
                    }} />
                </Col>
            </Row>
        </Form.Group>
    );
}


function DifficultyRange({ label, min, max, setMin, setMax }) {

    const numToDiff = (num) => {
        switch (num) {
            case 0:
                return "Tourist"
            case 1:
                return "Hiker"
            case 2:
                return "Professional Hiker"
        }
    }

    const diffToNum = (diff) => {
        switch (diff) {
            case "Tourist":
                return 0;
            case "Hiker":
                return 1;
            case "Professional Hiker":
                return 2;
        }
    }

    return (
        <Form.Group>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                    <Form.Label style={{ paddingLeft: 10 }} className="formLabel">{label}</Form.Label>
                </Col>
            </Row>
            <Row style={{ marginLeft: 5 }}>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                    {"Min: " + (min === "Professional Hiker" ? "P. H.iker" : min)}
                </Col>
                <Col style={{ textAlign: "right" }} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                    {"Max: " + (max === "Professional Hiker" ? "P. Hiker" : max)}
                </Col>
            </Row>
            <Row style={{ marginLeft: 5, marginBottom: 20 }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                    <Range
                        tipProps={{ placement: 'none' }}
                        min={0}
                        max={2}
                        allowCross={false}
                        value={[diffToNum(min), diffToNum(max)]}
                        marks={
                            {
                                0: "Tourist",
                                1: "Hiker",
                                2: "P. Hiker"
                            }
                        }
                        onChange={(range) => {
                            setMin(numToDiff(range[0]));
                            setMax(numToDiff(range[1]));
                        }}
                    />
                </Col>
            </Row>
        </Form.Group>
    );
}


export { Home };