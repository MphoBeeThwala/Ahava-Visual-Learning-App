import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, Heart, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-sm">🌍</div>
              <span>TerraLearn</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Immersive visual learning for every student, everywhere. A social enterprise dedicated to educational equity through technology.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link to="/browse" className="hover:text-white transition-colors">All Experiences</Link>
              <Link to="/stemlab" className="hover:text-white transition-colors">STEM Lab</Link>
              <Link to="/tourism" className="hover:text-white transition-colors">Tourism</Link>
              <Link to="/upload" className="hover:text-white transition-colors">Contribute</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Educators</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link to="/teacher" className="hover:text-white transition-colors">Teacher Dashboard</Link>
              <Link to="/browse" className="hover:text-white transition-colors">Curriculum Builder</Link>
              <Link to="/upload" className="hover:text-white transition-colors">Content Requests</Link>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"><Twitter size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"><Github size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"><Mail size={16} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2024 TerraLearn. Built for every student, everywhere.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for educational equity
          </p>
        </div>
      </div>
    </footer>
  )
}
