import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { NavigationBar } from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginForm } from "./Components/LoginComponents";
import { ToastContainer } from "react-toastify";
import { Home } from "./Components/home";
import { HikePage } from "./Components/HikePage";
import { NewUserForm } from "./Components/NewUserForm";
import ParkingForm from "./Components/ParkingForm"
import HikeForm from "./Components/HikeForm";
import { ListParkings } from "./Components/ListParkings";
import { ParkingPage } from "./Components/ParkingPage";
import { ClickableOpacity } from "./Components/clickableOpacity";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";



const RoutesManager = ({
    doLogin,
    loggedIn,
    doLogout,
    isLoading,
    setIsLoading,
    user,
    addUser,
    log,
    setLog
}) => {
    const [selected, setSelected] = useState("hikes")
    const navigate = useNavigate()
    return (
        <div className="container-fluid">
            <div className={isLoading ? "loading-overlay" : ""} />
            <ToastContainer />
            <Row>
                <NavigationBar
                    logout={doLogout}
                    loggedIn={loggedIn}
                    log={log}
                    setLog={setLog}
                />
            </Row>

            <Row>
                <Col className= "navigationLinkContainer">
                    <ClickableOpacity
                        onClick={() => {
                            navigate("/home");
                            setSelected("hikes");
                        }}>
                        <div className={selected==="hikes"?"navigationLinkSelected":"navigationLinkUnselected"}>
                            Hikes
                        </div>
                    </ClickableOpacity>
                </Col>

                <Col className= "navigationLinkContainer">
                    <ClickableOpacity
                        onClick={() => {
                            navigate("/parkingLots");
                            setSelected("parks");
                        }}>
                        <div className={selected==="parks"?"navigationLinkSelected":"navigationLinkUnselected"}>
                            Parking Lots
                        </div>
                    </ClickableOpacity>
                </Col>

                <Col className= "navigationLinkContainer">
                    <ClickableOpacity
                        onClick={() => {
                            navigate("/parkingLots");
                            setSelected("huts");
                        }}>
                        <div  className={selected==="huts"?"navigationLinkSelected":"navigationLinkUnselected"}>
                            Huts
                        </div>
                    </ClickableOpacity>
                </Col>
            </Row>

            <Row>
                <Routes>
                    <Route
                        path="/home"
                        element={<Home setIsLoading={setIsLoading} user={user} />}
                    />

                    <Route
                        path="/login"
                        element={<LoginForm login={doLogin} />}
                    />

                    <Route
                        path="/Register"
                        element={<NewUserForm addUser={addUser} loggedIn={loggedIn} log={log} setLog={setLog} />}
                    />

                    <Route
                        path="/hike/:hikeId"
                        element={<HikePage setIsLoading={setIsLoading} loggedIn={loggedIn} user={user} />}
                    />


                    <Route
                        path="/new-hike"
                        element={<HikeForm user={user} setIsLoading={setIsLoading} />}
                    />

                    <Route
                        path="/new-parking"
                        element={<ParkingForm user={user} setIsLoading={setIsLoading} />}
                    />

                    <Route
                        path="/parkingLots"
                        element={<ListParkings setIsLoading={setIsLoading} loggedIn={loggedIn} user={user} />}
                    />

                    <Route
                        path="/parkingLot/:parkId"
                        element={<ParkingPage setIsLoading={setIsLoading} loggedIn={loggedIn} user={user} />}
                    />

                    <Route path="/*"
                        element={<Navigate to="/home" />} />
                    {" "}

                </Routes>
            </Row>
        </div>
    );
};

export default RoutesManager;