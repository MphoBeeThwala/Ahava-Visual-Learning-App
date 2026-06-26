import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, MapPin, Download, Heart, BadgeCheck } from 'lucide-react'

const formatPrice = (price) => {
  if (price === 0 || price === null || price === undefined) return 'Free'
  return `R${price.toLocaleString('en-ZA')}`
}

export default function ExperienceCard({ exp }) {
  return (
    <Link to={`/experience/${exp.id}`} className="card-modern group block overflow-hidden">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={exp.image}
          alt={exp.title}
          loading="lazy"
          className="w-full h-full object-cover img-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {exp.premium && (
            <span className="badge-premium">
              <BadgeCheck className="w-3 h-3" /> Premium
            </span>
          )}
          {exp.price === 0 && (
            <span className="badge-free">
              Free
            </span>
          )}
        </div>

        {exp.vr && (
          <span className="absolute top-3 right-3 badge bg-sky-100 text-sky-700 border border-sky-200">
            VR
          </span>
        )}

        {exp.offline && (
          <span className="absolute bottom-3 left-3 badge bg-emerald-100 text-emerald-700 border border-emerald-200">
            <Download className="w-3 h-3" /> Offline
          </span>
        )}

        <span className="absolute bottom-3 right-3 badge bg-white/90 text-gray-800">
          Grade {exp.grade}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {exp.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {exp.country}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {Math.floor(exp.duration / 60)} min
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {exp.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-sm">{exp.rating}</span>
            <span className="text-gray-400 text-xs">({exp.reviews})</span>
          </div>
          <span className={`text-sm font-bold ${exp.price === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
            {formatPrice(exp.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}
