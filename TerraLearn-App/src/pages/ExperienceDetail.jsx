import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, Download, Share2, Bookmark, BookOpen, MapPin, Clock, Star, ArrowLeft, ChevronRight } from 'lucide-react'
import { experiences } from '../data/experiences'
import * as THREE from 'three'

export default function ExperienceDetail() {
  const { id } = useParams()
  const exp = experiences.find(e => e.id === parseInt(id)) || experiences[0]
  const [viewerOpen, setViewerOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)
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
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] cursor-pointer" onClick={() => setViewerOpen(true)}>
        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{exp.title}</h1>
          <div className="flex gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><MapPin size={14} /> {exp.country}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {Math.floor(exp.duration / 60)} min</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> Grade {exp.grade}</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {exp.rating}</span>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center text-3xl animate-pulse">
          ▶
        </div>
      </div>

      <div className="px-4 max-w-7xl mx-auto py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-3">About This Experience</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{exp.description}</p>
            <h4 className="font-bold text-sm mb-2">Learning Outcomes:</h4>
            <ul className="space-y-1">
              {exp.learning.map((l, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2"><span className="text-emerald-600">✓</span> {l}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-3">Interactive Hotspots</h3>
            <div className="space-y-2">
              {exp.hotspots?.map((h, i) => (
                <div key={i} onClick={() => setViewerOpen(true)} className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-700 to-sky-500 flex items-center justify-center text-white text-sm">📍</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{h.title}</div>
                    <div className="text-xs text-gray-500">{h.desc.substring(0, 60)}...</div>
                  </div>
                </div>
              )) || <p className="text-sm text-gray-500">No hotspots available for this experience.</p>}
            </div>
          </div>
        </div>

        <div className="card p-6 mb-6">
          <h3 className="text-lg font-bold mb-3">Teacher Notes</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Pre-trip discussion:</strong> Ask students what they already know about {exp.category === 'nature' ? 'this ecosystem' : exp.category === 'stem' ? 'this science topic' : 'this historical site'}.</p>
            <p><strong>During the experience:</strong> Encourage students to click all hotspots and listen to the full narration before attempting the quiz.</p>
            <p><strong>Post-trip activity:</strong> Have students write a reflection or create a presentation about what they learned.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={() => setViewerOpen(true)} className="btn btn-primary bg-emerald-800 text-white">🎬 Start Experience</button>
          <button className="btn btn-outline">💾 Download Offline</button>
          <button className="btn btn-outline">📋 Add to Class</button>
          <button className="btn btn-outline">🔗 Share</button>
          <Link to="/browse" className="btn btn-ghost"><ArrowLeft size={18} /> Back to Browse</Link>
        </div>
      </div>

      {/* 360° Viewer Overlay */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setViewerOpen(false)} className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors">←</button>
              <span className="text-white font-semibold">{exp.title}</span>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors">🥽</button>
              <button className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors">⚙️</button>
              <button onClick={() => setViewerOpen(false)} className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors">✕</button>
            </div>
          </div>
          <div ref={viewerRef} className="flex-1 relative cursor-grab active:cursor-grabbing" />
          <div className="p-4 bg-gradient-to-t from-black/70 to-transparent z-10 flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">⏸</button>
            <button className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">⏮</button>
            <button className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">⏭</button>
            <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer">
              <div className="h-full w-1/3 bg-amber-400 rounded-full" />
            </div>
            <button onClick={() => setQuizOpen(true)} className="px-4 py-2 bg-amber-400 text-gray-900 rounded-xl font-semibold text-sm hover:bg-amber-500 transition-colors">Quiz</button>
            <button className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">CC</button>
          </div>
        </div>
      )}

      {/* Quiz Overlay */}
      {quizOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scale">
            <h3 className="text-xl font-bold mb-2 text-center">🧠 Quiz Time!</h3>
            <p className="text-gray-600 text-center mb-6">{quiz.question}</p>
            <div className="space-y-3">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuizAnswer(i)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    quizAnswer === null ? 'border-gray-200 hover:border-emerald-700 hover:bg-emerald-50' :
                    quizAnswer === i ? (i === quiz.correct ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50') :
                    i === quiz.correct ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 opacity-50'
                  }`}
                  disabled={quizAnswer !== null}
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
            <button onClick={() => { setQuizOpen(false); setQuizAnswer(null) }} className="w-full mt-6 py-3 bg-emerald-800 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
