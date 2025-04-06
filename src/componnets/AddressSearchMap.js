import React, { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { updateBrunchDetails } from "../redux/brunchSlice";
import HeaderText from "./HeaderText";
import TextOnTextFiled from "./TextOnTextFiled";
import CustomMarker from "./customMarketer";
import Carusela from "./carusela";
import PlaceIcon from '@mui/icons-material/Place';
import { Box } from "@mui/material";
const GOOGLE_MAPS_API_KEY = "AIzaSyCd4oRcSJmbJQhcaEGsgwlNR5AgmvARYwM";


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
// הגדרת הנתיב של ה-SVG
const customMarkerIcon = {
  path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  fillColor: "#F8BD00",  // צבע המילוי
  fillOpacity: 1,        // שקיפות המילוי
  strokeColor: "#FFFFFF", // צבע הגבול (לבן)
  strokeWeight: 2,        // עובי הגבול
  scale: 2,               // קנה מידה
};


const customMarkerIcon2 = {
  url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="35" fill="gold" stroke="white" stroke-width="3"/>
      <path d="M40 20C33.92 20 29 24.92 29 31c0 7 11 18 11 18s11-11 11-18c0-6.08-4.92-11-11-11zm0 14.5c-2.07 0-3.75-1.68-3.75-3.75S37.93 27 40 27s3.75 1.68 3.75 3.75-1.68 3.75-3.75 3.75z" fill="white"/>
      <text x="40" y="65" font-size="12" text-anchor="middle" fill="black" font-family="Arial">גבעת שאול</text>
    </svg>
  `),
  // scaledSize: new window.google.maps.Size(80, 80), // כאן שינוי
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

  return typeMarketer === "חנות" ? (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: "right",
      direction: "rtl",
      width:'48%',
      height:'80vh',

    }}>
      <HeaderText placeholder={" כתובת העסק"} style={{ marginBottom: '24px' }} />
      <Box>
        <TextOnTextFiled header={"כתובת חנות"} style={{ marginBottom: '1px' }} />

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
             gap: "10px",
            
          }}>
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <input
                type="text"
                placeholder="הכנס כתובת..."
                value={address}
                onChange={(e) => {
                  dispatch(updateBrunchDetails({ id: brunch.id, address: e.target.value }));
                }}
                style={{
                  padding: '9px 12px 9px 15px',
                  borderRadius: '6px',
                  border: '1px solid #DBDEDE',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  textAlign: 'right',
                  fontFamily: 'SimplerPro_HLAR, sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#4C585B',
                  width: '100%', // הרחבה לכל הרוחב
                }}
              />
            </Autocomplete>

           
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location || { lat: 32.0853, lng: 34.7818 }}
                zoom={location ? 15 : 10}

              >
                <Marker position={location} icon={customMarkerIcon} />
              </GoogleMap></Box>
          
        </LoadScript>
      </Box>
    </Box>) : (
    <Box sx={{
      display: 'flex',
      height:'80vh',

      flexDirection: 'column',
      alignItems: 'end',
      gap: '24px',
      textAlign: "right",
      direction: "rtl"
    }}>
      <HeaderText placeholder={"אזור פעילות"} style={{ marginBottom: '24px' }} />
      <Box>
        <TextOnTextFiled header={"אדור פעילות"} style={{ marginBottom: '1px' }} />

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "10px"
          }}>
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <Box
                style={{
                  // padding: '9px 12px 9px 15px',
                  borderRadius: '6px',
                  border: '1px solid #DBDEDE',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  textAlign: 'right',
                  fontFamily: 'SimplerPro_HLAR, sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#4C585B',
                  // width: '100%', // הרחבה לכל הרוחב
                }}
              >
                <input
                  type="text"
                  placeholder="הכנס כתובת..."
                  value={address}
                  onChange={(e) => {
                    dispatch(updateBrunchDetails({ id: brunch.id, address: e.target.value }));
                  }}
                  style={{
                    // width: '100%',  // כדי שה- input יתפוס את כל הרוחב
                    height: '22px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'SimplerPro_HLAR, sans-serif',
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#4C585B',
                    backgroundColor: 'transparent',
                    textAlign: 'right',
                  }}
                />
              </Box>
            </Autocomplete>


            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || { lat: 32.0853, lng: 34.7818 }}
              zoom={location ? 15 : 10}
            >
              <Marker position={location} icon={<customMarkerIcon2 />} />
            </GoogleMap>
          </Box>
          <Carusela />
        </LoadScript>
      </Box>
    </Box>
  );
}
