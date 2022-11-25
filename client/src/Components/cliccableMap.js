import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { ListGroup, ListGroupItem } from "react-bootstrap";

function LocationMarker({ position, setPosition }) {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
        locationfound(e) {
            map.flyTo(e.latlng, map.getZoom())
        }
    })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            map.flyTo({ lat: position.coords.latitude, lng: position.coords.longitude }, map.getZoom());
        });
    }, [])

    useEffect(() => {
        if (position)
            map.flyTo(position, map.getZoom())
    }, [position])

    return position === undefined ? null : (
        <Marker position={position}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
            <Popup>{"Latitude: "+ position?.lat}<br/>{"Longitude: " + position?.lng }</Popup>
        </Marker>
    )
}

const CliccableMap = ({ position, setPosition }) => {

    return (

        <ListGroup>
            <ListGroupItem className="m-3 border-2 rounded-3 shadow">
                <MapContainer
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: "300px" }}
                    center={position ? position : { lat: 45.116177, lng: 7.742615 }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
            </ListGroupItem>
        </ListGroup>


    );
};

const PointMap = ({ position }) => {
    return (

        <ListGroup>
            <ListGroupItem className="m-3 border-2 rounded-3 shadow">
                <MapContainer
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: "300px" }}
                    center={position}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}
                        icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                    >
                         <Popup>{"Name: "+ position.name}<br/>{"Latitude: "+ position.lat}<br/>{"Longitude: " + position.lng } <br/>{"Altitude: " + position.altitude + " m" }</Popup>
                    </Marker>
                </MapContainer>
            </ListGroupItem>
        </ListGroup>


    );
}

export  {CliccableMap, PointMap };