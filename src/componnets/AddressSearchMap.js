import React, { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { updateBrunchDetails } from "../redux/brunchSlice";
import HeaderText from "./HeaderText";
import TextOnTextFiled from "./TextOnTextFiled";
import CustomMarker from "./customMarketer";
import Carusela from "./carusela";
const GOOGLE_MAPS_API_KEY = "AIzaSyCd4oRcSJmbJQhcaEGsgwlNR5AgmvARYwM";

const containerStyle = {
  height: "478.43px",
  flexShrink: 0,
  alignSelf: 'stretch',
  aspectRatio: "384 / 478.43",
  borderRadius: '8px',
  background: "url(<path-to-image>) lightgray -212.782px -5.3px / 237.14% 102.469% no-repeat",
};

// הגדרת הנתיב של ה-SVG
const customMarkerIcon = {
  url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M25.6136 14.0175C25.6136 23.3987 15.7622 28.7946 15.7622 28.7946C15.7622 28.7946 5.91083 23.3987 5.91083 14.0175C5.91083 11.4048 6.94874 8.89903 8.79623 7.05154C10.6437 5.20405 13.1495 4.16614 15.7622 4.16614C18.375 4.16614 20.8807 5.20405 22.7282 7.05154C24.5757 8.89903 25.6136 11.4048 25.6136 14.0175Z" fill="#F8BD00" stroke="white" stroke-width="1.31352" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),
  scaledSize: { width: 32, height: 32 }, // התאמת גודל הסמן
};


export default function AddressSearchMap({ brunch }) {
  const dispatch = useDispatch();
  const autocompleteRef = useRef(null);
  const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer);
  const address = useSelector(
    state =>
      state.brunch.brunches.find(b => b.id === brunch.id)?.address || ""
  );
  const location = useSelector(

    state =>
      state.brunch.brunches.find(b => b.id === brunch.id)?.location || { lat: 32.0853, lng: 34.7818 }
  );


  useEffect(() => {
    if (address.trim() !== "" && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]?.geometry?.location) {
          const newLocation = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          // רק אם המיקום באמת השתנה, נעדכן ב-Redux
          if (newLocation.lat !== location.lat || newLocation.lng !== location.lng) {
            dispatch(updateBrunchDetails({ id: brunch.id, location: newLocation }));
          }
        }
      });
    }
  }, [address]); // חשוב שה-hook יאזין לשינויים בכתובת


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
  console.log("typeMarketer:", typeMarketer);

  return typeMarketer === "חנות" ? (
    <div style={{
      display: 'flex',
      width: '384px',
      height: '646px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '24px',
      textAlign: "right",
      margin: "auto",
      direction: "rtl"
    }}>
      <HeaderText placeholder={" כתובת העסק"} style={{ marginBottom: '24px' }} />
      <div>
        <TextOnTextFiled header={"כתובת חנות"} style={{ marginBottom: '1px' }} />

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <div style={{
            display: "flex", flexDirection: "column", gap: "10px"
          }}>
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  height: '46px',
                  padding: '12px 16px 12px 20px',
                  borderRadius: '6px',
                  border: '1px solid #DBDEDE',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  marginBottom: '24px'
                }}
              >
                <input
                  type="text"
                  placeholder="הכנס כתובת..."
                  value={address}
                  onChange={(e) => {
                    console.log("חיפוש", e)
                    dispatch(updateBrunchDetails({ id: brunch.id, address: e.target.value }))
                  }}
                  style={{
                    width: '100%',
                    height: '22px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'SimplerPro_HLAR, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#4C585B',
                    backgroundColor: 'transparent',
                    textAlign: 'right',
                  }}
                />
              </div>
            </Autocomplete>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || { lat: 32.0853, lng: 34.7818 }}
              zoom={location ? 15 : 10}
            >
              {/* {address && */}
              <Marker position={location} icon={customMarkerIcon} />
              {/* //  } */}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </div>) : (
    <div style={{
      display: 'flex',
      width: '384px',
      height: '646px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '24px',
      textAlign: "right",
      margin: "auto",
      direction: "rtl"
    }}>
      <HeaderText placeholder={"אזור פעילות"} style={{ marginBottom: '24px' }} />
      <div>
        <TextOnTextFiled header={"אדור פעילות"} style={{ marginBottom: '1px' }} />

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <div style={{
            display: "flex", flexDirection: "column", gap: "10px"
          }}>
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  height: '46px',
                  padding: '12px 16px 12px 20px',
                  borderRadius: '6px',
                  border: '1px solid #DBDEDE',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  marginBottom: '24px'
                }}
              >
                <input
                  type="text"
                  placeholder="הכנס אזור פעילות..."
                  value={address}
                  onChange={(e) => {
                    console.log("חיפוש", e)
                    dispatch(updateBrunchDetails({ id: brunch.id, address: e.target.value }))
                  }}
                  style={{
                    width: '100%',
                    height: '22px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'SimplerPro_HLAR, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#4C585B',
                    backgroundColor: 'transparent',
                    textAlign: 'right',
                  }}
                />
              </div>
            </Autocomplete>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || { lat: 32.0853, lng: 34.7818 }}
              zoom={location ? 15 : 10}
            >
              {/* {address && */}
              <Marker position={location} icon={<customMarkerIcon/>} />
              {/* //  } */}
            </GoogleMap>
          </div>
          
        </LoadScript>
        <Carusela/>
      </div>
    </div>
  );
}
