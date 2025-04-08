import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";
interface GeolocationState {
    coordinates: Coordinates | null,
    error: string | null,
    isLoading: boolean
}
export function useGeolocation(){
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    });

    // this function will as soon as page loaded through useEffect hook
    const getLocation = () => {
        setLocationData((prev) => ({
            ...prev, isLoading: true, error: null
        }))

        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: ' Geolocation is not supported by your browser',
                isLoading: false
            });
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            });
        },(err) => {
            let errorMsg: string;

            switch (err.code){
                case err.PERMISSION_DENIED: // this are inbuilt error
                    errorMsg = 'Location permission denied. Please enable location access';
                    break;
                case err.POSITION_UNAVAILABLE:
                    errorMsg = "Location information is Unavailable"
                    break;
                case err.TIMEOUT:
                    errorMsg = "Location request timed out";
                    break;
                default:
                    errorMsg = "An unknown error occured"
            }

            setLocationData({
                coordinates: null,
                error: errorMsg,
                isLoading: false
            })
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });

    }

    useEffect(() => {
        getLocation();
    },[])

    return {
        ...locationData,
        getLocation
    }

}