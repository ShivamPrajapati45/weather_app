import { useState } from "react"
import { Button } from "./ui/button"
import {  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/use-favorite";

const CitySearch = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const {data: locations,isLoading} = useLocationSearch(query);
    const {addToHistory,clearHistory,history} = useSearchHistory();
    const {favorites} = useFavorite();
    const navigate = useNavigate();
    const handleSelect = (cityData: string) => {
        const [lat,lon,name,country] = cityData.split("|");

        // Adding to search history
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country
        });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}&con=${country}`)
    }

    return (
        <>
            <Button
                variant={'outline'}
                onClick={() => setOpen(true)}
                className="relative cursor-pointer justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            >
                <Search className="md:mr-2 h-4 w-4"/>
                <span className="hidden md:block">
                    Search cities...
                </span>
            </Button>
            
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput 
                    placeholder="search cities..."
                    value={query}
                    onValueChange={setQuery} 
                />
                <CommandList className="overflow-y-scroll scrollbar-thin-custom">
                    {query.length > 2 && !isLoading && (
                        <CommandEmpty>No cities found.</CommandEmpty>
                    )}

                    {favorites.length > 0 && (
                            <CommandGroup heading='Favorites'>
                                {favorites.map((location) => {
                                    return (
                                        <CommandItem 
                                            key={location.id}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleSelect}
                                            className="cursor-pointer"
                                        >
                                            <Star className="mr-2 h-4 w-4 text-yellow-400"/>
                                            <span>
                                                {location.name}
                                            </span>
                                            {location.state && (
                                                <span className="text-sm text-muted-foreground">
                                                    .{location.state}
                                                </span>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                .{location.country}
                                            </span>
                                    </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                    )}

                    {history.length > 0 && (
                        <>
                            <CommandSeparator/>
                            <CommandGroup>
                                <div className="flex items-center justify-between px-2 my-2">
                                    <p className="text-xs text-muted-foreground">Recent Searches</p>
                                    <Button
                                        variant={'ghost'}
                                        size={'sm'}
                                        onClick={() => clearHistory.mutate()}
                                        className="cursor-pointer"
                                    >
                                        <XCircle className="h-4 w-4"/>
                                        Clear
                                    </Button>
                                </div>
                                {history.map((location) => {
                                    return (
                                        <CommandItem 
                                            key={`${location.lat}-${location.lon}`}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleSelect}
                                            className="cursor-pointer"
                                        >
                                            <Clock className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            <span>
                                                {location.name}
                                            </span>
                                            {location.state && (
                                                <span className="text-sm text-muted-foreground">
                                                    .{location.state}
                                                </span>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                .{location.country}
                                            </span>
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {format(location.searchedAt, "MMM d, h:mm a")}
                                            </span>
                                    </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </>
                    )}

                    <CommandSeparator/>
                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                </div>
                            )}
                            {locations.map((location) => {
                                return (
                                    <CommandItem 
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSelect}
                                        className="cursor-pointer"
                                    >
                                        <Search className="mr-2 h-4 w-4"/>
                                        <span>
                                            {location.name}
                                        </span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">
                                                , {location.state}
                                            </span>
                                        )}
                                        <span className="text-sm text-muted-foreground">
                                            , {location.country}
                                        </span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    )}
                    
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch