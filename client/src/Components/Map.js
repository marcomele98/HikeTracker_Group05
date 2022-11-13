import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import '../App.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

function Map(props) {
    const positions = props.data.tracks[0].points.map(p => [p.lat, p.lon]);
    return (
        <div id='map'>
            <MapContainer
                center={positions[0]}
                zoom={14}
                scrollWheelZoom={true}
                style={{height: "500px"}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline
                    pathOptions={{fillColor: 'red', color: 'blue'}}
                    positions={positions}
                />
                {props.markers.map(marker => <Marker key={marker} position={marker} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    Name of the point <br/> Latitude <br/> Longitude
                </Popup>
                </Marker>)}
            </MapContainer>
        </div>
    );
}

export { Map };