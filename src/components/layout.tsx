import type { PropsWithChildren } from 'react'
import Header from './Header'

const layout = ({children}: PropsWithChildren) => {
    return (
        <div className='bg-gradient-to-br from-background to-muted'>
            <Header/>
            <main className='min-h-screen w-full mx-auto px-4 py-4 container'>
                {children}
            </main>
            <footer className='border-t hidden backdrop-blur-md py-12 bg-[#233445] supports-[backdrop-filter]:bg-background/60'>
                <div className='container mx-auto px-4 text-center'>
                    <p className='text-xl font-bold italic'>
                        Made with ❤️ love
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default layout