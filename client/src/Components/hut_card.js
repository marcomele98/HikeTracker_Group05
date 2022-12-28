import { Row, ListGroupItem } from "react-bootstrap";
import { ClickableOpacity } from "./clickableOpacity";
import { useNavigate } from 'react-router-dom';
import "../App.css"

const HutCard = ({ h, user }) => {
    const navigate = useNavigate();
    return (
        <ListGroupItem style={{ height: 170, opacity: "85%" }} key={h.id} className="m-3 border-2 rounded-3 shadow">

            <Row>
                <div className="title">{h.type + " " + h.name}</div>
            </Row>
            <Row>
                <div className="textGrayPrimary">{h.region}</div>
            </Row>
            <Row>
                <div className="textGrayPrimary">{h.city + " (" + h.province + ")"}</div>
            </Row>
            {
                !h.phone
                    ?
                    false
                    :
                    <Row>
                        <div className="textGrayPrimary">{"Phone number: " + h.phone}</div>
                    </Row>
            }
            {
                !h.email
                    ?
                    false
                    :
                    <Row>
                        <div className="textGrayPrimary">{"Email: " + h.email}</div>
                    </Row>
            }
            {(user && (user.role === "local guide" || user.role === "hiker")) ?
                <Row style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
                    <div className="touchableOpacityWithTextContainer">
                        <ClickableOpacity
                            onClick={() => {
                                navigate("/hut/" + h.id)
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

export { HutCard };