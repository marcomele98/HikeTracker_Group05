import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import '../App.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
let gpxParser = require('gpxparser');

function Map(props) {
    var gpx = new gpxParser();
    gpx.parse(props.data)
    const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
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
                {props.markers.map(marker => <Marker key={marker} position={[marker.latitude, marker.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    {marker.name} <br/> {marker.latitude} <br/> {marker.longitude}
                </Popup>
                </Marker>)}
            </MapContainer>
        </div>
    );
}

export { Map };