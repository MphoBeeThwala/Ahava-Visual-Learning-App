import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Globe, Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/browse', label: 'Explore' },
  { path: '/stemlab', label: 'STEM Lab' },
  { path: '/lidar', label: 'LiDAR' },
  { path: '/stitching', label: 'AI Stitch' },
  { path: '/teacher', label: 'Teachers' },
  { path: '/student', label: 'Profile' },
  { path: '/tourism', label: 'Tourism' },
  { path: '/upload', label: 'Contribute' }
]

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-all ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-xl text-emerald-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-sky-500 flex items-center justify-center text-white text-lg">🌍</div>
          <span>TerraLearn</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Offline Ready</span>
          </div>
          <button className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
            Demo Mode
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-3 bg-white">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
