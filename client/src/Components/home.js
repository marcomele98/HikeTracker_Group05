import { Row, Container, Col, Form, ListGroupItem, ListGroup, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import { PlusCircle } from "react-bootstrap-icons";
import API from "../API";
import 'rc-slider/assets/index.css';
import { CliccableMap } from "./cliccableMap";
import { calcCrow } from "../utilities";
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


function Home({ setIsLoading, user }) {

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
        getHikesFromServer()
    }, [])


    return (

        <Container>
            {
                user.role !== 'local guide' ?
                    undefined
                    :
                    <>
                        <div className="flex-shrink-0 m-5">
                            <ClickableOpacity onClick={() => navigate("/new-hike")}>
                                <PlusCircle
                                    color="#495057"
                                    size={40}
                                />
                            </ClickableOpacity>
                        </div>
                    </>
            }

            <Row className="filterTitleRow">
                <div className="touchableOpacityWithTextContainer">
                    <ClickableOpacity
                        onClick={() => {
                            setSeeFilters((val) => !val);
                        }}>
                        <div className="filters">
                            {seeFilters ? "Hide Filters" : "Show Filters"}
                        </div>
                    </ClickableOpacity>
                </div>
            </Row>
            {
                seeFilters ?
                    (
                        <FilterForm
                            provinceFilter={province}
                            cityFilter={city}
                            positionFilter={coordinates}
                            radiusFilter={radius}
                            maxAscentFilter={maxAscent}
                            minAscentFilter={minAscent}
                            maxLengthFilter={maxLength}
                            minLengthFilter={minLength}
                            maxExpectedTimeFilter={maxExpectedTime}
                            minExpectedTimeFilter={minExpectedTime}
                            minDifficultyFilter={minDifficulty}
                            maxDifficultyFilter={maxDifficulty}
                            setProvinceFilter={setProvince}
                            setCityFilter={setCity}
                            setPositionFilter={setCoordinates}
                            setRadiusFilter={setRadius}
                            setMaxAscentFilter={setMaxAscent}
                            setMinAscentFilter={setMinAscent}
                            setMaxLengthFilter={setMinLength}
                            setMinLengthFilter={setMaxLength}
                            setMaxExpectedTimeFilter={setMaxExpectedTime}
                            setMinExpectedTimeFilter={setMinExpectedTime}
                            setMinDifficultyFilter={setMinDifficulty}
                            setMaxDifficultyFilter={setMaxDifficulty}
                        ></FilterForm>
                    ) : undefined

            }
            <ListGroup>
                {
                    hikes
                        .filter((h) => {
                            if (province && !h.province.toLocaleLowerCase().includes(province.toLocaleLowerCase())) {
                                return false;
                            }
                            if (city && !h.city.toLocaleLowerCase().includes(city.toLocaleLowerCase())) {
                                return false;
                            }
                            if (maxAscent && maxAscent < h.ascendent_meters) {
                                return false;
                            }
                            if (minAscent && minAscent > h.ascendent_meters) {
                                return false;
                            }
                            if (maxLength && maxLength < h.length_kms) {
                                return false;
                            }
                            if (minLength && minLength > h.length_kms) {
                                return false;
                            }
                            if (maxExpectedTime && maxExpectedTime < h.expected_mins) {
                                return false;
                            }
                            if (minExpectedTime && minExpectedTime > h.expected_mins) {
                                return false;
                            }
                            if (maxDifficulty?.toLowerCase() === "tourist" && h.difficulty.toLowerCase() !== "tourist") {
                                return false;
                            }
                            if (maxDifficulty?.toLowerCase() === "hiker" && h.difficulty.toLowerCase() === "professional hiker") {
                                return false;
                            }
                            if (minDifficulty?.toLowerCase() === "professional hiker" && h.difficulty.toLowerCase() !== "professional hiker") {
                                return false;
                            }
                            if (minDifficulty?.toLowerCase() === "hiker" && h.difficulty.toLowerCase() === "tourist") {
                                return false;
                            }
                            if (coordinates && radius && calcCrow(coordinates.lat, coordinates.lng, h.start_point_lat, h.start_point_lon) > radius) {
                                return false;
                            }
                            return true;
                        })
                        .map((h) => (
                            <ListGroupItem key={h.id} className="m-3 border-2 rounded-3 shadow">
                                <Col>
                                    <Row>
                                        <div className="hikeTitle">{h.title}</div>
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
                                    <Row>
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
                                </Col>
                            </ListGroupItem>
                        ))
                }

            </ListGroup>
        </Container>
    );
}




function FilterForm({
    provinceFilter,
    cityFilter,
    positionFilter,
    radiusFilter,
    maxAscentFilter,
    minAscentFilter,
    maxLengthFilter,
    minLengthFilter,
    maxExpectedTimeFilter,
    minExpectedTimeFilter,
    minDifficultyFilter,
    maxDifficultyFilter,
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
    setMaxDifficultyFilter }) {

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
    const [radius, setRadius] = useState();
    const [position, setPosition] = useState();


    useEffect(() => {
        setProvince(provinceFilter);
        setCity(cityFilter);
        setMaxAscent(maxAscentFilter);
        setMinAscent(minAscentFilter);
        setMaxLength(maxLengthFilter);
        setMinLength(minLengthFilter);
        setMaxExpectedTime(maxExpectedTimeFilter);
        setMinExpectedTime(minExpectedTimeFilter);
        setMinDifficulty(minDifficultyFilter);
        setMaxDifficulty(maxDifficultyFilter);
        setRadius(radiusFilter);
        setPosition(positionFilter);
    }, [])

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
    };

    return (
        <>
            <Form className="filterForm" onSubmit={handleSubmit}>
                <FormElement
                    label="Province:"
                    onChange={(ev) => setProvince(ev.target.value.toUpperCase().replace(/[^a-z]/gi, ''))}
                    type="text"
                    placeholder="TO"
                    value={province}
                    textBoxWidth={35}
                    maxLength={2}
                />
                <FormElement
                    label="City:"
                    onChange={(ev) => setCity(ev.target.value.replace(/[^a-z]/gi, ''))}
                    type="text"
                    placeholder="Tourin"
                    value={city}
                    textBoxWidth={150}
                />
                <div style={{ height: 5 }}></div>
                <Form.Group>
                    <Row>
                        <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                            <div className="formLabel">{"Radius and Position"}</div>
                        </Col>
                    </Row>
                    <Row style={{ height: 10 }}></Row>
                    <FormElement
                        label="Radius (km):"
                        onChange={(ev) => setRadius(ev.target.value)}
                        type="number"
                        value={radius}
                        textBoxWidth={150}
                    />

                    <Row style={{ height: 5 }}></Row>
                    <Row>
                        <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                            <Form.Label className="formLabel">{"Position:"}</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={10} lg={8} xl={5} xxl={3} >
                            <CliccableMap
                                setPosition={setPosition}
                                position={position}
                            />
                        </Col>
                    </Row>

                </Form.Group>

                <div style={{ height: 30 }}></div>

                <MaxMinRange
                    label={"Ascent (m): "}
                    setMax={setMaxAscent}
                    setMin={setMinAscent}
                    max={maxAscent}
                    min={minAscent}
                    rangeMax={7000}
                    rangeMin={0}
                />

                <MaxMinRange
                    label={"Length (km): "}
                    setMax={setMaxLength}
                    setMin={setMinLength}
                    max={maxLength}
                    min={minLength}
                    rangeMax={30}
                    rangeMin={0}
                />

                <MaxMinRange
                    label={"Expected time (min): "}
                    setMax={setMaxExpectedTime}
                    setMin={setMinExpectedTime}
                    max={maxExpectedTime}
                    min={minExpectedTime}
                    rangeMax={600}
                    rangeMin={0}
                />

                <DifficultyRange
                    label="Difficulty:"
                    setMin={setMinDifficulty}
                    setMax={setMaxDifficulty}
                    min={minDifficulty}
                    max={maxDifficulty}
                />
                <Row style={{ height: 30 }}></Row>
                <div>
                    <ClickableOpacity type='submit' className="marginRight1">
                        <div className="formConfirm">
                            Confirm filters
                        </div>
                    </ClickableOpacity>
                </div>
                <div style={{ height: 40 }}></div>
            </Form>
        </>

    );
}

function FormElement({ label, onChange, type, placeholder, textBoxWidth, value, step, maxLength }) {

    return (
        <Form.Group>
            <Row>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Form.Label className="formLabel">{label}</Form.Label>
                </Col>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
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
                </Col>
            </Row>
        </Form.Group>
    );
}


function MaxMinRange({ label, setMax, setMin, max, min, rangeMax, rangeMin }) {

    return (
        <Form.Group>
            <Row>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Form.Label className="formLabel">{label}</Form.Label>
                </Col>
            </Row>
            <Row style={{ marginLeft: 5 }}>
                <Col xs={4} sm={3} md={2} lg={1} xl={1} xxl={1} >
                    <div>{"Min: " + (min ? min : rangeMin)}</div>
                </Col>
                <Col xs={4} sm={3} md={2} lg={2} xl={2} xxl={2} >
                    <div>{"Max: " + (max ? max : rangeMax + "+")}</div>
                </Col>
            </Row>
            <Row style={{ marginLeft: 5, marginBottom: 20 }}>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Range min={rangeMin} max={rangeMax} allowCross={false} defaultValue={[rangeMin, rangeMax]} onAfterChange={(range) => {
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

    return (
        <Form.Group>
            <Row>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Form.Label className="formLabel">{label}</Form.Label>
                </Col>
            </Row>
            <Row style={{ marginLeft: 5 }}>
                <Col xs={4} sm={3} md={2} lg={1} xl={1} xxl={1} >
                    <div>{"Min: " + (min === "Professional Hiker" ? "Prof. Hiker" : min)}</div>
                </Col>
                <Col xs={5} sm={4} md={3} lg={3} xl={3} xxl={3} >
                    <div>{"Max: " + (max === "Professional Hiker" ? "Prof. Hiker" : max)}</div>
                </Col>
            </Row>
            <Row style={{ marginLeft: 5, marginBottom: 20 }}>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Range
                        tipProps={{ placement: 'none' }}
                        min={0}
                        max={2}
                        allowCross={false}
                        defaultValue={[0, 2]}
                        marks={
                            {
                                0: "Tourist",
                                1: "Hiker",
                                2: "Prof. Hiker"
                            }
                        }
                        onAfterChange={(range) => {
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