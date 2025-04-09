import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";
import * as ScrollArea  from "@radix-ui/react-scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface FavoriteCityProps{
    id: string;
    name: string;
    lat: number;
    lon: number;
    onRemove: (id: string) => void
}
const FavoriteCities = () => {
    const {removeFavorite,favorites} = useFavorite();
    if(!favorites.length){
        return null;
    };

    return (
        <>
            <h1 className="text-xl font-semibold tracking-tight">Favorites Cities</h1>

            <ScrollArea.Root className="w-full overflow-hidden rounded-lg">
                <ScrollArea.Viewport className="w-full whitespace-nowrap">
                <div className="flex gap-4">
                    {favorites.map((city) => (
                    <FavoriteCityTablet
                        key={city?.id}
                        {...city}
                        onRemove={() => removeFavorite.mutate(city.id)}
                    />
                    ))}
                </div>
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                    orientation="horizontal"
                    className="flex touch-none select-none p-0.5 transition-all"
                    >
                    <ScrollArea.Thumb className="flex-1 bg-gray-500 rounded-full" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </>
    )
};

function FavoriteCityTablet({
    id,
    name,
    lat,
    lon,
    onRemove,
}: FavoriteCityProps){
    const navigate = useNavigate();
    const {data: weather, isLoading} = useWeatherQuery({lat, lon});
    const [hover, setHover] = useState<boolean>(false);


    return (
        <div
            onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
            role="button"
            tabIndex={0}
            className="relative dark:hover:bg-[#121212] flex cursor-pointer min-w-[250px] items-center bg-card rounded-lg border px-4 py-4 shadow-sm transition-all hover:shadow-md"
        >
            <Button
                variant={'ghost'}
                size={'icon'}
                className="absolute left-1.5 opacity-70 hover:scale-110 hover:opacity-100 transition-all top-1 h-5 w-5 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                    toast.error(`Removed ${name} from Favorites`)
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <X className="h-3 w-3"/>
                {hover && (
                    <span className="absolute transition-all top-5 text-white duration-200 text-nowrap bg-gray-800 rounded-sm text-xs p-1">
                        Remove from Favorites
                    </span>
                )}
            </Button>

            {isLoading ? (
                <div className="flex h-8 w-full items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                </div>
            ) : weather ? (
                <div className="w-full flex items-center px-2 justify-center">
                    <div className="flex flex-col items-center">
                        <img 
                            src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`} 
                            className='h-8 w-8'
                            alt={weather?.weather[0]?.description}
                        />
                        <div className='text-center flex gap-1 items-center'>
                            <p className="font-medium">{name}</p>
                            <p className='text-xs text-muted-foreground'>
                                {weather?.sys?.country}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-xl font-bold">
                            {Math.round(weather.main.temp)}°
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {weather.weather[0].description}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default FavoriteCities