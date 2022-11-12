import { Row, Container, Col, Form, ListGroupItem, ListGroup, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickableOpacity } from "./clickableOpacity";
import { toast } from "react-toastify";
import API from "../API";

function Home({setIsLoading}) {

    const [seeFilters, setSeeFilters] = useState(false);
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [maxAscent, setMaxAscent] = useState("");
    const [minAscent, setMinAscent] = useState("");
    const [maxLength, setMaxLength] = useState("");
    const [minLength, setMinLength] = useState("");
    const [maxExpectedTime, setMaxExpectedTime] = useState("");
    const [minExpectedTime, setMinExpectedTime] = useState("");
    const [minDifficulty, setMinDifficulty] = useState("");
    const [maxDifficulty, setMaxDifficulty] = useState("");
    const [hikes, setHikes] = useState([ //When backend will be done here I'll put an epmty array
        {
            id: 1,
            title: "ROCCIAMELONE",
            length_kms: 9,
            expected_mins: 420,
            ascendent_meters: 3538,
            difficulty: "Professional Hiker",
            region: "TO",
            city: "Mompantero",
            gpx: "gpx content",
            lg_id: 1,
            end_point_type: "point",
            end_point: 2,
            start_point_type: "parking_lot",
            start_point: 1
        },
        {
            id: 2,
            title: "Salita al Monte Antoroto",
            length_kms: 17,
            expected_mins: 444,
            ascendent_meters: 400,
            difficulty: "Professional Hiker",
            region: "CN",
            city: "Garessio",
            gpx: "gpx content",
            lg_id: 1,
            end_point_type: "parking_lot",
            end_point: 3,
            start_point_type: "hut",
            start_point: 1
        }]);
    const navigate = useNavigate();

    useEffect(()=>{
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
                            regionFilter={region}
                            cityFilter={city}
                            maxAscentFilter={maxAscent}
                            minAscentFilter={minAscent}
                            maxLengthFilter={minLength}
                            minLengthFilter={minLength}
                            maxExpectedTimeFilter={maxExpectedTime}
                            minExpectedTimeFilter={minExpectedTime}
                            minDifficultyFilter={minDifficulty}
                            maxDifficultyFilter={maxDifficulty}
                            setRegionFilter={setRegion}
                            setCityFilter={setCity}
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
                            if (region && !h.region.toLocaleLowerCase().includes(region.toLocaleLowerCase())) {
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
                            return true;
                        })
                        .map((h) => (
                            <ListGroupItem key={h.id} className="m-3 border-2 rounded-3 shadow">
                                <Col>
                                    <Row>
                                        <div className="hikeTitle">{h.title}</div>
                                    </Row>
                                    <Row>
                                        <div className="textGrayPrimary">{h.city + " (" + h.region + ")"}</div>
                                    </Row>
                                    <Row>
                                        <div className="textGrayPrimary">{"Ascendent: " + h.ascendent_meters + " m"}</div>
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
    regionFilter,
    cityFilter,
    maxAscentFilter,
    minAscentFilter,
    maxLengthFilter,
    minLengthFilter,
    maxExpectedTimeFilter,
    minExpectedTimeFilter,
    minDifficultyFilter,
    maxDifficultyFilter,
    setRegionFilter,
    setCityFilter,
    setMaxAscentFilter,
    setMinAscentFilter,
    setMaxLengthFilter,
    setMinLengthFilter,
    setMaxExpectedTimeFilter,
    setMinExpectedTimeFilter,
    setMinDifficultyFilter,
    setMaxDifficultyFilter }) {

    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [maxAscent, setMaxAscent] = useState("");
    const [minAscent, setMinAscent] = useState("");
    const [maxLength, setMaxLength] = useState("");
    const [minLength, setMinLength] = useState("");
    const [maxExpectedTime, setMaxExpectedTime] = useState("");
    const [minExpectedTime, setMinExpectedTime] = useState("");
    const [minDifficulty, setMinDifficulty] = useState("");
    const [maxDifficulty, setMaxDifficulty] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const resetForm = () => {
        setRegion(regionFilter);
        setCity(cityFilter);
        setMaxAscent(maxAscentFilter);
        setMinAscent(minAscentFilter);
        setMaxLength(maxLengthFilter);
        setMinLength(minLengthFilter);
        setMaxExpectedTime(maxExpectedTimeFilter);
        setMinExpectedTime(minExpectedTimeFilter);
        setMinDifficulty(minDifficultyFilter);
        setMaxDifficulty(maxDifficultyFilter);
    }

    useEffect(() => {
        resetForm();
    }, [])

    const deleteAllFilters = () => {
        setRegion("");
        setCity("");
        setMaxAscent("");
        setMinAscent("");
        setMaxLength("");
        setMinLength("");
        setMaxExpectedTime("");
        setMinExpectedTime("");
        setMinDifficulty("");
        setMaxDifficulty("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation
        if (maxAscent && minAscent && maxAscent < minAscent) {
            console.log(maxAscent, minAscent, maxAscent < minAscent)
            setErrorMsg("Errore: Max. Asc. can't be minor than Min. Asc.");
            return
        }
        if (maxLength && minLength && maxLength < minLength) {
            setErrorMsg("Errore: Max. Len. can't be minor than Min. Len.");
            return
        }
        if (maxExpectedTime && minExpectedTime && maxExpectedTime < minExpectedTime) {
            setErrorMsg("Errore: Max. Time can't be minor than Min. Time");
            return
        }
        if (maxDifficulty && minDifficulty && (
            (maxDifficulty === "Hiker" && minDifficulty === "Professional Hiker") || (maxDifficulty === "Tourist" && (
                minDifficulty === "Professional Hiker" || minDifficulty === "Hiker")))) {
            setErrorMsg("Errore: Max. Diff. can't be minor than Min. Diff");
            return
        }
        setRegionFilter(region);
        setCityFilter(city);
        setMaxAscentFilter(maxAscent);
        setMinAscentFilter(minAscent);
        setMaxLengthFilter(maxLength);
        setMinLengthFilter(minLength);
        setMaxExpectedTimeFilter(maxExpectedTime);
        setMinExpectedTimeFilter(minExpectedTime);
        setMinDifficultyFilter(minDifficulty);
        setMaxDifficultyFilter(maxDifficulty);
    };

    return (
        <>
            {errorMsg ? (
                <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
                    {errorMsg}
                </Alert>
            ) : (
                false
            )}
            <Form className="filterForm" onSubmit={handleSubmit}>
                <FormElement
                    label="Province:"
                    onChange={(ev) => setRegion(ev.target.value.toUpperCase().replace(/[^a-z]/gi, ''))}
                    type="text"
                    placeholder="TO"
                    value={region}
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
                <FormElement
                    label="Max. Asc. (m):"
                    value={maxAscent}
                    onChange={(ev) => {
                            if(ev.target.value)
                                setMaxAscent(parseInt(ev.target.value))
                            else
                                setMaxAscent(ev.target.value)
                        }
                    }
                    type="number"
                    textBoxWidth={150}
                />
                <FormElement
                    label="Min. Asc. (m):"
                    value={minAscent}
                    onChange={(ev) => {
                        if(ev.target.value)
                            setMinAscent(parseInt(ev.target.value))
                        else
                            setMinAscent(ev.target.value)
                    }
                }
                    type="number"
                    textBoxWidth={150}
                />
                <FormElement
                    label="Max. Len. (km):"
                    value={maxLength}
                    onChange={(ev) => {
                        if(ev.target.value)
                            setMaxLength(parseFloat(ev.target.value))
                        else
                            setMaxLength(ev.target.value)
                    }
                }
                    type="number"
                    step="0.01"
                    textBoxWidth={150}
                />
                <FormElement
                    label="Min. Len. (km):"
                    value={minLength}
                    onChange={(ev) => {
                        if(ev.target.value)
                            setMinLength(parseFloat(ev.target.value))
                        else
                            setMinLength(ev.target.value)
                    }
                }
                    type="number"
                    textBoxWidth={150}
                />
                <FormElement
                    label="Max. Time (min):"
                    value={maxExpectedTime}
                    onChange={(ev) => {
                        if(ev.target.value)
                            setMaxExpectedTime(parseInt(ev.target.value))
                        else
                            setMaxExpectedTime(ev.target.value)
                    }
                }
                    type="number"
                    step="0.01"
                    textBoxWidth={150}
                />
                <FormElement
                    label="Min. Time (min):"
                    value={minExpectedTime}
                    onChange={(ev) => {
                        if(ev.target.value)
                            setMinExpectedTime(parseInt(ev.target.value))
                        else
                            setMinExpectedTime(ev.target.value)
                    }
                }
                    type="number"
                    textBoxWidth={150}
                />
                <DiffSelector
                    label="Max. Diff."
                    value={maxDifficulty}
                    onChange={(ev) => setMaxDifficulty(ev.target.value)}
                />
                <DiffSelector
                    label="Min. Diff:"
                    value={minDifficulty}
                    onChange={(ev) => setMinDifficulty(ev.target.value)}
                />
                <div>
                    <ClickableOpacity type='submit' className="marginRight1">
                        <div className="formConfirm">
                            Confirm
                        </div>
                    </ClickableOpacity>
                </div>
                <div>
                    <ClickableOpacity onClick={deleteAllFilters}>
                        <div className="formDelete">
                            Delete
                        </div>
                    </ClickableOpacity>
                </div>
                <div>
                    <ClickableOpacity onClick={resetForm}>
                        <div className="formCancel">
                            Cancel
                        </div>
                    </ClickableOpacity>
                </div>
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


function DiffSelector({ label, value, onChange }) {

    return (
        <Form.Group>
            <Row>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Form.Label className="formLabel">{label}</Form.Label>
                </Col>
                <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2} >
                    <Form.Select value={value} style={{ width: 150, color: "#495057" }} size="sm" onChange={onChange}>
                        <option value="">{""}</option>
                        <option value="Tourist">Tourist</option>
                        <option value="Hiker">Hiker</option>
                        <option value="Professional Hiker">Prof. Hiker</option>
                    </Form.Select>
                </Col>
            </Row>
        </Form.Group>
    );
}


export { Home };