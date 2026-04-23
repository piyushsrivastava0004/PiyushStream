import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, X, Menu, Tv, Film, Home, Zap } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/movies', label: 'Movies', icon: Film },
    { to: '/tv', label: 'TV Shows', icon: Tv },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5 shadow-xl'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="text-xl font-bold gradient-text tracking-tight">
                PiyushStream
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(to)
                      ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search bar - desktop */}
              <div className="hidden md:flex items-center">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      ref={searchRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search movies & shows..."
                      className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-violet-500 w-56 transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-r-lg transition-colors"
                    >
                      <Search size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                      className="ml-2 p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Mobile search */}
              <button
                onClick={() => navigate('/search')}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0a0a0f]/95">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(to)
                      ? 'bg-violet-600/20 text-violet-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
