import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, BookOpen, FlaskConical, Telescope, Landmark, TreePine } from 'lucide-react'
import ExperienceCard from '../components/ExperienceCard'
import { experiences, categories } from '../data/experiences'

export default function Home() {
  const featured = experiences.slice(0, 6)
  const stemFeatured = experiences.filter(e => e.category === 'stem').slice(0, 3)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10 animate-pulse"
              style={{ width: `${4 + Math.random() * 8}px`, height: `${4 + Math.random() * 8}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s`, animationDuration: `${4 + Math.random() * 4}s` }} />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            See the World.<br /><span className="text-amber-400">Learn the World.</span>
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Immersive field trips for every student — no bus ticket required. Explore 360° panoramas, interactive STEM labs, and AI-enhanced educational experiences from anywhere.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/browse" className="btn btn-primary text-lg px-8 py-4">
              🎓 Start Learning (Free) <ArrowRight size={20} />
            </Link>
            <Link to="/tourism" className="btn btn-secondary text-lg px-8 py-4">
              ✈️ Explore as Tourist
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center gap-12 md:gap-24 flex-wrap">
            {[{ val: '2,400+', label: 'Experiences' }, { val: '147', label: 'Countries' }, { val: '500K+', label: 'Students' }, { val: '100%', label: 'Free for Schools' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-amber-400">{s.val}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">How It Works</span>
          <h2>Three Steps to Anywhere</h2>
          <p>From the Serengeti to the International Space Station, from the human heart to chemical reactions — every student can explore.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: 1, title: 'Browse & Discover', desc: 'Search by subject, grade level, or location. Filter by curriculum alignment, STEM labs, accessibility features, or duration.', icon: Globe },
            { num: 2, title: 'Immerse & Experiment', desc: 'Drag through 360° panoramas, explore interactive STEM labs, mix virtual chemicals, and dissect organs layer by layer.', icon: FlaskConical },
            { num: 3, title: 'Learn & Quiz', desc: 'Complete embedded quizzes, earn badges, and track progress. Teachers get detailed analytics and curriculum tools.', icon: BookOpen }
          ].map(step => (
            <div key={step.num} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-700 to-sky-500 text-white flex items-center justify-center text-2xl font-extrabold mx-auto mb-5">
                {step.num}
              </div>
              <step.icon size={32} className="mx-auto mb-4 text-emerald-700" />
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Featured Experiences</span>
            <h2>Popular Field Trips</h2>
            <p>Handpicked immersive experiences from around the globe and the laboratory.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/browse" className="btn btn-outline inline-flex">View All Experiences →</Link>
          </div>
        </div>
      </section>

      {/* STEM Featured */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">New: STEM Labs</span>
          <h2>Science Up Close</h2>
          <p>Interactive biology, chemistry, and physics experiments that go where cameras can't.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {stemFeatured.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/stemlab" className="btn btn-outline inline-flex">Enter STEM Lab →</Link>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Technology</span>
            <h2>Powered by AI & LiDAR</h2>
            <p>Cutting-edge technology makes the impossible possible.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/stitching" className="card p-6 hover:-translate-y-1 cursor-pointer">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-xl font-bold mb-2">AI Content Stitching</h3>
              <p className="text-gray-500 text-sm mb-4">Our AI engine combines thousands of publicly available photos and videos into seamless, immersive 360° experiences.</p>
              <span className="text-sm font-semibold text-sky-600">Explore Stitching Lab →</span>
            </Link>
            <Link to="/lidar" className="card p-6 hover:-translate-y-1 cursor-pointer">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-bold mb-2">LiDAR 3D Mapping</h3>
              <p className="text-gray-500 text-sm mb-4">Future technology for creating walkable, measurable 3D replicas of real places. Explore point clouds and measure distances.</p>
              <span className="text-sm font-semibold text-sky-600">Visit LiDAR Lab →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Mission */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Dual Mission</span>
            <h2 className="text-white">Education First. Tourism Sustains.</h2>
            <p className="text-white/60">Every experience is free for students. Tourism subscriptions fund the platform and keep content growing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-emerald-400">🎓 For Students</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> 100% free access to all core experiences</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Interactive STEM labs with experiments</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Download for offline viewing</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Curriculum-aligned content and quizzes</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Multi-language narration and captions</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Works on any smartphone or computer</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Basic VR support with cardboard headsets</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-amber-400">✈️ For Tourists</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span> Premium 3D walkable experiences</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span> "See before you go" trip planning</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span> Live events and expert-guided tours</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span> 4K quality and spatial audio</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span> Ad-free experience</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span> Your subscription funds free education</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
