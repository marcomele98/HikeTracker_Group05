import { GiMountaintop } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Navbar, NavDropdown }  from 'react-bootstrap';
import '../App.css';

function NavigationBar(props) {

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Navbar className="fixed-top" style={{ backgroundColor: 'black', width: "100%", paddingLeft: 0, paddingRight: 0, margin: 0 }} collapseOnSelect expand="lg" bg="success" variant="dark">



      <Navbar.Brand className="navbar-brand">
        <GiMountaintop style={{ marginLeft: 20, marginRight: 10 }} size={30} ></GiMountaintop>
        <h3 style={{ lineHeight: 1, padding: 0, margin: 0, marginRight: 20 }}>
          HikeTracker
        </h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: 20 }} />
      <Navbar.Collapse id="responsive-navbar-nav" style={{ marginLeft: 20 }}>

        <Nav variant="success" className="me-auto" >
          {props.user?.role === "local guide" || props.user?.role === "hiker" ?
            <>
              {props.user?.role === "hiker" 
              ?
                <NavDropdown title="Hikes" active={location?.pathname === "/home" || location?.pathname === "/completed-hikes"  || location?.pathname === "/started-hikes"} id="basic-nav-dropdown" style={{ fontSize: 18 }}>
                  <NavDropdown.Item className='dropdown-item:hover' style={{backgroundColor : location?.pathname === "/home" ? "#198754" : false, color : location?.pathname === "/home" ? "white" : false, }} active={location?.pathname === "/home"} onClick={() => navigate('/home')}>All Hikes</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item className='dropdown-item:hover' style={{backgroundColor : location?.pathname === "/completed-hikes" ? "#198754" : false, color : location?.pathname === "/completed-hikes" ? "white" : false, }} onClick={() => navigate('/completed-hikes')}>Completed</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item className='dropdown-item:hover' style={{backgroundColor : location?.pathname === "/started-hikes" ? "#198754" : false, color : location?.pathname === "/started-hikes" ? "white" : false, }} onClick={() => navigate('/started-hikes')}>Started</NavDropdown.Item>
                </NavDropdown>
              :
                <Nav.Link style={{ fontSize: 18 }} active={location?.pathname === "/home"} onClick={() => navigate('/home')}>Hikes</Nav.Link>
              }
              <Nav.Link style={{ fontSize: 18 }} active={location?.pathname === "/huts"} onClick={() => navigate('/huts')}>Huts</Nav.Link>
              <Nav.Link style={{ fontSize: 18 }} active={location?.pathname === "/parkingLots"} onClick={() => navigate('/parkingLots')}>Parking Lots</Nav.Link>
            </>
            : undefined
          }
        </Nav>
        <Nav style={{ marginRight: 20 }}>
          {props.loggedIn ? (
            <Nav.Link style={{ fontSize: 18 }} onClick={() => { props.logout(); props.setLog(true) }}>Logout</Nav.Link>
          )
            :
            (
              <LoginButtons log={props.log} setLog={props.setLog}/>
            )
          }
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

function LoginButtons (props) {
  const navigate = useNavigate();
  return (
    props.log ?
      <>
        <Nav.Link style={{ fontSize: 18 }} onClick={() => { navigate('/login'); props.setLog(false) }}>Login</Nav.Link>

        <Nav.Link style={{ fontSize: 18 }} onClick={() => { navigate('/Register'); props.setLog(false) }}>Register</Nav.Link>
      </>

      :
      <Nav.Link style={{ fontSize: 18 }} onClick={() => { navigate('/home'); props.setLog(true) }}>Home</Nav.Link>

  );
}

export { NavigationBar };