import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";
import { NavigationBar } from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginForm } from "./Components/LoginComponents";
import { ToastContainer } from "react-toastify";
import HikeForm from "./HikeForm";



const RoutesManager = ({
    doLogin,
    loggedIn,
    doLogout,
    user
}) => {

    return (
        <div className="container-fluid">
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
                    />

                    <Route
                        path="/login"
                        element={<LoginForm login={doLogin} />}
                    />

                    <Route path="/*" 
                    element={<Navigate to="/home" />} />
                    {" "}
                    
                    <Route
                        path="/new-hike"
                        element={<HikeForm user={user}/>}
                    >

                    </Route>
                </Routes>
            </Row>
        </div>
    );
};

export default RoutesManager;