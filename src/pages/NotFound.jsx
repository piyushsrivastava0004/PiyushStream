import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black gradient-text mb-4">404</div>
      <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
      >
        <Home size={18} /> Go Home
      </button>
    </div>
  )
}
