// src/Components/SearchResultsPageComponents/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapClickHandler = ({ setLocation }) => {
    useMapEvents({
        click: async(e) => {
            const {lat , lng} = e.latlng;

            try{
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const place = response.data.address.city || response.data.address.town || response.data.address.village || "unknown Location";
                console.log("Location City:" ,response.data.address.city)
                console.log("Location:" ,place)
                setLocation(place)
            }catch(err){
                console.log("Error:",err);
            }
        },
    });
    return null;
}



const MapComponent = ({ setLocation }) => {
    const center = [17.385044, 78.486671]; // Default to Hyderabad

    return (
        <MapContainer center={center} zoom={12} style={{ height: "100%", width: "80%" ,borderRadius: "20px"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution="© OpenStreetMap contributors"
            />
            <MapClickHandler setLocation={setLocation} />
        </MapContainer>
    );
};

export default MapComponent;
