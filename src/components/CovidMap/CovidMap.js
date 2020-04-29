import React, {useEffect, useState} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({onPatientMarkerClicked}) => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    setPatients(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
    }, [])
    return <Map center={[16.30748653, 106.90136746]} zoom={6}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {patients.map(patient => <Marker position={[patient.lat, patient.lng]} onClick={() => {onPatientMarkerClicked(patient)}}>
            <Popup>
                <ul>
                    <li>Name: {patient.name}</li>
                    <li>Address: {patient.address}</li>
                    <li>Note: {patient.note}</li>
                    <li>Verify date: {patient.verifyDate}</li>
                </ul>
            </Popup>
        </Marker>)}
    </Map>;
};

export default CovidMap;
