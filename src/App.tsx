import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/layout'
import { ThemeProvider } from './context/theme-provider'
import Dashboard from './pages/dashboard'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CityPage from './pages/city'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //after 5 minutes it will refresh with current data
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false
    }
  }
}) 

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
              <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/city/:cityName' element={<CityPage/>} />
              </Routes>
          </Layout>
          <Toaster richColors/>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  )
}

export default App
