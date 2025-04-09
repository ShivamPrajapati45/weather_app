import CurrentWeather from "@/components/CurrentWeather";
import FavoriteButton from "@/components/FavoriteButton";
import HourlyTemperature from "@/components/HourlyTemprature";
import LoadingSkeleton from "@/components/Loading-skeleton";
import Map from "@/components/Map";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetail from "@/components/WeatherDetail";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, Crosshair, MapPin } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const CityPage = () => {

    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get('lat') || "0");
    const lon = parseFloat(searchParams.get('lon') || "0");

    const coordinates = {lat, lon};

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    // console.log(forecastQuery.data)

    if(weatherQuery.error || forecastQuery.error){
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    Failed to load weather data. Please try again.
                </AlertDescription>
            </Alert>
        )
    };

    if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
        return <LoadingSkeleton/>
    }

    return (
        <div className="space-y-4">

            <div className="flex px-3 items-center justify-between">
                <h1 className="md:text-3xl flex items-center text-xl font-semibold md:font-bold tracking-tight">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-2"/>
                    {params?.cityName}, {weatherQuery?.data?.sys?.country}
                </h1>
                <div>
                    <FavoriteButton
                        data={{...weatherQuery?.data, name: params?.cityName}}
                    />
                </div>
            </div>

            <div className="grid gap-10">
                <div className="flex flex-col gap-4">
                    <CurrentWeather 
                        data={weatherQuery?.data} 
                    />
                    <HourlyTemperature
                        data={forecastQuery?.data}
                    />
                </div>
                <div className="space-y-3">
                    <h2 className="md:text-lg md:font-semibold flex items-center gap-2">
                        <Crosshair className="h-5 w-5 text-blue-500" />
                        <span className="md:text-lg text-sm text-nowrap">
                            Current Location Map by Coordinates
                        </span>
                    </h2>
                    <Map 
                        data={weatherQuery.data}
                    />
                </div>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetail 
                        data={weatherQuery?.data}
                    />
                    <WeatherForecast 
                        data={forecastQuery?.data}
                    />
                </div>
            </div>
        </div>
    )
}

export default CityPage 