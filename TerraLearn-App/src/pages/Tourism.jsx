import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, MapPin, Plane } from 'lucide-react'
import ExperienceCard from '../components/ExperienceCard'
import { experiences } from '../data/experiences'

export default function Tourism() {
  const premium = experiences.filter(e => e.premium).slice(0, 6)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[300px] rounded-2xl mx-4 mt-20 overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Explore Before You Go.<br /><span className="text-amber-400">Travel Deeper.</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-8">Premium immersive experiences for the curious traveler. Your subscription funds free education for students worldwide.</p>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary text-lg px-8 py-4">🗺️ Plan a Trip</button>
            <button className="btn btn-secondary text-lg px-8 py-4">📅 Live Events</button>
          </div>
        </div>
      </section>

      {/* Premium Experiences */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Premium</span>
          <h2>Exclusive Experiences</h2>
          <p>High-fidelity 3D scenes, expert guides, and live events.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premium.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Pricing</span>
            <h2>Choose Your Journey</h2>
            <p>Every subscription directly supports free access for students in underserved communities.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Student', price: '$0', period: '/month', desc: 'Always free', features: ['All core experiences', '360° photo & video', 'Basic quizzes', 'Offline downloads (5GB)', 'Standard quality'], cta: 'Get Started', featured: false },
              { name: 'Explorer', price: '$9.99', period: '/month', desc: 'For passionate travelers', features: ['Everything in Student', 'Premium 3D experiences', '4K quality streaming', 'Ad-free experience', 'Offline unlimited', 'Trip planner tool'], cta: 'Subscribe', featured: true },
              { name: 'Voyager', price: '$19.99', period: '/month', desc: 'For the ultimate explorer', features: ['Everything in Explorer', 'Live events access', 'Expert-guided tours', 'Walkable 3D scenes', 'Spatial audio', 'Priority support'], cta: 'Subscribe', featured: false }
            ].map(plan => (
              <div key={plan.name} className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:-translate-y-1 hover:shadow-xl ${plan.featured ? 'border-amber-400 shadow-lg' : 'border-gray-200'}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">MOST POPULAR</div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <div className="text-4xl font-extrabold text-gray-900 mb-6">{plan.price}<span className="text-base font-normal text-gray-500">{plan.period}</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600"><Check size={16} className="text-emerald-600 flex-shrink-0" /> {f}</li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.featured ? 'bg-amber-400 text-gray-900 hover:bg-amber-500' : 'border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
