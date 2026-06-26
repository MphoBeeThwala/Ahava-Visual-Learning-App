import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, Users, BookOpen, Globe, Zap, Shield } from 'lucide-react'
import { experiences } from '../data/experiences'
import ExperienceCard from '../components/ExperienceCard'

const stats = [
  { value: '50+', label: 'Experiences', icon: Globe },
  { value: '15', label: 'SA Destinations', icon: MapPin },
  { value: '10K+', label: 'Students', icon: Users },
  { value: '4.9', label: 'Avg Rating', icon: Star },
]

const features = [
  { icon: Play, title: 'Immersive 360°', desc: 'Explore destinations in full 360° before you travel' },
  { icon: BookOpen, title: 'Curriculum Aligned', desc: 'Content mapped to South African school curriculum' },
  { icon: Zap, title: 'Interactive STEM', desc: 'Virtual labs for biology, chemistry, and physics' },
  { icon: Shield, title: 'Offline Ready', desc: 'Download experiences for areas with poor connectivity' },
]

const featuredExperiences = experiences.filter(e => e.rating >= 4.8).slice(0, 6)

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80"
            alt="Kruger National Park"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container-modern relative z-10 pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Now available across South Africa
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Explore Before<br />
              <span className="text-emerald-400">You Travel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Immersive 360° experiences of South Africa's most iconic destinations. 
              From Kruger to Table Mountain, discover Mzansi before you book.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/browse" className="btn-primary text-base px-8 py-4">
                Start Exploring <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tourism" className="btn-modern bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md text-base px-8 py-4">
                <Play className="w-5 h-5" /> Watch Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="container-modern">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="glass rounded-2xl p-4 md:p-6 text-center">
                    <Icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-gray-50">
        <div className="container-modern">
          <div className="section-header">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Why TerraLearn</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
              Learn Through Experience
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              South Africa's first immersive educational platform combining tourism, STEM, and cultural heritage
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="card-modern p-6 md:p-8 text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="section">
        <div className="container-modern">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Featured</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Top Rated Experiences
              </h2>
            </div>
            <Link to="/browse" className="hidden md:flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.map(exp => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/browse" className="btn-primary">
              View All Experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-900">
        <div className="container-modern text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Explore<br /><span className="text-emerald-400">South Africa?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of students and travelers discovering the beauty of Mzansi through immersive experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tourism" className="btn-primary text-base px-8 py-4">
              Explore Tourism <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/stem-lab" className="btn-modern bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md text-base px-8 py-4">
              Try STEM Lab
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
