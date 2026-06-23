import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import ExperienceCard from '../components/ExperienceCard'
import { experiences, categories } from '../data/experiences'

export default function Browse() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [offlineOnly, setOfflineOnly] = useState(false)

  const filtered = experiences.filter(e => {
    if (activeCategory !== 'all' && e.category !== activeCategory) return false
    if (offlineOnly && !e.offline) return false
    if (search) {
      const q = search.toLowerCase()
      return e.title.toLowerCase().includes(q) || e.country.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">Explore Experiences</h1>
        <button className="btn btn-sm btn-primary bg-emerald-800 text-white">+ Contribute</button>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search experiences, places, subjects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
          />
        </div>
        <button
          onClick={() => setOfflineOnly(!offlineOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${offlineOnly ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-gray-600 border-gray-200'}`}
        >
          <Filter size={14} /> Offline only
        </button>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`filter-chip whitespace-nowrap ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No experiences match your filters.</p>
          <p className="text-sm">Try broadening your search or selecting a different category.</p>
        </div>
      )}
    </div>
  )
}
