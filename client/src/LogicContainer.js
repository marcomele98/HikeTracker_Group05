import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./API";
import { toast } from "react-toastify";
import RoutesManager from "./RoutesManager";

const LogicContainer = () => {

    const [loggedIn, setLoggedIn] = useState();
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [log, setLog] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // here you have the user info, if already logged in
                setIsLoading(true);
                const user = await API.getUserInfo();
                setLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            } catch (err) {
                setIsLoading(false);
             }
        };
        checkAuth();
    }, []);


    const doLogin = async (credentials) => {
        try {
            setIsLoading(true);
            const user = await API.logIn(credentials);
            toast.success(`Welcome ${user.name}!`, { position: "top-center" }, { toastId: 1 });
            setLoggedIn(true);
            setUser(user)
            navigate('/');
            setIsLoading(false);
        } catch (err) {
            if (typeof err === 'object') {
                toast.error(err.message === "Failed to fetch" ? "Server error" : "Your email is not verified. Please verify your email", { position: "top-center" }, { toastId: 2 })
            } else {
                toast.error(err==="Username and/or password wrong. Try again." ? err : "Your email is not verified. Please verify your email", { position: "top-center" }, { toastId: 2 });
            }
            setIsLoading(false);
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
    };

    const addUser = (newUser) => {
        const add = async () => {
          await API.addUser(newUser);
        };
        add()
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            toast.error("Error during Register. Try Again.", { position: "top-center" }, { toastId: 6 });
          });
      };

    return (
        <RoutesManager
            doLogin={doLogin}
            loggedIn={loggedIn}
            doLogout={doLogout}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            user = {user}
            addUser = {addUser}
            log={log}
            setLog={setLog}
            setUser={setUser}
        />
    );
};

export default LogicContainer;