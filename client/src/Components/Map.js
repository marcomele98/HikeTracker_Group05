import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import '../App.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
let gpxParser = require('gpxparser');


const Map = (props) => {
    var gpx;
    const [positions, setPositions] = React.useState();
    React.useEffect(()=>{
        gpx = new gpxParser();
        gpx.parse(props.hike.gpx);
        // setPositions({...gpx})
        setPositions(gpx.tracks[0].points.map(p => [p.lat, p.lon]));
    },[props.hike])
    return (
        (!(props.hike?.gpx) || positions===undefined) 
        ?
        <></>
        :
        <>
            <div id='map'>
                <MapContainer
                    center={positions[Math.floor(positions?.length/2)]}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: "500px" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polyline
                        pathOptions={{ fillColor: 'red', color: 'blue' }}
                        positions={positions}
                    />
                    {props.hike.points.map(p => <Marker key={[p.latitude, p.longitude, p.name]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        console.log(marker)
                        <Popup>
                            Name: {p.name} <br /> lat: {p.latitude} <br /> lon: {p.longitude}
                        </Popup>
                    </Marker>)
                    }
                    {props.hike.huts.map(p => <Marker key={[p.latitude, p.longitude, p.name]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        console.log(marker)
                        <Popup>
                        Name: {p.name} <br /> lat: {p.latitude} <br /> lon: {p.longitude}
                        </Popup>
                    </Marker>)
                    }
                    {props.hike.parking_lots.map(p => <Marker key={[p.latitude, p.longitude, p.name]} position={[p.latitude, p.longitude, p.name]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        console.log(marker)
                        <Popup>
                        Name: {p.name} <br /> lat: {p.latitude} <br /> lon: {p.longitude}
                        </Popup>
                    </Marker>)
                    }
                </MapContainer>
            </div>
        </>
    );
}

export default Map;