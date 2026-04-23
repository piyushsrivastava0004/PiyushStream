import { Link } from 'react-router-dom'
import { Star, Play } from 'lucide-react'
import { POSTER_URL, getTitle, getYear, getRating, getMediaType } from '../api/tmdb'

export default function MovieCard({ item }) {
  if (!item) return null
  const type = getMediaType(item)
  const title = getTitle(item)
  const year = getYear(item)
  const rating = getRating(item)
  const poster = POSTER_URL(item.poster_path, 'w342')

  return (
    <Link
      to={`/watch/${type}/${item.id}`}
      className="group relative flex-shrink-0 w-36 sm:w-44 rounded-xl overflow-hidden bg-surface card-glow transition-all duration-300 hover:scale-105 hover:z-10"
    >
      {/* Poster Image */}
      <div className="aspect-[2/3] relative overflow-hidden bg-surface-2">
        {poster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-2 text-gray-600">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg">
                <Play size={16} className="text-white fill-white ml-0.5" />
              </div>
            </div>
            <p className="text-white text-xs font-semibold text-center line-clamp-2 leading-tight">
              {title}
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 text-xs font-medium">{rating}</span>
              {year && <span className="text-gray-400 text-xs">· {year}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-2">
        <p className="text-white text-xs font-medium truncate">{title}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          <span className="text-gray-400 text-xs">{rating}</span>
          {year && <span className="text-gray-500 text-xs">· {year}</span>}
        </div>
      </div>
    </Link>
  )
}
