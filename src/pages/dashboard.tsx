import CurrentWeather from "@/components/CurrentWeather";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyTemperature from "@/components/HourlyTemprature";
import LoadingSkeleton from "@/components/Loading-skeleton";
import Map from "@/components/Map";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetail from "@/components/WeatherDetail";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, Crosshair, MapPin, RefreshCw } from "lucide-react"
import { useState } from "react";

const Dashboard = () => {
    const {
        coordinates,
        error:locationError,
        getLocation,
        isLoading: locationLoading
    } = useGeolocation();

    const [hover, setHover] = useState<boolean>(false);

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    const handleRefresh = () => {
        getLocation();
        if(coordinates){
            // reload weather data
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    }
    if(locationLoading){
        return <LoadingSkeleton/>
    }

    if(locationError){
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button variant={'outline'} className="w-fit cursor-pointer" onClick={getLocation}>
                        <MapPin className="h-4 flex items-center justify-center w-4 mr-2"/>
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if(!coordinates){
        return (
            <Alert variant={'destructive'}>
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather</p>
                    <Button variant={'outline'} className="w-fit cursor-pointer" onClick={getLocation}>
                        <MapPin className="h-4 flex items-center justify-center w-4 mr-2"/>
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];
    console.log(locationName)

    if(weatherQuery.error || forecastQuery.error){
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again</p>
                    <Button variant={'outline'} className="w-fit cursor-pointer" onClick={handleRefresh}>
                        <RefreshCw className="h-4 flex items-center justify-center w-4 mr-2"/>
                        Refresh
                    </Button>
                </AlertDescription>
            </Alert>
        )
    };

    if(!weatherQuery.data || !forecastQuery.data){
        return <LoadingSkeleton/>
    }

    return (
        <div className="space-y-4">
            {/* Favorite Cities */}
            <FavoriteCities/>
            <div className="flex items-center justify-between">
                <h1 className="text-xl items-center flex font-bold tracking-tight">
                    <MapPin className="h-6 w-6 text-blue-500 mr-2"/>
                    <span>
                        {locationName?.name},{locationName?.state}, {locationName?.country}
                    </span>
                </h1>
                <Button 
                    variant={'outline'} 
                    size={'icon'}
                    onClick={handleRefresh}
                    className="cursor-pointer relative"
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <RefreshCw className={`${weatherQuery.isFetching || forecastQuery.isFetching ? 'animate-spin' : ''} h-4 w-4`}/>
                    {hover && (
                        <span className="absolute right-10 transition-all top-1 text-white font-semibold duration-200 uppercase text-nowrap bg-gray-800 rounded-sm text-xs px-2 py-1">
                            Refresh
                        </span>
                    )}
                </Button>
            </div>
            

            <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-5">
                    <CurrentWeather 
                        data={weatherQuery?.data} 
                        locationName={locationName} 
                    />
                    <HourlyTemperature
                        data={forecastQuery?.data}
                    />
                </div>
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Crosshair className="h-5 w-5 text-blue-500" />
                        Current Location Map by Coordinates
                    </h2>
                    <Map 
                        data={weatherQuery.data}
                    />
                </div>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetail data={weatherQuery?.data}/>
                    <WeatherForecast data={forecastQuery?.data}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard