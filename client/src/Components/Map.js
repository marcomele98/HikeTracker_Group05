import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Polyline, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { ListGroupItem, ListGroup } from "react-bootstrap";
import '../App.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
let gpxParser = require('gpxparser');


const MapMoover = ({position}) => {
    const map = useMapEvents({})

    React.useEffect(() => {
        if ( position !== undefined){
            console.log(position)
            map.flyTo(position, map.getZoom())
        }
    }, [position])
    return <></>
}


const Map = (props) => {
    var gpx;
    const [positions, setPositions] = React.useState();
    React.useEffect(() => {
        gpx = new gpxParser();
        gpx.parse(props.hike.gpx);
        // setPositions({...gpx})
        setPositions(gpx.tracks[0].points.map(p => [p.lat, p.lon]));
    }, [props.hike])
    return (
        (!(props.hike?.gpx) || positions === undefined)
            ?
            <></>
            :
            <ListGroup>

                <ListGroupItem className="m-3 border-2 rounded-3 shadow">
                    <div id='map'>
                        <MapContainer
                            center={positions[Math.floor(positions?.length / 2)]}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ height: "500px" }}
                        >
                            <MapMoover position={{lat:positions[0][0], lng:positions[0][1]}}></MapMoover>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Polyline
                                pathOptions={{ fillColor: 'red', color: 'blue' }}
                                positions={positions}
                            />
                            {props.hike.points.map(p => <Marker key={[p.latitude, p.longitude, p.name, p.altitude]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                console.log(marker)
                                <Popup>
                                    {p.name ? ("Name: " + p.name) : ""} {p.name ? <br /> : false} Latitude: {p.latitude} <br /> Longitude: {p.longitude} <br /> Altitude: {p.altitude + " m"}
                                </Popup>
                            </Marker>)
                            }
                            {props.hike.huts.map(p => <Marker key={[p.latitude, p.longitude, p.name, p.altitude]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                console.log(marker)
                                <Popup>
                                    Name: {p.name} <br /> Latitude: {p.latitude} <br /> Longitude: {p.longitude} <br /> Altitude: {p.altitude + " m"}
                                </Popup>
                            </Marker>)
                            }
                            {props.hike.parking_lots.map(p => <Marker key={[p.latitude, p.longitude, p.name, p.altitude]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                console.log(marker)
                                <Popup>
                                    Name: {p.name} <br /> Latitude: {p.latitude} <br /> Longitude: {p.longitude} <br /> Altitude: {p.altitude + " m"}
                                </Popup>
                            </Marker>)
                            }
                        </MapContainer>
                    </div>
                </ListGroupItem>
            </ListGroup>

    );
}

export default Map;