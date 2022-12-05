import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Polyline, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { ListGroupItem, ListGroup } from "react-bootstrap";
import '../App.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
let gpxParser = require('gpxparser');


const MapMoover = ({ position }) => {
    const map = useMapEvents({})

    React.useEffect(() => {
        if (position !== undefined) {
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
                            style={{ height: "400px" }}
                        >
                            <MapMoover position={{ lat: positions[0][0], lng: positions[0][1] }}></MapMoover>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Polyline
                                pathOptions={{ fillColor: 'red', color: 'blue' }}
                                positions={positions}
                            />
                            {props.hike.points.map(p => <Marker key={[p.latitude, p.longitude, p.name, p.altitude]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                <Popup>
                                    {p.name ? ("Name: " + p.name) : ""} {p.name ? <br /> : false} {p.address ? ("Address: " + p.address) : ""} {p.address ? <br /> : false} Latitude: {p.latitude} <br /> Longitude: {p.longitude} <br /> Altitude: {p.altitude + " m"}
                                </Popup>
                            </Marker>)
                            }
                            {props.hike.huts.map(p => <Marker key={[p.latitude, p.longitude, p.name, p.altitude]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                <Popup>
                                    Name: {p.name} <br /> Latitude: {p.latitude} <br /> Longitude: {p.longitude} <br /> Altitude: {p.altitude + " m"}
                                </Popup>
                            </Marker>)
                            }
                            {props.hike.parking_lots.map(p => <Marker key={[p.latitude, p.longitude, p.name, p.altitude]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
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


const MapEvents = ({ selected, setSelected, clearAddress }) => {
    const map = useMapEvents({
        click: (e) => {
            if (selected && (e.latlng.lat !== selected.lat || e.latlng.lng !== selected.lon)){
                setSelected("")
                clearAddress()
            }
        }
    })
    return <></>
}


const SelectorMap = ({ onClick, positions, setPositions, clearAddress }) => {
    const [selected, setSelected] = React.useState();
    const [points, setPoints] = React.useState([])

    React.useEffect(()=>{
        const maxHalfLength = 500;
        const ratio = (positions.length / maxHalfLength).toFixed();
        const filtered_positions =  positions.filter((el, i) => ratio<=2 || i%(ratio*2) == 0)
        setPoints(filtered_positions);
    }, [])

    const blueIconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    const greenIconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"

    return (
        <>

            {(!(positions))
                ?
                <></>
                :
                <ListGroup>

                    <ListGroupItem className="m-3 border-2 rounded-3 shadow">
                        <div id='map'>
                            <MapContainer
                                center={positions[0]}
                                zoom={13}
                                scrollWheelZoom={true}
                                style={{ height: "400px" }}
                            >
                                <MapEvents selected={selected} setSelected={setSelected} clearAddress={clearAddress}/>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Polyline
                                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                                    positions={positions}
                                />
                                {
                                    points
                                        .filter(p => (!selected || (selected.lat === p.lat && selected.lon === p.lon)))
                                        .map((p, i) =>
                                            <Marker
                                                key={i + 1}
                                                position={[p.lat, p.lon, p.ele]}
                                                eventHandlers={{
                                                    click: (e) => {
                                                        setSelected(p)
                                                        onClick(p)
                                                    }
                                                }}
                                                icon={new Icon({ iconUrl: selected ? greenIconUrl : blueIconUrl, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                                <Popup>
                                                    {p.name ? ("Name: " + p.name) : ""} {p.name ? <br /> : false} {"'" + p.lat + "', '" + p.lon + "', '" + p.ele + "', "}
                                                </Popup>
                                            </Marker>)
                                }
                            </MapContainer>
                        </div>
                    </ListGroupItem>
                </ListGroup>
            }
        </>
    );
}

export { Map, SelectorMap };
