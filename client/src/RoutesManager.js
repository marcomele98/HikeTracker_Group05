import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";
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