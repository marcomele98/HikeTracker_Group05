import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./API";
import { toast } from "react-toastify";
import RoutesManager from "./RoutesManager";

const LogicContainer = () => {

    const [loggedIn, setLoggedIn] = useState();
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // here you have the user info, if already logged in
                const user = await API.getUserInfo();
                setLoggedIn(true);
                setUser(user);
            } catch (err) { }
        };
        checkAuth();
    }, []);


    const doLogin = async (credentials) => {
        try {
            const user = await API.logIn(credentials);
            toast.success(`Welcome ${user.name}!`, { position: "top-center" }, { toastId: 1 });
            setLoggedIn(true);
            setUser(user)
            navigate('/');
        } catch (err) {
            toast.error(err, { position: "top-center" }, { toastId: 2 });
        }
    };


    const doLogout = async () => {
        try {
            await API.logOut();
            toast.success("Logout done successfully.", { position: "top-center" }, { toastId: 3 });
        } catch {
            toast.error("Error during logout. Try Again.", { position: "top-center" }, { toastId: 4 });
        }
        //resettare lo stato dell'applicazione
        setLoggedIn(false);
        setUser({});
        // navigate("/");
    };

    return (
        <RoutesManager
            doLogin={doLogin}
            loggedIn={loggedIn}
            doLogout={doLogout}
        />
    );
};

export default LogicContainer;