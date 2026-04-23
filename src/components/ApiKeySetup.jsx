import { Zap, ExternalLink } from 'lucide-react'

export default function ApiKeySetup() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-900/30">
          <Zap size={30} className="text-white fill-white" />
        </div>

        <h1 className="text-3xl font-black text-white mb-3">
          Welcome to <span className="gradient-text">NovaStream</span>
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          To get started, you need a free TMDB API key. It takes less than 2 minutes to get one.
        </p>

        {/* Steps */}
        <div className="bg-surface rounded-2xl border border-white/10 p-6 text-left mb-6 space-y-4">
          {[
            { step: '1', text: 'Go to themoviedb.org and create a free account' },
            { step: '2', text: 'Navigate to Settings → API and request an API key' },
            { step: '3', text: 'Copy your API key (v3 auth)' },
            { step: '4', text: 'Open the .env file in your project root' },
            { step: '5', text: 'Replace your_tmdb_api_key_here with your actual key' },
            { step: '6', text: 'Restart the dev server with: npm run dev' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {step}
              </div>
              <p className="text-gray-300 text-sm">{text}</p>
            </div>
          ))}
        </div>

        {/* .env preview */}
        <div className="bg-[#0d0d14] rounded-xl border border-green-500/30 p-4 text-left mb-6 font-mono text-sm">
          <p className="text-gray-500 mb-1"># .env</p>
          <p className="text-green-400">
            VITE_TMDB_API_KEY=<span className="text-yellow-400">your_actual_key_here</span>
          </p>
        </div>

        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105"
        >
          Get Free API Key
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}
