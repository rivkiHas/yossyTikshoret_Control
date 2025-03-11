import React, { useRef } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { updateBrunchDetails } from "../redux/brunchSlice";
import HeaderText from "./HeaderText";
import TextOnTextFiled from "./TextOnTextFiled";

const GOOGLE_MAPS_API_KEY = "AIzaSyCd4oRcSJmbJQhcaEGsgwlNR5AgmvARYwM";

const containerStyle = {
  // width: "384px",
  height: "478.43px",
  flexShrink: 0,
  alignSelf: 'stretch',
  aspectRatio: "384 / 478.43",
  borderRadius: '8px',
  background: "url(<path-to-image>) lightgray -212.782px -5.3px / 237.14% 102.469% no-repeat",
};

export default function AddressSearchMap({ brunch, typeMarketer }) {
  const dispatch = useDispatch();
  const autocompleteRef = useRef(null);

  // מקבלים את הכתובת של הסניף הספציפי ישירות מהסטייט
  const address = useSelector(state =>
    state.brunch.brunches.find(b => b.id === brunch.id)?.address || ""
  );

  const location = useSelector(state =>
    state.brunch.brunches.find(b => b.id === brunch.id)?.location || { lat: 32.0853, lng: 34.7818 }
  );

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

        // שולחים את הכתובת והקורדינטות ישירות ל-Redux
        dispatch(updateBrunchDetails({
          id: brunch.id,
          address: place.formatted_address,
          location: newLocation
        }));
      }
    }
  };

  return (
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
                  value={address} // משתמש ישירות בכתובת מהסטייט
                  onChange={(e) =>
                    dispatch(updateBrunchDetails({ id: brunch.id, address: e.target.value }))
                  }
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
              center={location}
              zoom={location ? 15 : 10}
            >
              {location && <Marker position={location} />}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </div>
  );
}
