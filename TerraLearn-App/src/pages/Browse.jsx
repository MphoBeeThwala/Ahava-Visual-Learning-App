import React, { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X, MapPin, Clock, Star } from 'lucide-react'
import { experiences, categories } from '../data/experiences'
import ExperienceCard from '../components/ExperienceCard'

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'duration', label: 'Duration' },
]

export default function Browse() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [offlineOnly, setOfflineOnly] = useState(false)
  const [premiumOnly, setPremiumOnly] = useState(false)

  const filtered = experiences
    .filter(e => {
      if (activeCategory !== 'all' && e.category !== activeCategory) return false
      if (offlineOnly && !e.offline) return false
      if (premiumOnly && !e.premium) return false
      if (e.price < priceRange[0] || e.price > priceRange[1]) return false
      if (search) {
        const q = search.toLowerCase()
        return e.title.toLowerCase().includes(q) || 
               e.country.toLowerCase().includes(q) || 
               e.description.toLowerCase().includes(q)
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'duration') return a.duration - b.duration
      return 0
    })

  const activeFiltersCount = [
    activeCategory !== 'all',
    offlineOnly,
    premiumOnly,
    priceRange[0] > 0 || priceRange[1] < 1000
  ].filter(Boolean).length

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-modern">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Explore Experiences
          </h1>
          <p className="text-gray-500">
            {filtered.length} experience{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, experiences..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-modern pl-12"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-modern md:w-48 appearance-none cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-modern border ${activeFiltersCount > 0 ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 'border-gray-200 text-gray-600'} md:w-auto`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">R{priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-sm text-gray-500">R{priceRange[1]}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offlineOnly}
                    onChange={e => setOfflineOnly(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Offline only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={premiumOnly}
                    onChange={e => setPremiumOnly(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Premium only</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setActiveCategory('all')
                    setPriceRange([0, 1000])
                    setOfflineOnly(false)
                    setPremiumOnly(false)
                    setSearch('')
                  }}
                  className="text-sm text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(exp => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setActiveCategory('all')
                setPriceRange([0, 1000])
                setOfflineOnly(false)
                setPremiumOnly(false)
                setSearch('')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
