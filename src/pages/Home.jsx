import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import { getTrending, getPopularMovies, getTopRatedMovies, getPopularTV, getTopRatedTV, getNowPlayingMovies } from '../api/tmdb'

export default function Home() {
  const [trending, setTrending] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [popularTV, setPopularTV] = useState([])
  const [topRatedTV, setTopRatedTV] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [t, pm, trm, ptv, trtv, np] = await Promise.all([
          getTrending('week'),
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularTV(),
          getTopRatedTV(),
          getNowPlayingMovies(),
        ])
        setTrending(t.data.results || [])
        setPopularMovies(pm.data.results || [])
        setTopRatedMovies(trm.data.results || [])
        setPopularTV(ptv.data.results || [])
        setTopRatedTV(trtv.data.results || [])
        setNowPlaying(np.data.results || [])
      } catch (err) {
        console.error('Failed to fetch home data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <div>
      {/* Hero */}
      <Hero items={trending.slice(0, 5)} />

      {/* Content rows */}
      <div className="pt-8">
        <MovieRow
          title="Trending This Week"
          items={trending}
          loading={loading}
          viewAllLink="/movies"
        />
        <MovieRow
          title="Now Playing in Theaters"
          items={nowPlaying}
          loading={loading}
          viewAllLink="/movies"
        />
        <MovieRow
          title="Popular Movies"
          items={popularMovies}
          loading={loading}
          viewAllLink="/movies"
        />
        <MovieRow
          title="Top Rated Movies"
          items={topRatedMovies}
          loading={loading}
          viewAllLink="/movies"
        />
        <MovieRow
          title="Popular TV Shows"
          items={popularTV}
          loading={loading}
          viewAllLink="/tv"
        />
        <MovieRow
          title="Top Rated TV Shows"
          items={topRatedTV}
          loading={loading}
          viewAllLink="/tv"
        />
      </div>
    </div>
  )
}
