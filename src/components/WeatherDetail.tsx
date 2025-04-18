import { WeatherData } from "@/api/types"
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailProps {
    data: WeatherData
}
const WeatherDetail = ({data}:WeatherDetailProps) => {
    const {wind,sys,main} = data;

const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
}

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a")
    }
    const details = [
        {
            title: 'Sunrise',
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: 'text-orange-500'
        },
        {
            title: 'Sunset',
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: 'text-blue-400'
        },
        {
            title: 'Wind direction',
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: 'text-green-400'
        },
        {
            title: 'Pressure',
            value: `${main.pressure} hpa`,
            icon: Gauge,
            color: 'text-purple-400'
        },
    ];


    return (
        <Card>
            <CardHeader>
                <CardTitle className="md:text-lg text-base">Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
                    {details.map((detail) => {
                        return (
                            <div 
                                key={detail.title} 
                                className="flex justify-between items-center gap-3 rounded-md md:rounded-lg border md:p-4 px-5 py-2"
                            >
                                <detail.icon className={` h-6 w-6 ${detail.color}`}/>
                                <div className="text-center">
                                    <p className="text-sm font-medium leading-none">
                                        {detail.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {detail.value}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherDetail