"use client";

import { useRef, useEffect, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { updateBrunchDetails, setActiveBrunch } from "../store/brunch_store";
import { Typography } from "./typhography";
import { MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Carusel from "./carusel";
import { addBrunch } from "../store/brunch_store";


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
  minHeight: "300px",
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
          if (status === "OK" && results[0]?.geometry?.location) {
            const newLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            if (!location || newLocation.lat !== location.lat || newLocation.lng !== location.lng) {
              dispatch(
                updateBrunchDetails({
                  id: activeBrunch,
                  location: newLocation,
                })
              );
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

  const handleEditBrunch = () => {
    setIsEditing(true);
  };

  const handleInputChange = (value) => {
    setLocalInputValue(value);
  };

  const handleSaveBrunch = () => {
    setIsEditing(false);
    dispatch(
      updateBrunchDetails({
        id: brunch.id,
        name: brunchName,
      })
    );
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        if (typeMarketer !== "agent") {
          dispatch(
            updateBrunchDetails({
              id: brunch.id,
              address: place.formatted_address,
              location: newLocation,
            })
          );
        }
        setLocalInputValue(place.formatted_address);
      }
    }
  };

  const handleAddBranch = () => {
  if (!localInputValue.trim()) {
    alert("אנא הכנס כתובת להוספה");
    return;
  }

  const place = autocompleteRef.current?.getPlace?.();

  if (!place || !place.geometry) {
    alert("אנא בחר כתובת מהרשימה של גוגל (Autocomplete)");
    return;
  }

  const newLocation = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
  };

  const newId = Math.max(...brunches.map((b) => b.id), 0) + 1;

  const newBrunch = {
    id: newId,
    address: place.formatted_address || localInputValue,
    location: newLocation,
    hoursOpen: [
      { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
      { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
      { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
      { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
      { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
    ],
    name: place.formatted_address || localInputValue,
  };

  dispatch(addBrunch(newBrunch));
  setLocalInputValue("");
};


  return (
    <div className="lg:h-[60vh] flex flex-col bg-white rounded-[40px] lg:p-5 p-5">
      <div className="flex items-center lg:justify-between gap-2 mb-4">
        <div className="flex flex-row items-center text-[24px] font-bold justify-around">
          {typeMarketer === "agent" ? (
            <span className="block">אזור פעילות</span>
          ) : brunches.length === 1 ? (
            <span className="block">כתובת חנות</span>
          ) : (
            <>
              <span className="block">כתובת חנות: </span>
              {isEditing ? (
                <input
                  type="text"
                  value={brunchName}
                  onChange={(e) => setBrunchName(e.target.value)}
                  onBlur={handleSaveBrunch}
                  onKeyPress={(e) => e.key === "Enter" && handleSaveBrunch()}
                  autoFocus
                  className="outline-none px-1 w-1/2"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                />
              ) : (
                <span className="block">{brunchName}</span>
              )}
            </>
          )}
        </div>

        {typeMarketer === "store" && brunches.length > 1 && (
          <button
            onClick={handleEditBrunch}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
          >
            <PencilSquareIcon className="h-7 w-7 text-black" />
          </button>
        )}
      </div>


      <Typography className="text-[16px] font-medium mb-4">
        {typeMarketer === "agent"
          ? "אזור פעילות"
          : brunches.length > 1
            ? `כתובת חנות: ${brunchName}`
            : "כתובת חנות"}
      </Typography>

      <div className="flex-1 flex flex-col gap-4">
        {typeMarketer === "agent" ? (
          <div className="relative w-full">
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <input
                type="text"
                placeholder="חפש מיקום נוסף"
                value={localInputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBranch();
                  }
                }}
                className="w-full h-11 px-4 border border-input rounded-md bg-background text-sm text-muted-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </Autocomplete>

            <button
              type="button"
              onClick={handleAddBranch}
              className="absolute left-0 top-0 h-11 flex items-center justify-center px-3 text-gray-500 hover:text-gray-700"
              aria-label="Add new location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M14.6631 14L11.1985 10.5354M11.1985 10.5354C12.1362 9.59765 12.663 8.32583 12.663 6.9997C12.663 5.67357 12.1362 4.40175 11.1985 3.46403C10.2607 2.52632 8.98892 1.99951 7.66279 1.99951C6.33665 1.99951 5.06484 2.52632 4.12712 3.46403C3.1894 4.40175 2.6626 5.67357 2.6626 6.9997C2.6626 8.32583 3.1894 9.59765 4.12712 10.5354C5.06484 11.4731 6.33665 11.9999 7.66279 11.9999C8.98892 11.9999 10.2607 11.4731 11.1985 10.5354Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              placeholder="הכנס כתובת..."
              value={localInputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full h-11 px-4 border border-input rounded-md bg-background text-sm text-muted-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </Autocomplete>
        )}

        <div className="flex-1 min-h-[500px] lg:min-h-[300px] h-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location || { lat: 32.0853, lng: 34.7818 }}
            zoom={location ? 15 : 10}
          >
            {location && <Marker position={location} icon={customMarkerIcon} />}
          </GoogleMap>
        </div>
      </div>
      {typeMarketer === "agent" && (
        <div className="lg:hidden mt-4">
          <Carusel activeBrunch={activeBrunch} />
        </div>)}
    </div>
  );
}