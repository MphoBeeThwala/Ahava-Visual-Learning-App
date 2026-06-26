import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, Download, Share2, Bookmark, MapPin, Clock, Star, ArrowLeft, ChevronRight, Check, X } from 'lucide-react'
import { experiences } from '../data/experiences'
import * as THREE from 'three'

const formatPrice = (price) => {
  if (price === 0 || price === null || price === undefined) return 'Free'
  return `R${price.toLocaleString('en-ZA')}`
}

export default function ExperienceDetail() {
  const { id } = useParams()
  const exp = experiences.find(e => e.id === parseInt(id)) || experiences[0]
  const [viewerOpen, setViewerOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const viewerRef = useRef(null)
  const rendererRef = useRef(null)

  useEffect(() => {
    if (!viewerOpen || !viewerRef.current || rendererRef.current) return
    const container = viewerRef.current
    const width = container.offsetWidth
    const height = container.offsetHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const geometry = new THREE.SphereGeometry(50, 60, 40)
    geometry.scale(-1, 1, 1)
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(exp.image, (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)
    }, undefined, () => {
      const material = new THREE.MeshBasicMaterial({ color: 0x1a3a5c })
      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)
    })

    camera.position.set(0, 0, 0.1)
    let rotX = 0, rotY = 0, dragging = false, prevX = 0, prevY = 0

    const onMouseDown = (e) => { dragging = true; prevX = e.clientX; prevY = e.clientY }
    const onMouseMove = (e) => {
      if (!dragging) return
      rotY -= (e.clientX - prevX) * 0.003
      rotX -= (e.clientY - prevY) * 0.003
      rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX))
      prevX = e.clientX; prevY = e.clientY
    }
    const onMouseUp = () => { dragging = false }
    const onWheel = (e) => { camera.fov = Math.max(30, Math.min(120, camera.fov + e.deltaY * 0.05)); camera.updateProjectionMatrix() }

    const canvas = renderer.domElement
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('wheel', onWheel)

    let anim
    function render() {
      anim = requestAnimationFrame(render)
      scene.children.forEach(child => { if (child.type === 'Mesh') { child.rotation.y = rotY; child.rotation.x = rotX } })
      renderer.render(scene, camera)
    }
    render()

    return () => {
      cancelAnimationFrame(anim)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('wheel', onWheel)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      rendererRef.current = null
    }
  }, [viewerOpen, exp.image])

  const quiz = exp.quiz || { question: 'Sample question?', options: ['A', 'B', 'C', 'D'], correct: 0 }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] cursor-pointer group" onClick={() => setViewerOpen(true)}>
        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container-modern">
            <div className="flex items-center gap-2 mb-4">
              {exp.premium && <span className="badge-premium"><Check className="w-3 h-3" /> Premium</span>}
              {exp.price === 0 && <span className="badge-free">Free</span>}
              {exp.vr && <span className="badge-vr">VR Ready</span>}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{exp.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {exp.country}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {Math.floor(exp.duration / 60)} min</span>
              <span className="flex items-center gap-1.5">Grade {exp.grade}</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {exp.rating} ({exp.reviews})</span>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-white ml-1" />
        </div>
      </div>

      {/* Content */}
      <div className="container-modern py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="card-modern p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Experience</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{exp.description}</p>
              <h3 className="font-bold text-gray-900 mb-3">Learning Outcomes</h3>
              <ul className="space-y-2">
                {exp.learning.map((l, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            {/* Teacher Notes */}
            <div className="card-modern p-6 md:p-8 bg-emerald-50/50 border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Teacher Notes</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong className="text-gray-900">Pre-trip:</strong> Ask students what they already know about {exp.category === 'nature' ? 'this ecosystem' : exp.category === 'stem' ? 'this science topic' : 'this historical site'}.</p>
                <p><strong className="text-gray-900">During:</strong> Encourage students to click all hotspots and listen to full narration before attempting the quiz.</p>
                <p><strong className="text-gray-900">Post-trip:</strong> Have students write a reflection or create a presentation about what they learned.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="card-modern p-6">
              <div className="text-center mb-6">
                <div className={`text-4xl font-extrabold ${exp.price === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {formatPrice(exp.price)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {exp.price === 0 ? 'Free forever' : 'One-time access'}
                </div>
              </div>
              <div className="space-y-3">
                <button onClick={() => setViewerOpen(true)} className="btn-primary w-full">
                  <Play className="w-4 h-4" /> Start Experience
                </button>
                <button className="btn-secondary w-full">
                  <Download className="w-4 h-4" /> Download Offline
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isBookmarked ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mx-auto ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                  <Share2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="card-modern p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900 capitalize">{exp.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subcategory</span>
                  <span className="font-medium text-gray-900 capitalize">{exp.subcategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{Math.floor(exp.duration / 60)} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grade Level</span>
                  <span className="font-medium text-gray-900">{exp.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-medium text-gray-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {exp.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10">
          <Link to="/browse" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Browse
          </Link>
        </div>
      </div>

      {/* 360 Viewer Overlay */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setViewerOpen(false)} className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <span className="text-white font-semibold">{exp.title}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setQuizOpen(true)} className="px-4 py-2 rounded-xl bg-amber-500 text-gray-900 font-semibold text-sm hover:bg-amber-400 transition-colors">
                Quiz
              </button>
              <button onClick={() => setViewerOpen(false)} className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div ref={viewerRef} className="flex-1 relative cursor-grab active:cursor-grabbing" />
        </div>
      )}

      {/* Quiz Overlay */}
      {quizOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scale">
            <h3 className="text-xl font-bold text-center mb-2">🎯 Quiz Time!</h3>
            <p className="text-gray-600 text-center mb-6">{quiz.question}</p>
            <div className="space-y-3">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuizAnswer(i)}
                  disabled={quizAnswer !== null}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    quizAnswer === null
                      ? 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
                      : quizAnswer === i
                        ? (i === quiz.correct ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50')
                        : i === quiz.correct
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 opacity-50'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            {quizAnswer !== null && (
              <div className={`text-center mt-4 font-semibold ${quizAnswer === quiz.correct ? 'text-emerald-600' : 'text-red-600'}`}>
                {quizAnswer === quiz.correct ? '✅ Correct! Well done!' : `❌ The correct answer was ${String.fromCharCode(65 + quiz.correct)}.`}
              </div>
            )}
            <button onClick={() => { setQuizOpen(false); setQuizAnswer(null) }} className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
