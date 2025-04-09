import type { GeocodingResponse, WeatherData } from '@/api/types'
import { Card, CardContent } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, MapPin, Wind } from 'lucide-react';

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;
}

const CurrentWeather = ({data}: CurrentWeatherProps) => {

    const {
        weather: [currentWeather],
        main: {temp,feels_like,humidity,temp_max,temp_min},
        wind: {speed,gust},
        coord: {lat,lon},
    } = data;

    const formatTemp = (temp: number) => `${Math.round(temp)}°`

    return (
        <Card className='overflow-hidden'>
            <CardContent className='p-2 md:p-6'>
                <div className='grid gap-2 md:gap-4 md:grid-cols-2'>

                    <div className='space-y-2 md:space-y-4 '>
                        <div className='flex items-center justify-around md:justify-normal md:gap-4'>
                            <p className='tracking-tighter flex flex-col items-center'>
                                <span className='text-sm text-muted-foreground'>Temperature</span>
                                <span className='text-4xl md:text-7xl font-bold'>
                                    {formatTemp(temp)}
                                </span>
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

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:w-[500px] rounded-lg p-2'>
                            <div className='flex border-b border-gray-600 items-center justify-around shadow-md p-2 rounded-md'>
                                <Droplets className='h-8 w-8 text-[#00BFFF]'/>
                                <div className='space-y-1 text-center'>
                                    <p className='md:text-base text-sm md:font-semibold'>Humidity</p>
                                    <p className='text-sm md:font-semibold text-muted-foreground md:text-white'>
                                        {humidity}%
                                    </p>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-600 items-center justify-around shadow-md p-2 rounded-md'>
                                <Wind className='h-8 w-8 text-[#A9A9A9]'/>
                                <div className='space-y-1 text-center'>
                                    <p className='md:text-base text-sm md:font-semibold'>Wind Speed</p>
                                    <p className='text-sm md:font-semibold text-muted-foreground md:text-white'>
                                        {speed} m/s
                                    </p>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-600 items-center justify-around shadow-md p-2 rounded-md'>
                                <Wind className='h-8 w-8 text-[#FFA500]'/>
                                <div className='space-y-1 text-center'>
                                    <p className='md:text-base text-sm md:font-semibold'>Gust Speed</p>
                                    <p className='text-sm text-muted-foreground md:font-semibold md:text-white'>
                                        {gust} m/s
                                    </p>
                                </div>
                            </div>
                            <div className='flex border-b border-gray-600 items-center justify-around shadow-md p-2 rounded-md'>
                                <MapPin className='h-8 w-8 text-[#2E8B57]' />
                                <div className='space-y-1 text-center'>
                                    <p className='md:text-base text-sm md:font-semibold'>Coordinates</p>
                                    <p className='text-xs text-muted-foreground flex flex-col md:font-semibold md:text-white'>
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