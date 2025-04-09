import { useTheme } from "@/context/theme-provider"
import { Link } from "react-router-dom"
import {Moon,Sun} from 'lucide-react'
import CitySearch from "./CitySearch";
import { useState } from "react";
const Header = () => {

    const { setTheme,theme } = useTheme();
    const [themeHover, setThemeHover] = useState<string>("");

    const toggleTheme = () => {
        if(theme == 'dark'){
            setTheme('light')
        }else{
            setTheme('dark')
        }
    }

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 items-center justify-between md:px-8 px-4">
                <Link to={'/'}>
                    <img 
                        src="/logo.png" 
                        alt="weatherly_logo" 
                        className="md:w-32 w-28 h-auto"
                    />
                </Link>
                <div className="flex relative gap-4 md:gap-6 items-center">
                    <CitySearch/>
                    <div 
                        onClick={toggleTheme}
                        className={`flex items-center relative cursor-pointer transition-transform duration-300 ${theme == 'dark' ? 'rotate-180' : 'rotate-0'}`}
                        onMouseEnter={() => setThemeHover(theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
                        onMouseLeave={() => setThemeHover('')}
                    >

                        {theme === 'dark' ? 
                        (<Sun className="cursor-pointer h-6 w-6 md:h-8 md:w-8 text-yellow-300 rotate-0 transition-all" onClick={toggleTheme}/>) : 
                        (<Moon className="cursor-pointer h-6 w-6 md:h-8 md:w-8 rotate-0 transition-all" onClick={toggleTheme}/>) }
                    </div>
                    {themeHover && (
                        <span className="absolute hidden md:block z-60 right-[-4px] transition-all top-10 text-white font-semibold duration-200 uppercase text-nowrap bg-gray-800 rounded-sm text-xs p-1">
                            {themeHover}
                        </span>
                    )}

                </div>
            </div>
        </header>
    )
}

export default Header