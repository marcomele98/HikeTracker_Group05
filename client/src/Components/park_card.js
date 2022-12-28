import { Row, ListGroupItem } from "react-bootstrap";
import { ClickableOpacity } from "./clickableOpacity";
import { useNavigate } from 'react-router-dom';
import "../App.css"

const ParkCard = ({ p, user }) => {
    const navigate = useNavigate();
    return (
        <ListGroupItem style={{ height: 150, opacity: "85%" }} key={p.id} className="m-3 border-2 rounded-3 shadow">
                <Row>
                    <div className="title">{p.name}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{p.region}</div>
                </Row>
                <Row>
                    <div className="textGrayPrimary">{p.city + " (" + p.province + ")"}</div>
                </Row>
                {(user && (user.role === "local guide" || user.role === "hiker")) ?
                    <Row style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
                        <div className="touchableOpacityWithTextContainer">
                            <ClickableOpacity
                                onClick={() => {
                                    navigate("/parkingLot/" + p.id)
                                }}>
                                <div className="seeMore">
                                    see more
                                </div>
                            </ClickableOpacity>
                        </div>
                    </Row>
                    : false
                }
        </ListGroupItem>
    )
}

export { ParkCard };