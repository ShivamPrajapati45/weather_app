import { WeatherData } from "@/api/types"
import { useFavorite } from "@/hooks/use-favorite"
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface FavoriteButtonProps{
    data: WeatherData
}

const FavoriteButton = ({data}: FavoriteButtonProps) => {
    const {addToFavorite,isFavorite,removeFavorite} = useFavorite();
    const [hover, setHover] = useState<boolean>(false);
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon); 


    const handleToggleFavorite = () => {
        if(isCurrentlyFavorite){
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name} from Favorites list`)
        }else{
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });
            toast.success(`Added ${data.name} to Favorites list`)
        };
        
    }

    return (
        <Button
            variant={isCurrentlyFavorite ? 'default' : 'outline'}
            size={'icon'}
            className={`${isCurrentlyFavorite ? 'bg-blue-500 hover:bg-blue-600 ' : ''} cursor-pointer relative`}
            onClick={handleToggleFavorite}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Star
                className={`h-8 w-8 ${isCurrentlyFavorite ? 'fill-current' : 'fill-none'} `}
            />
            {hover && (
                <span className="absolute right-10 transition-all top-1 text-white font-semibold duration-200 uppercase text-nowrap bg-gray-800 rounded-sm text-xs px-2 py-1">
                    {isCurrentlyFavorite ? 'Remove from favorite' : 'Add to favorite'}
                </span>
            )}
        </Button>
    )
}

export default FavoriteButton