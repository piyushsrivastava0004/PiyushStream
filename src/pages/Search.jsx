import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, X } from 'lucide-react'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { searchMulti } from '../api/tmdb'

export default function Search() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [inputVal, setInputVal] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    setInputVal(q)
    setPage(1)
  }, [searchParams])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setTotalResults(0)
      return
    }
    setLoading(true)
    searchMulti(query, page)
      .then((r) => {
        setResults(r.data.results?.filter((i) => i.media_type !== 'person') || [])
        setTotalResults(r.data.total_results || 0)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [query, page])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputVal.trim())}`)
    }
  }

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search for movies, TV shows..."
            className="w-full bg-surface border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-500 text-lg outline-none focus:border-violet-500 transition-colors"
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => { setInputVal(''); inputRef.current?.focus() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {/* Results Header */}
      {query && !loading && (
        <p className="text-gray-400 text-sm mb-6">
          {totalResults > 0
            ? `Found ${totalResults.toLocaleString()} results for "${query}"`
            : `No results for "${query}"`}
        </p>
      )}

      {/* Empty state */}
      {!query && (
        <div className="text-center py-20">
          <SearchIcon size={64} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Search for your favorite movies and TV shows</p>
        </div>
      )}

      {/* Results Grid */}
      {(loading || results.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : results.map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  )
}
