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
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className=" mx-auto flex h-14 items-center justify-between px-8">
                <Link to={'/'}>
                    <img 
                        src="/logo.png" 
                        alt="weatherly_logo" 
                        className="w-32 h-auto"
                    />
                </Link>
                <div className="flex relative gap-6 items-center">
                    <CitySearch/>
                    <div 
                        onClick={toggleTheme}
                        className={`flex items-center relative cursor-pointer transition-transform duration-300 ${theme == 'dark' ? 'rotate-180' : 'rotate-0'}`}
                        onMouseEnter={() => setThemeHover(theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
                        onMouseLeave={() => setThemeHover('')}
                    >

                        {theme === 'dark' ? 
                        (<Sun className="cursor-pointer h-8 w-8 text-yellow-300 rotate-0 transition-all" onClick={toggleTheme}/>) : 
                        (<Moon className="cursor-pointer h-8 w-8 rotate-0 transition-all" onClick={toggleTheme}/>) }
                    </div>
                    {themeHover && (
                        <span className="absolute right-[-4px] transition-all top-10 text-white font-semibold duration-200 uppercase text-nowrap bg-gray-800 rounded-sm text-xs p-1">
                            {themeHover}
                        </span>
                    )}

                </div>
            </div>
        </header>
    )
}

export default Header