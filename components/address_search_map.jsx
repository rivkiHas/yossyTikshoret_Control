'use client';
import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { Typography } from './typhography';

const containerStyle = {
    width: '100%',
    height: '300px',
};

const centerDefault = {
    lat: 32.0853, // ברירת מחדל - תל אביב
    lng: 34.7818,
};

export default function AddressSearchMap() {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(centerDefault);
    const [markerPosition, setMarkerPosition] = useState(centerDefault);
    const autocompleteRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCenter(location);
                setMarkerPosition(location);
                map.panTo(location);
            }
        }
    };

    if (!isLoaded) return <div className="text-center py-4">טוען מפה...</div>;

    return (
        <div className="flex justify-center  ">
            <div className=" bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <div className='flex flex-col'>
                    <Typography className="text-[24px] font-bold mb-6 block w-100%">כתובת העסק</Typography>
                    <Typography className="text-sm text-gray-600 mb-4 text-right">כתובת חנות</Typography>
                </div>
                <div className="mb-4">
                    <Autocomplete
                        onLoad={(ref) => (autocompleteRef.current = ref)}
                        onPlaceChanged={onPlaceChanged}
                    > 
                        <input
                            type="text"
                            placeholder="הכנס כתובת"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Autocomplete>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={(map) => setMap(map)}
                    >
                        <Marker position={markerPosition} />
                    </GoogleMap>
                </div>
            </div>
        </div>
    );
}
