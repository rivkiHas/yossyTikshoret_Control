'use client';
import { LoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_LIBRARIES = ['places'];

export default function GoogleMapsWrapper({ children }) {
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_LIBRARIES}>
            {children}
        </LoadScript>
    );
}
