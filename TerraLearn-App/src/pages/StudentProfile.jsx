import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Award, Flame, Download, Trash2 } from 'lucide-react'
import { badges, experiences } from '../data/experiences'

export default function StudentProfile() {
  const completed = 24
  const total = 200
  const progress = Math.round((completed / total) * 100)

  const inProgress = experiences.slice(0, 3)
  const offlineExps = experiences.filter(e => e.offline).slice(0, 4)

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Profile Card */}
        <div className="card p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-700 to-sky-500 flex items-center justify-center text-white text-2xl font-bold">AM</div>
            <div>
              <h2 className="text-2xl font-bold">Amara Mbeki</h2>
              <p className="text-sm text-gray-500">Grade 8 • Green Valley Secondary School</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Student</span>
                <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">Explorer</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-5">
            {[{ v: 24, l: 'Experiences', c: 'text-emerald-700' }, { v: 12, l: 'Badges', c: 'text-amber-600' }, { v: 7, l: 'Day Streak', c: 'text-sky-600' }].map(s => (
              <div key={s.l} className="flex-1 text-center p-3 bg-gray-100 rounded-xl">
                <div className={`text-2xl font-extrabold ${s.c}`}>{s.v}</div>
                <div className="text-xs text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 bg-emerald-800 text-white rounded-xl font-semibold text-sm">Edit Profile</button>
            <button className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm">Settings</button>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="card p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-4">🌍 Exploration Progress</h3>
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90">
              <circle cx="64" cy="64" r="52" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle cx="64" cy="64" r="52" fill="none" stroke="#1B5E20" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52} strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)} className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-extrabold">{progress}%</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">You've explored {completed} of {total} experiences!</p>
        </div>
      </div>

      {/* Badges */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">🏆 Achievement Badges</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className={`text-center p-4 rounded-xl transition-all ${badge.earned ? 'bg-gray-100 hover:-translate-y-1' : 'bg-gray-100 opacity-40 grayscale'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-2 ${badge.earned ? 'bg-gradient-to-br from-emerald-700 to-sky-500 text-white' : 'bg-gray-300'}`}>
                {badge.icon}
              </div>
              <div className="text-xs font-semibold">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">📚 Continue Learning</h3>
        <div className="space-y-3">
          {inProgress.map((exp, i) => (
            <div key={exp.id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
              <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{exp.title}</div>
                <div className="text-xs text-gray-500">📍 {exp.country} • ⏱ {Math.floor(exp.duration / 60)} min</div>
                <div className="h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${[45, 72, 18][i]}%` }} />
                </div>
              </div>
              <Link to={`/experience/${exp.id}`} className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium">Resume</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Library */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">💾 Offline Library</h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="font-semibold">Storage Used</div>
            <div className="text-sm text-gray-500">1.2 GB of 5 GB available</div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">24%</div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-emerald-700 rounded-full" style={{ width: '24%' }} />
        </div>
        <div className="space-y-2">
          {offlineExps.map(exp => (
            <div key={exp.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{exp.title}</div>
                <div className="text-xs text-gray-500">{(Math.random() * 200 + 100).toFixed(0)} MB</div>
              </div>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
