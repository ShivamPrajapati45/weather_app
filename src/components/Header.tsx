import { useTheme } from "@/context/theme-provider"
import { Link } from "react-router-dom"
import {Moon,Sun} from 'lucide-react'
import CitySearch from "./CitySearch";
const Header = () => {

    const { setTheme,theme } = useTheme();
    const toggleTheme = () => {
        if(theme == 'dark'){
            setTheme('light')
        }else{
            setTheme('dark')
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className=" mx-auto flex h-16 items-center justify-between px-4">
                <Link to={'/'}>
                    <h1 className="font-semibold text-lg">Logo</h1>
                </Link>
                <div className="flex gap-4 items-center">
                    <CitySearch/>
                    <div 
                        onClick={toggleTheme}
                        className={`flex items-center cursor-pointer transition-transform duration-300 ${theme == 'dark' ? 'rotate-180' : 'rotate-0'}`}>

                        {theme === 'dark' ? 
                        (<Sun className="cursor-pointer h-8 w-8 text-orange-300 rotate-0 transition-all" onClick={toggleTheme}/>) : 
                        (<Moon className="cursor-pointer h-8 w-8 rotate-0 transition-all" onClick={toggleTheme}/>) }
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header