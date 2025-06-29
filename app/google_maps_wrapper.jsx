'use client';
import { LoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_LIBRARIES = ['places'];

export default function GoogleMapsWrapper({ children }) {
    // Only render LoadScript if API key is available
    if (!GOOGLE_MAPS_API_KEY) {
        console.warn('Google Maps API key is not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
        return <div>{children}</div>;
    }

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_LIBRARIES}>
            {children}
        </LoadScript>
    );
}