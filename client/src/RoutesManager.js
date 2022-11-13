import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";
import { NavigationBar } from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginForm } from "./Components/LoginComponents";
import { ToastContainer } from "react-toastify";
import { Home } from "./Components/home"
import { HikePage } from "./Components/HikePage"
import HikeForm from "./Components/HikeForm";



const RoutesManager = ({
    doLogin,
    loggedIn,
    doLogout,
    isLoading,
    setIsLoading,
    user
}) => {

    return (
        <div className="container-fluid">
            <div className={isLoading ? "loading-overlay" : ""} />
            <ToastContainer />
            <Row>
                <NavigationBar
                    logout={doLogout}
                    loggedIn={loggedIn}
                />
            </Row>
            <Row>
                <Routes>
                    <Route
                        path="/home"
                        element={<Home setIsLoading={setIsLoading} user={user}/>}
                    />

                    <Route
                        path="/login"
                        element={<LoginForm login={doLogin} />}
                    />

                    <Route
                        path="/hike/:hikeId"
                        element={<HikePage setIsLoading={setIsLoading} user={user}/>}
                    />

                    <Route path="/*"
                        element={<Navigate to="/home" />} />
                    {" "}
                    
                    <Route
                        path="/new-hike"
                        element={<HikeForm user={user} setIsLoading={setIsLoading}/>}
                    >

                    </Route>
                </Routes>
            </Row>
        </div>
    );
};

export default RoutesManager;