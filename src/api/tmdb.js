import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p'
export const POSTER_URL = (path, size = 'w342') =>
  path ? `${IMG_BASE}/${size}${path}` : null
export const BACKDROP_URL = (path, size = 'w1280') =>
  path ? `${IMG_BASE}/${size}${path}` : null

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'en-US' },
})

// Trending
export const getTrending = (timeWindow = 'week') =>
  api.get(`/trending/all/${timeWindow}`)

// Movies
export const getPopularMovies = (page = 1) =>
  api.get('/movie/popular', { params: { page } })
export const getTopRatedMovies = (page = 1) =>
  api.get('/movie/top_rated', { params: { page } })
export const getNowPlayingMovies = (page = 1) =>
  api.get('/movie/now_playing', { params: { page } })
export const getUpcomingMovies = (page = 1) =>
  api.get('/movie/upcoming', { params: { page } })
export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations' },
  })
export const getMovieGenres = () => api.get('/genre/movie/list')
export const discoverMovies = (params) => api.get('/discover/movie', { params })

// TV Shows
export const getPopularTV = (page = 1) =>
  api.get('/tv/popular', { params: { page } })
export const getTopRatedTV = (page = 1) =>
  api.get('/tv/top_rated', { params: { page } })
export const getAiringTodayTV = (page = 1) =>
  api.get('/tv/airing_today', { params: { page } })
export const getTVDetails = (id) =>
  api.get(`/tv/${id}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations' },
  })
export const getTVSeason = (tvId, seasonNum) =>
  api.get(`/tv/${tvId}/season/${seasonNum}`)
export const getTVGenres = () => api.get('/genre/tv/list')
export const discoverTV = (params) => api.get('/discover/tv', { params })

// Search
export const searchMulti = (query, page = 1) =>
  api.get('/search/multi', { params: { query, page } })

// Helpers
export const getTitle = (item) => item?.title || item?.name || 'Unknown'
export const getYear = (item) => {
  const date = item?.release_date || item?.first_air_date || ''
  return date ? date.slice(0, 4) : ''
}
export const getRating = (item) =>
  item?.vote_average ? item.vote_average.toFixed(1) : 'N/A'
export const getMediaType = (item) =>
  item?.media_type || (item?.title ? 'movie' : 'tv')

export const isApiKeySet = () =>
  Boolean(API_KEY) && API_KEY !== 'your_tmdb_api_key_here'

// Embed sources
export const getEmbedUrl = (type, id, season = 1, episode = 1, sourceIndex = 0) => {
  const movieSources = [
    `https://vidsrc.to/embed/movie/${id}`,
    `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
    `https://embed.su/embed/movie/${id}`,
    `https://multiembed.mov/?video_id=${id}&tmdb=1`,
  ]
  const tvSources = [
    `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
    `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    `https://embed.su/embed/tv/${id}/${season}/${episode}`,
    `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
  ]
  const sources = type === 'movie' ? movieSources : tvSources
  return sources[sourceIndex % sources.length]
}

export const EMBED_SOURCES = ['VidSrc', 'VidSrc XYZ', 'Embed.su', 'MultiEmbed']

export default api
