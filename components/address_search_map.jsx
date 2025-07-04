"use client";

import { useRef, useEffect, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { updateBrunchDetails, setActiveBrunch } from "../store/brunch_store";
import { Typography } from "./typhography";
import { MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useFormikContext } from 'formik';
import TooltipValid from "./tooltip_valid";

const containerStyle = {
    height: "100%",
    width: "100%",
    flexShrink: 0,
    alignSelf: "stretch",
    borderRadius: "8px",
    background:
        "url('<path-to-image>') -212.782px -5.3px / 237.14% 102.469% no-repeat lightgray",
    position: "relative",
    overflow: "hidden",
    minHeight: "300px", // Ensure minimum height on mobile
};

const customMarkerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#F8BD00",
    fillOpacity: 2,
    strokeColor: "#FFFFFF",
    strokeWeight: 3,
    scale: 3,
};

export default function AddressSearchMap({ typeMarketer }) {
    const dispatch = useDispatch();
    const formik = useFormikContext();
    const autocompleteRef = useRef(null);
    const brunches = useSelector((state) => state.brunch.brunches);
    const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
    const brunch = brunches.find((b) => b.id === activeBrunch) || brunches[0];
    const address = brunch?.address || "";
    const location = brunch?.location || null;

    const [localInputValue, setLocalInputValue] = useState(address || "");
    const [isEditing, setIsEditing] = useState(false);
    const defaultBrunchName =
        brunch?.name?.trim() !== ""
            ? brunch.name
            : `${brunches.findIndex((b) => b.id === activeBrunch) + 1}`;
    const [brunchName, setBrunchName] = useState(defaultBrunchName);

    // Get current branch index for validation
    const currentBranchIndex = brunches.findIndex(b => b.id === activeBrunch);
    const addressFieldName = `brunches.${currentBranchIndex}.address`;
    const nameFieldName = `brunches.${currentBranchIndex}.name`;
    const locationFieldName = `brunches.${currentBranchIndex}.location`;

    useEffect(() => {
        setLocalInputValue(address);
    }, [address]);

    useEffect(() => {
        if (!address.trim()) return;

        const interval = setInterval(() => {
            if (window.google && window.google.maps) {
                clearInterval(interval);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address }, (results, status) => {
                    if (
                        status === "OK" &&
                        results[0]?.geometry?.location
                    ) {
                        const newLocation = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                        };

                        if (
                            !location ||
                            newLocation.lat !== location.lat ||
                            newLocation.lng !== location.lng
                        ) {
                            dispatch(
                                updateBrunchDetails({ id: activeBrunch, location: newLocation })
                            );
                            
                            // Update Formik
                            formik.setFieldValue(locationFieldName, newLocation);
                        }
                    }
                });
            }
        }, 300);

        return () => clearInterval(interval);
    }, [address, activeBrunch, dispatch, formik, locationFieldName, location]);

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handleEditBrunch = () => {
        setIsEditing(true);
    };
    
    const handleInputChange = (value) => {
        setLocalInputValue(value);
        // Update Formik field
        formik.setFieldValue(addressFieldName, value);
    };

    const handleSaveBrunch = () => {
        setIsEditing(false);
        dispatch(updateBrunchDetails({
            id: brunch.id,
            name: brunchName,
        }));
        
        // Update Formik
        formik.setFieldValue(nameFieldName, brunchName);
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                dispatch(
                    updateBrunchDetails({
                        id: brunch.id,
                        address: place.formatted_address,
                        location: newLocation,
                    })
                );
                setLocalInputValue(place.formatted_address);
                
                // Update Formik
                formik.setFieldValue(addressFieldName, place.formatted_address);
                formik.setFieldValue(locationFieldName, newLocation);
            }
        }
    };

    // Check for validation errors
    const addressError = formik.touched.brunches?.[currentBranchIndex]?.address && 
                        formik.errors.brunches?.[currentBranchIndex]?.address;
    const nameError = formik.touched.brunches?.[currentBranchIndex]?.name && 
                     formik.errors.brunches?.[currentBranchIndex]?.name;
    const locationError = formik.touched.brunches?.[currentBranchIndex]?.location && 
                         formik.errors.brunches?.[currentBranchIndex]?.location;

    return (
        <div className="h-full flex flex-col p-4 bg-white rounded-[40px]">
            <div className="flex items-center justify-between w-5/6 gap-2 mb-4">
                <div className="flex flex-row items-start text-[24px] font-bold">
                    <span className="block">
                        {typeMarketer === "סוכן" ? (
                            <>אזור פעילות&nbsp;</>
                        ) : (
                            <>כתובת&nbsp;</>
                        )}
                    </span>
                    {isEditing ? (
                        <div className="relative">
                            <input
                                type="text"
                                value={brunchName}
                                onChange={(e) => setBrunchName(e.target.value)}
                                onBlur={() => {
                                    handleSaveBrunch();
                                    formik.setFieldTouched(nameFieldName, true);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleSaveBrunch();
                                        formik.setFieldTouched(nameFieldName, true);
                                    }
                                }}
                                autoFocus
                                className={`outline-none px-1 w-1/2 ${nameError ? 'border-b border-red-500' : ''}`}
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                }}
                            />
                            {nameError && (
                                <TooltipValid tooltipText={nameError} className="top-8" />
                            )}
                        </div>
                    ) : (
                        <span className="block">{brunchName}</span>
                    )}
                </div>

                {typeMarketer === "חנות" && brunches.length > 1 && (
                    <button
                        onClick={handleEditBrunch}
                        className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                    >
                        <PencilSquareIcon className="h-7 w-7 text-black" />
                    </button>
                )}
            </div>

            <Typography className="text-[16px] font-medium mb-4">
                {typeMarketer === "סוכן"
                    ? "אזור פעילות"
                    : `כתובת סניף ${brunch?.name}` && brunch.name.trim() !== ""
                        ? `כתובת סניף${brunch.name}`
                        : brunches.length > 1
                            ? `כתובת סניף ${brunch.name}`
                            : "כתובת העסק"}
            </Typography>

            <div className="w-5/6 flex-1 flex flex-col gap-4">
                <div className="relative">
                    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                        <input
                            type="text"
                            placeholder={typeMarketer == "חנות" ? "הכנס כתובת..." : "חפש מיקום נוסף"}
                            value={localInputValue}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => formik.setFieldTouched(addressFieldName, true)}
                            className={`w-full flex justify-between items-center h-11 px-4 border rounded-md bg-background text-sm text-muted-foreground peer-hover:border-primary peer-focus-visible:ring-1 peer-focus-visible:ring-ring transition-colors ${
                                addressError ? 'border-red-500' : 'border-input'
                            }`}
                        />
                    </Autocomplete>
                    {addressError && (
                        <TooltipValid tooltipText={addressError} className="top-12" />
                    )}
                </div>

                <div className="flex-1 min-h-[300px] relative">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location || { lat: 32.0853, lng: 34.7818 }}
                        zoom={location ? 15 : 10}
                    >
                        {location && <Marker position={location} icon={customMarkerIcon} />}
                    </GoogleMap>
                    {locationError && (
                        <div className="absolute top-2 right-2 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs">
                            נדרש מיקום תקין
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}