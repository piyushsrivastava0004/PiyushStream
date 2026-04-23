import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Info, Star } from 'lucide-react'
import { BACKDROP_URL, POSTER_URL, getTitle, getYear, getRating, getMediaType } from '../api/tmdb'

export default function Hero({ items = [] }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  if (!items || items.length === 0) {
    return (
      <div className="h-[85vh] bg-surface-2 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const item = items[current]
  const type = getMediaType(item)
  const title = getTitle(item)
  const year = getYear(item)
  const rating = getRating(item)
  const backdrop = BACKDROP_URL(item.backdrop_path, 'original')
  const poster = POSTER_URL(item.poster_path, 'w500')
  const overview = item.overview?.length > 200
    ? item.overview.slice(0, 200) + '...'
    : item.overview

  return (
    <div className="relative h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      {backdrop && (
        <div
          key={item.id}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/30" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex items-center gap-10 w-full">
          {/* Text Content */}
          <div className="flex-1 max-w-xl">
            {/* Type badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-violet-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {type === 'movie' ? 'Movie' : 'TV Show'}
              </span>
              {item.adult === false && (
                <span className="px-2 py-1 border border-gray-500 rounded text-xs text-gray-400">
                  HD
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} className="fill-yellow-400" />
                <span className="font-semibold">{rating}</span>
              </div>
              {year && <span className="text-gray-400">{year}</span>}
              {item.genre_ids?.slice(0, 2).map((id) => (
                <span key={id} className="text-gray-400" />
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              {overview}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/watch/${type}/${item.id}`)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/30"
              >
                <Play size={18} className="fill-white" />
                Watch Now
              </button>
              <button
                onClick={() => navigate(`/watch/${type}/${item.id}`)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <Info size={18} />
                More Info
              </button>
            </div>
          </div>

          {/* Poster - desktop only */}
          {poster && (
            <div className="hidden lg:block flex-shrink-0">
              <img
                src={poster}
                alt={title}
                className="w-48 xl:w-56 rounded-2xl shadow-2xl shadow-black/50 border border-white/10"
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Row */}
      <div className="absolute bottom-6 right-4 sm:right-8 flex gap-2">
        {items.slice(0, 5).map((it, i) => (
          <button
            key={it.id}
            onClick={() => setCurrent(i)}
            className={`w-12 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === current
                ? 'border-violet-500 scale-110'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={POSTER_URL(it.poster_path, 'w92')}
              alt={getTitle(it)}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
