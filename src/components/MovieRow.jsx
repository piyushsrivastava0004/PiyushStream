import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import SkeletonCard from './SkeletonCard'

export default function MovieRow({ title, items = [], loading = false, viewAllLink }) {
  const rowRef = useRef(null)

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 600, behavior: 'smooth' })
    }
  }

  return (
    <section className="mb-10">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          <span className="border-l-4 border-violet-500 pl-3">{title}</span>
        </h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors flex items-center gap-1"
          >
            View All <ChevronRight size={14} />
          </Link>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full bg-gradient-to-r from-[#0a0a0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-1"
        >
          <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors">
            <ChevronLeft size={18} />
          </div>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full bg-gradient-to-l from-[#0a0a0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-1"
        >
          <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors">
            <ChevronRight size={18} />
          </div>
        </button>

        {/* Cards */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-2"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}
