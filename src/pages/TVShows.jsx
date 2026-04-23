import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { getPopularTV, getTopRatedTV, getAiringTodayTV, getTVGenres, discoverTV } from '../api/tmdb'

const CATEGORIES = [
  { id: 'popular', label: 'Popular', fn: getPopularTV },
  { id: 'top_rated', label: 'Top Rated', fn: getTopRatedTV },
  { id: 'airing_today', label: 'Airing Today', fn: getAiringTodayTV },
]

export default function TVShows() {
  const [shows, setShows] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [category, setCategory] = useState('popular')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTVGenres().then((r) => setGenres(r.data.genres || []))
  }, [])

  const fetchShows = useCallback(async () => {
    setLoading(true)
    try {
      let res
      if (selectedGenre) {
        res = await discoverTV({ with_genres: selectedGenre, page })
      } else {
        const cat = CATEGORIES.find((c) => c.id === category)
        res = await cat.fn(page)
      }
      setShows(res.data.results || [])
      setTotalPages(Math.min(res.data.total_pages || 1, 500))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [category, selectedGenre, page])

  useEffect(() => {
    fetchShows()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [fetchShows])

  const handleCategory = (id) => {
    setCategory(id)
    setSelectedGenre(null)
    setPage(1)
  }

  const handleGenre = (id) => {
    setSelectedGenre(id === selectedGenre ? null : id)
    setPage(1)
  }

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black mb-6">
        <span className="gradient-text">TV Shows</span>
      </h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCategory(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === c.id && !selectedGenre
                ? 'bg-violet-600 text-white'
                : 'bg-surface text-gray-400 hover:text-white hover:bg-surface-2'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex items-center gap-1 text-gray-500 text-xs mr-1">
          <Filter size={12} /> Genres:
        </div>
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => handleGenre(g.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              selectedGenre === g.id
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'border-white/10 text-gray-400 hover:border-violet-500 hover:text-violet-400'
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 18 }).map((_, i) => <SkeletonCard key={i} />)
          : shows.map((s) => <MovieCard key={s.id} item={{ ...s, media_type: 'tv' }} />)}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 bg-surface rounded-lg text-sm disabled:opacity-40 hover:bg-surface-2 transition-colors disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="text-gray-400 text-sm">
            Page <span className="text-white font-semibold">{page}</span> of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 bg-surface rounded-lg text-sm disabled:opacity-40 hover:bg-surface-2 transition-colors disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
