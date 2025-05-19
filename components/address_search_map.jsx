"use client";

import { useRef, useEffect, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { updateBrunchDetails } from "../store/brunch_store";
import { Typography } from "./typhography";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Carusel from "./carusel";
import { setActiveBrunch } from '../store/brunch_store'
const containerStyle = {
    height: "60vh",
    width: "100%",
    flexShrink: 0,
    alignSelf: "stretch",
    borderRadius: "8px",
    background: "url('<path-to-image>') -212.782px -5.3px / 237.14% 102.469% no-repeat lightgray",
    position: "relative",
    overflow: "hidden",
};

const customMarkerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#F8BD00",
    fillOpacity: 2,
    strokeColor: "#FFFFFF",
    strokeWeight: 3,
    scale: 3,
};

export default function AddressSearchMap({ canEdit, typeMarketer }) {
    const dispatch = useDispatch();
    const autocompleteRef = useRef(null);
    const brunches = useSelector((state) => state.brunch.brunches);
    const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
    const brunch = brunches[activeBrunch];
    const address = brunch?.address || "";
    const location = brunch?.location || null;

    const [localInputValue, setLocalInputValue] = useState(address || "");

    useEffect(() => {

        if (!address.trim()) return;

        const interval = setInterval(() => {
            if (window.google && window.google.maps) {
                clearInterval(interval);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address }, (results, status) => {
                    if (status === "OK" && results[0]?.geometry?.location) {
                        const newLocation = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                        };

                        if (
                            newLocation.lat !== location.lat ||
                            newLocation.lng !== location.lng
                        ) {
                            dispatch(updateBrunchDetails({ id: activeBrunch, location: newLocation }));
                        }
                    }
                });
            }
        }, 300);

        return () => clearInterval(interval);
    }, [address]);

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const editNameBrunch = () => {

    }
    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                dispatch(updateBrunchDetails({
                    id: activeBrunch.id,
                    address: place.formatted_address,
                    location: newLocation,
                }));
            }
        }
    };

    return (
        <div>
            {canEdit && <button onClick={editNameBrunch}>
                <PencilSquareIcon /> </button>}
            <Typography className="text-[24px] font-bold mb-4 block w-full">   {typeMarketer === 'סוכן' ? 'כתובת הסוכן' : 'כתובת העסק'}
            </Typography>
            <Typography className="text-[16px] font-medium mb-1"> {typeMarketer === 'סוכן' ? 'כתובת הסוכן' : 'כתובת החנות'}</Typography>

            <div className="w-5/6 space-y-6 flex flex-col">
                <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                    <input
                        type="text"
                        placeholder="הכנס כתובת..."
                        value={localInputValue}
                        onChange={(e) => setLocalInputValue(e.target.value)}
                        className="w-6/6 flex justify-between items-center h-9 px-4 border border-input rounded-md bg-background text-sm text-muted-foreground peer-hover:border-primary peer-focus-visible:ring-1 peer-focus-visible:ring-ring transition-colors" />
                </Autocomplete>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location || { lat: 32.0853, lng: 34.7818 }}
                    zoom={location ? 15 : 10}
                >
                    <Marker position={location} icon={customMarkerIcon} />
                </GoogleMap>
                {typeMarketer == 'סוכן' && <Carusel />}

            </div>

        </div >
    )
}
