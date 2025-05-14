import { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { updateBrunchDetails } from "../store/brunch_store"
import { Typography } from "./typhography";
import { useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_LIBRARIES = ["places"];

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
    fillOpacity: 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
    scale: 2,
};

export default function AddressSearchMap({ brunch }) {
    const dispatch = useDispatch();
    const autocompleteRef = useRef(null);
    const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer);
    const address = brunch.address;
    const location = brunch.location
    const [localInputValue, setLocalInputValue] = useState(address || "");

    console.log(location, "location");

    useEffect(() => {
        
        console.log("adress", address);

        if (address.trim() !== "" && window.google) {
            const geocoder = new window.google.maps.Geocoder();
            console.log("geocoder", geocoder);
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results[0]?.geometry?.location) {
                    const newLocation = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    };

                    if (newLocation.lat !== location.lat || newLocation.lng !== location.lng) {
                        dispatch(updateBrunchDetails({ id: brunch.id, location: newLocation }));
                    }
                }
            });
        }
    }, [address]);

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
        
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                dispatch(updateBrunchDetails({
                    id: brunch.id,
                    address: place.formatted_address,
                    location: newLocation
                }));
            }
        }
    };


    return typeMarketer === "חנות" ? (
        <div>
            <Typography className="text-[24px] font-bold mb-6 block w-full" >כתובת פעילות</Typography>
            <Typography className="text-[16px] font-medium mb-1" >כתובת פעילות</Typography>

            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_LIBRARIES}>
                <div className="w-5/6 space-y-6 flex flex-col">
                    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                        <input
                            type="text"
                            placeholder="הכנס כתובת..."
                            value={localInputValue}
                            onChange={(e) => {
                                setLocalInputValue(e.target.value);
                                console.log(e.target.value, "target")
                            }}
                            className="p-3 rounded-lg border border-gray-300 bg-white text-right font-sans text-sm text-gray-700 w-full"
                        />
                    </Autocomplete>

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location || { lat: 32.0853, lng: 34.7818 }}
                        zoom={location ? 15 : 10}
                    >
                        <Marker position={location} icon={customMarkerIcon} />
                    </GoogleMap>
                </div>
            </LoadScript>
        </div>
    ) : (
        <div>
            <Typography className="text-[24px] font-bold mb-6 block w-full" >כתובת פעילות</Typography>
            <Typography className="text-[16px] font-medium mb-1" >כתובת פעילות</Typography>

            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_LIBRARIES}>
                <div className="w-5/6 space-y-6 flex flex-col">
                    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                        <input
                            type="text"
                            placeholder="הכנס כתובת..."
                            value={localInputValue}
                            onChange={(e) => {
                                setLocalInputValue(e.target.value);
                                console.log(e.target.value, "target")
                            }}
                            className="p-3 rounded-lg border border-gray-300 bg-white text-right font-sans text-sm text-gray-700 w-full"
                        />
                    </Autocomplete>

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location || { lat: 32.0853, lng: 34.7818 }}
                        zoom={location ? 15 : 10}
                    >
                        <Marker position={location} icon={customMarkerIcon} />
                    </GoogleMap>
                </div>
            </LoadScript>
        </div>
    );
}
