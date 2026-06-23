import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Download, Heart, Clock, MapPin } from 'lucide-react'

export default function ExperienceCard({ exp }) {
  return (
    <Link to={`/experience/${exp.id}`} className="card group block">
      <div className="relative h-48 overflow-hidden">
        <img
          src={exp.image}
          alt={exp.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {exp.premium && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-gray-900 text-xs font-semibold rounded-full">
            Premium
          </span>
        )}
        {exp.vr && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-sky-500 text-white text-xs font-semibold rounded-full">
            VR
          </span>
        )}
        {exp.offline && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
            Offline
          </span>
        )}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
          Grade {exp.grade}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1.5 line-clamp-1">{exp.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1"><MapPin size={12} /> {exp.country}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {Math.floor(exp.duration / 60)} min</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star size={16} className="text-amber-400 fill-amber-400" />
          <span className="font-semibold">{exp.rating}</span>
          <span className="text-gray-400 text-xs">({exp.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex gap-1.5">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Download size={14} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Heart size={14} />
            </button>
          </div>
          <span className="text-sm font-semibold text-emerald-700">Explore →</span>
        </div>
      </div>
    </Link>
  )
}
