import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { NavigationBar } from "./Components/Navbar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { LoginForm } from "./Components/LoginComponents";
import { ToastContainer } from "react-toastify";
import { Home } from "./Components/home";
import { HikePage } from "./Components/HikePage";
import { NewUserForm } from "./Components/NewUserForm";
import ParkingForm from "./Components/ParkingForm"
import HikeForm from "./Components/HikeForm";
import HutForm from "./Components/HutForm";
import { ListParkings } from "./Components/ListParkings";
import { ParkingPage } from "./Components/ParkingPage";
import { ClickableOpacity } from "./Components/clickableOpacity";
import { useNavigate } from 'react-router-dom';
import { ListHuts } from "./Components/ListHuts";
import { HutPage } from './Components/HutPage'


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
    const location = useLocation();
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
                    user={user}
                />
            </Row>
            <br></br>
            <br></br>

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
                        path="/new-hut"
                        element={<HutForm user={user} setIsLoading={setIsLoading} />}
                    />

                    <Route
                        path="/parkingLots"
                        element={<ListParkings setIsLoading={setIsLoading} loggedIn={loggedIn} user={user} />}
                    />

                    <Route
                        path="/parkingLot/:parkId"
                        element={<ParkingPage setIsLoading={setIsLoading} loggedIn={loggedIn} user={user} />}
                    />
                    <Route
                        path="/huts"
                        element={<ListHuts setIsLoading={setIsLoading} user={user} />}
                    />

                    <Route
                        path="/hut/:hutId"
                        element={<HutPage setIsLoading={setIsLoading} user={user} />}
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