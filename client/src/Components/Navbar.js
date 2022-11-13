import { Navbar } from "react-bootstrap";
import { Bicycle } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NavigationBar(props) {

  const [log, setLog] = useState(true);

  const navigate = useNavigate()

  return (
    <Navbar className="d-flex flex-row justify-content-between" bg="success">
      <div style={{ flex: 0.6 , paddingLeft: "1%",}} className="d-flex flex-row">
        <div
          style={{
            paddingLeft: "1%",
            fontWeight: "500",
            fontSize: 22,
            color: "White",
          }}
        >Hike Tracker</div>
      </div>
      <div>
        {props.loggedIn ? (
          <Button variant="success" size="lg" onClick={()=>{props.logout(); setLog(true)}}>Logout</Button>
        )
          :
          (
            log ?
              <Button variant="success" size="lg" onClick={() => {navigate('/login'); setLog(false)}}>Login</Button>
              :
              <Button  variant="success" size="lg" onClick={() => {navigate('/home'); setLog(true)}}>Home</Button>
          )
        }
      </div>
    </Navbar>
  );
}

export { NavigationBar };