import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Star, Check, ArrowRight, Shield, Wifi, Download, Headphones, Users, Calendar } from 'lucide-react'
import { experiences } from '../data/experiences'
import ExperienceCard from '../components/ExperienceCard'

const tourismCategories = [
  { id: 'safari', label: 'Safari & Wildlife', icon: '🦁', desc: 'Big Five and more' },
  { id: 'culture', label: 'Culture & Heritage', icon: '🏛️', desc: 'History and traditions' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️', desc: 'Mountains and thrills' },
  { id: 'wine', label: 'Wine & Food', icon: '🍷', desc: 'Culinary experiences' },
]

const saExperiences = experiences.filter(e => e.country === 'South Africa')

const pricingPlans = [
  {
    name: 'Student',
    price: 'R0',
    period: '/month',
    desc: 'Always free for learners',
    featured: false,
    features: [
      'All core experiences',
      '360° photo & video',
      'Basic quizzes',
      '5GB offline downloads',
      'Standard quality',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Explorer',
    price: 'R180',
    period: '/month',
    desc: 'For passionate travelers',
    featured: true,
    features: [
      'Everything in Student',
      'Premium 3D experiences',
      '4K quality streaming',
      'Ad-free experience',
      'Unlimited offline',
      'Trip planner tool',
    ],
    cta: 'Start Exploring',
  },
  {
    name: 'Voyager',
    price: 'R360',
    period: '/month',
    desc: 'For the ultimate explorer',
    featured: false,
    features: [
      'Everything in Explorer',
      'Live guided tours',
      'Expert Q&A sessions',
      'Walkable 3D scenes',
      'Spatial audio',
      'Priority support',
    ],
    cta: 'Go Voyager',
  },
]

const highlights = [
  { icon: Shield, title: 'Safe & Secure', desc: 'Verified content, safe for all ages' },
  { icon: Wifi, title: 'Works Offline', desc: 'Download before you travel' },
  { icon: Download, title: '4K Quality', desc: 'Crystal clear immersive video' },
  { icon: Headphones, title: 'Spatial Audio', desc: 'Directional sound for immersion' },
  { icon: Users, title: 'Classroom Ready', desc: 'Built for teachers and students' },
  { icon: Calendar, title: 'Always Available', desc: '24/7 access to all experiences' },
]

export default function Tourism() {
  const [activeTab, setActiveTab] = useState('safari')
  const navigate = useNavigate()

  const filtered = saExperiences.filter(exp => {
    const catMap = {
      safari: ['wildlife'],
      culture: ['monuments', 'township', 'museum', 'archaeology'],
      adventure: ['mountains', 'canyons', 'coastal', 'caves', 'marine'],
      wine: ['food'],
    }
    return catMap[activeTab]?.includes(exp.subcategory)
  })

  const premium = saExperiences.filter(e => e.premium).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80"
            alt="South Africa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container-modern relative z-10 pt-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              <span className="text-lg">🇿🇦</span> South Africa
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Discover<br />
              <span className="text-emerald-400">Mzansi</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              Premium immersive experiences across South Africa. 
              Your subscription funds free education for students nationwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => document.getElementById('experiences').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-base px-8 py-4"
              >
                Start Exploring <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
                className="btn-modern bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md text-base px-8 py-4"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-modern">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '15+', label: 'Destinations' },
              { val: '50+', label: 'Experiences' },
              { val: '11', label: 'Languages' },
              { val: '100%', label: 'Funds Education' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-600">{s.val}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="experiences" className="section">
        <div className="container-modern">
          <div className="section-header">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Experiences</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From Kruger to Cape Town, experience South Africa's wonders
            </p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {tourismCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 ${
                  activeTab === cat.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-[1.02]'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-bold text-sm">{cat.label}</div>
                <div className={`text-xs mt-1 ${activeTab === cat.id ? 'text-emerald-100' : 'text-gray-400'}`}>
                  {cat.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg text-gray-500">No experiences in this category yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(exp => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium Section */}
      <section className="section bg-gray-50">
        <div className="container-modern">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Premium</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Exclusive Experiences
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {premium.map(exp => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="container-modern">
          <div className="section-header">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
              Built for South Africa
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="card-modern p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section bg-gray-900">
        <div className="container-modern">
          <div className="section-header">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">
              Choose Your Journey
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Every subscription supports free access for students in underserved communities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.featured
                    ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-600/25 scale-105 z-10'
                    : 'bg-gray-800 text-white hover:bg-gray-750'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={`text-sm mt-1 ${plan.featured ? 'text-emerald-100' : 'text-gray-400'}`}>
                  {plan.desc}
                </p>
                <div className="mt-6 mb-8">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className={`text-lg ${plan.featured ? 'text-emerald-200' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-emerald-200' : 'text-emerald-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                    plan.featured
                      ? 'bg-white text-emerald-700 hover:bg-gray-100'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
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
