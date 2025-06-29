'use client';
import { useJsApiLoader } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_LIBRARIES = ['places'];

export default function GoogleMapsWrapper({ children }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: GOOGLE_LIBRARIES,
    });

    // Only render LoadScript if API key is available and not placeholder
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_VALID_API_KEY_HERE') {
        console.warn('Google Maps API key is not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                            Google Maps Configuration Required
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                                Please configure your Google Maps API key to use map features.
                                <br />
                                <a 
                                    href="https://console.cloud.google.com/google/maps-apis/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="underline hover:text-yellow-900"
                                >
                                    Get your API key here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        );
    }

    if (loadError) {
        console.error('Google Maps LoadScript error:', loadError);
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            Google Maps Loading Error
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p>Failed to load Google Maps API. Please check your API key and try again.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                            Loading Google Maps...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return children;
}