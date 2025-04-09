import type { ForecastData } from "@/api/types"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"

interface ForecastProps {
    data: ForecastData
}

interface DailyForecast{
    date: number,
    temp_min: number,
    temp_max: number,
    humidity: number,
    wind: number,
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }
}

const WeatherForecast = ({data}: ForecastProps) => {

    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt
            };
        }else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {} as Record<string, DailyForecast>);


    const formatTemp = (temp: number) => `${Math.round(temp)}°`
    // converting objects to array
    const nextDays = Object.values(dailyForecasts).slice(0, 6);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">5-Day Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-0 px-2">
                <div className="grid gap-2">
                    {nextDays.map((day) => {
                        return (
                            <div key={day.date}
                                className="grid grid-cols-3 md:grid-cols-3 hover:bg-gray-100 dark:bg-[#121212] dark:hover:bg-[#212121] transition-all duration-200 items-center rounded-lg border md:p-4 px-3 py-2"
                            >
                                <div className="flex md:flex-row flex-col gap-2 items-center">
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${day.weather?.icon}@4x.png`} 
                                        className='h-12 w-12 object-contain rounded-full'
                                        alt={day.weather?.description}
                                    />
                                    <div>
                                        <p className="md:font-medium text-xs md:text-base text-nowrap">
                                            {format(new Date(day.date * 1000), "EEE, MMM d")}
                                        </p>
                                        <p className="md:text-sm text-center text-xs text-muted-foreground capitalize">
                                            {day.weather.description}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex md:flex-row flex-col justify-center md:gap-4 gap-2'>
                                    <span className='flex items-center gap-1 text-blue-500'>
                                        <ArrowDown className='md:mr-1 h-5 w-5'/>
                                        {formatTemp(day.temp_min)}
                                    </span>
                                    <span className='flex items-center gap-1 text-red-500'>
                                        <ArrowUp className='md:mr-1 h-5 w-5'/>
                                        {formatTemp(day.temp_max)}
                                    </span>
                                </div>

                                <div className="flex md:flex-row flex-col  md:justify-end gap-4">
                                    <span className="flex items-center gap-1">
                                        <Droplets className="h-5 w-5 text-[#00BFFF]"/>
                                        <span className="text-sm">
                                            {day.humidity}%
                                        </span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Wind className="h-5 w-5 text-[#A9A9A9]"/>
                                        <span className="text-sm">
                                            {day.wind}m/s
                                        </span>
                                    </span>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>

    )
}

export default WeatherForecast