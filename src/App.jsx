import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Watch from './pages/Watch'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import ApiKeySetup from './components/ApiKeySetup'
import { isApiKeySet } from './api/tmdb'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  if (!isApiKeySet()) {
    return <ApiKeySetup />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/watch/:type/:id" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
