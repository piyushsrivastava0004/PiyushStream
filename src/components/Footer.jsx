import { Link } from 'react-router-dom'
import { Zap, Github, Mail, Heart } from 'lucide-react'

const providers = [
  { name: 'Netflix', color: '#e50914' },
  { name: 'Prime', color: '#00a8e0' },
  { name: 'Disney+', color: '#113ccf' },
  { name: 'Hulu', color: '#1ce783' },
  { name: 'HBO Max', color: '#9747FF' },
  { name: 'Apple TV+', color: '#a2aaad' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d0d14] border-t border-white/5 mt-20">
      {/* Providers strip */}
      <div className="border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-medium">
            Content aggregated from
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {providers.map((p) => (
              <div
                key={p.name}
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold transition-all hover:bg-white/10 hover:border-white/20 cursor-default"
                style={{ color: p.color }}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-700 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="text-lg font-bold gradient-text">NovaStream</span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
            <Link to="/movies" className="hover:text-violet-400 transition-colors">Movies</Link>
            <Link to="/tv" className="hover:text-violet-400 transition-colors">TV Shows</Link>
            <Link to="/search" className="hover:text-violet-400 transition-colors">Search</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-lg transition-all hover:bg-white/10"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:contact@novastream.app"
              className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-lg transition-all hover:bg-white/10"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs leading-relaxed max-w-2xl mx-auto">
            NovaStream does not store any files on its server. All content is provided by
            non-affiliated third parties. Legal issues should be directed to the file hosts.
            This site uses the{' '}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline"
            >
              TMDB API
            </a>{' '}
            for metadata.
          </p>
          <p className="mt-4 text-gray-700 text-xs flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-violet-500 fill-violet-500" /> using React + TMDB
          </p>
        </div>
      </div>
    </footer>
  )
}
