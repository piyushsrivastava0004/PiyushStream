import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Star, Calendar, Clock, ArrowLeft, ChevronDown, Tv, AlertCircle } from 'lucide-react'
import {
  getMovieDetails,
  getTVDetails,
  getTVSeason,
  POSTER_URL,
  BACKDROP_URL,
  getTitle,
  getYear,
  getRating,
  getEmbedUrl,
  EMBED_SOURCES,
} from '../api/tmdb'
import MovieCard from '../components/MovieCard'

export default function Watch() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [sourceIndex, setSourceIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setSeason(1)
    setEpisode(1)
    const fetcher = type === 'movie' ? getMovieDetails : getTVDetails
    fetcher(id)
      .then((r) => setDetails(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [type, id])

  useEffect(() => {
    if (type === 'tv' && details) {
      getTVSeason(id, season)
        .then((r) => setEpisodes(r.data.episodes || []))
        .catch(() => setEpisodes([]))
    }
  }, [type, id, season, details])

  const handleSourceChange = (idx) => {
    setSourceIndex(idx)
    setIframeKey((k) => k + 1)
  }

  const handleEpisodeSelect = (ep) => {
    setEpisode(ep)
    setIframeKey((k) => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!details) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-gray-400">Content not found.</p>
        <button onClick={() => navigate(-1)} className="text-violet-400 hover:underline">
          Go back
        </button>
      </div>
    )
  }

  const title = getTitle(details)
  const year = getYear(details)
  const rating = getRating(details)
  const backdrop = BACKDROP_URL(details.backdrop_path, 'original')
  const embedUrl = getEmbedUrl(type, id, season, episode, sourceIndex)
  const recommendations = details.recommendations?.results || details.similar?.results || []
  const cast = details.credits?.cast?.slice(0, 8) || []
  const genres = details.genres || []
  const seasons = details.seasons?.filter((s) => s.season_number > 0) || []

  return (
    <div className="pt-16 bg-[#0a0a0f] min-h-screen">
      {/* Video Player */}
      <div className="w-full bg-black" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
        <iframe
          key={iframeKey}
          src={embedUrl}
          title={title}
          allowFullScreen
          allow="autoplay; fullscreen"
          className="w-full h-full"
          style={{ border: 'none', height: '80vh', maxHeight: '80vh' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Info */}
          <div className="flex-1">
            {/* Source selector */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-gray-500 text-sm">Source:</span>
              {EMBED_SOURCES.map((s, i) => (
                <button
                  key={s}
                  onClick={() => handleSourceChange(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    sourceIndex === i
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : 'border-white/10 text-gray-400 hover:border-violet-500 hover:text-violet-400'
                  }`}
                >
                  {s}
                </button>
              ))}
              <span className="text-gray-600 text-xs ml-2">
                If one source doesn't work, try another
              </span>
            </div>

            {/* Title & Meta */}
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} className="fill-yellow-400" />
                <span className="font-semibold">{rating}/10</span>
              </div>
              {year && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Calendar size={14} /> {year}
                </div>
              )}
              {details.runtime && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={14} /> {details.runtime} min
                </div>
              )}
              {type === 'tv' && details.number_of_seasons && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Tv size={14} /> {details.number_of_seasons} Seasons
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-300 leading-relaxed mb-6">{details.overview}</p>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {cast.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 bg-surface rounded-lg px-3 py-1.5"
                    >
                      {c.profile_path ? (
                        <img
                          src={POSTER_URL(c.profile_path, 'w92')}
                          alt={c.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-xs">
                          {c.name[0]}
                        </div>
                      )}
                      <span className="text-gray-300 text-xs">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TV Season/Episode Selector */}
          {type === 'tv' && seasons.length > 0 && (
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                {/* Season selector */}
                <div className="p-4 border-b border-white/5">
                  <label className="text-gray-400 text-xs font-medium mb-2 block">SEASON</label>
                  <div className="relative">
                    <select
                      value={season}
                      onChange={(e) => { setSeason(Number(e.target.value)); setEpisode(1) }}
                      className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-violet-500"
                    >
                      {seasons.map((s) => (
                        <option key={s.season_number} value={s.season_number}>
                          Season {s.season_number}{s.name !== `Season ${s.season_number}` ? ` – ${s.name}` : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Episode list */}
                <div className="max-h-80 overflow-y-auto">
                  {episodes.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No episodes found
                    </div>
                  ) : (
                    episodes.map((ep) => (
                      <button
                        key={ep.episode_number}
                        onClick={() => handleEpisodeSelect(ep.episode_number)}
                        className={`w-full flex items-start gap-3 p-3 text-left transition-all hover:bg-white/5 border-b border-white/5 last:border-0 ${
                          episode === ep.episode_number ? 'bg-violet-600/20 border-l-2 border-l-violet-500' : ''
                        }`}
                      >
                        {ep.still_path ? (
                          <img
                            src={POSTER_URL(ep.still_path, 'w92')}
                            alt={ep.name}
                            className="w-16 h-10 object-cover rounded flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-10 bg-surface-2 rounded flex-shrink-0 flex items-center justify-center text-gray-600 text-xs">
                            E{ep.episode_number}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium truncate">
                            {ep.episode_number}. {ep.name}
                          </p>
                          {ep.vote_average > 0 && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star size={9} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-yellow-400 text-xs">{ep.vote_average.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">
              <span className="border-l-4 border-violet-500 pl-3">More Like This</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommendations.slice(0, 12).map((item) => (
                <MovieCard key={item.id} item={{ ...item, media_type: item.media_type || type }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
