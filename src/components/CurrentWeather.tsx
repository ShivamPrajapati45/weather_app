import type { GeocodingResponse, WeatherData } from '@/api/types'
import { Card, CardContent } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, MapPin, Wind } from 'lucide-react';

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;
}

const CurrentWeather = ({data,locationName}: CurrentWeatherProps) => {

    const {
        weather: [currentWeather],
        main: {temp,feels_like,humidity,temp_max,temp_min},
        wind: {speed,gust},
        coord: {lat,lon},
    } = data;

    const formatTemp = (temp: number) => `${Math.round(temp)}°`

    return (
        <Card className='overflow-hidden'>
            <CardContent className='p-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='flex items-end gap-2'>
                                <h2>{locationName?.name}</h2>
                                {locationName?.state && (
                                    <span className='text-muted-foreground'>
                                        {locationName?.state}
                                    </span>
                                )}
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {locationName?.country}
                            </p>
                        </div>

                        <div className='flex items-center gap-4'>
                            <p className='text-7xl font-bold tracking-tighter'>
                                {formatTemp(temp)}
                            </p>
                            <div className='space-y-2'>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    Feels Like {formatTemp(feels_like)}
                                </p>
                                <div className='flex gap-2 text-sm font-medium'>
                                    <span className='flex items-center gap-1 text-blue-500'>
                                        <ArrowDown className='h-3 w-3'/>
                                        {formatTemp(temp_min)}
                                    </span>
                                    <span className='flex items-center gap-1 text-red-500'>
                                        <ArrowUp className='h-3 w-3'/>
                                        {formatTemp(temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4 w-[500px] rounded-lg p-2'>
                            <div className='flex items-center justify-around shadow-md p-2 rounded-md'>
                                <Droplets className='h-8 w-8 text-blue-400'/>
                                <div className='space-y-1 text-center'>
                                    <p className='text-base font-semibold'>Humidity</p>
                                    <p className='text-sm font-semibold'>
                                        {humidity}%
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-around shadow-md p-2 rounded-md'>
                                <Wind className='h-8 w-8 text-blue-400'/>
                                <div className='space-y-1 text-center'>
                                    <p className='text-base font-semibold'>Wind Speed</p>
                                    <p className='text-sm font-semibold'>
                                        {speed} m/s
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-around shadow-md p-2 rounded-md'>
                                <Wind className='h-8 w-8 text-blue-400'/>
                                <div className='space-y-1 text-center'>
                                    <p className='text-base font-semibold'>Gust Speed</p>
                                    <p className='text-sm font-semibold'>
                                        {gust} m/s
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-around shadow-md p-2 rounded-md'>
                                <MapPin className='h-8 w-8 text-blue-400' />
                                <div className='space-y-1 text-center'>
                                    <p className='text-base font-semibold'>Coordinates</p>
                                    <p className='text-xs  flex flex-col font-semibold'>
                                    <span>
                                        Lat: {lat}°, 
                                    </span>
                                    <span>
                                        Lon: {lon}°
                                    </span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col aspect-square w-full max-w-[200px] items-center justify-center'>
                            <img 
                                src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`} 
                                className='h-full w-full object-contain rounded-full'
                                alt={currentWeather?.description}
                            />
                            <div className='text-center'>
                                <p className='text-xl font-semibold  capitalize'>
                                    {currentWeather?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default CurrentWeather