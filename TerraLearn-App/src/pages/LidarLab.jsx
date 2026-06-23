import React, { useState, useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

export default function LidarLab() {
  const containerRef = useRef(null)
  const [mode, setMode] = useState('color')
  const [scanning, setScanning] = useState(false)
  const [year, setYear] = useState(2010)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.offsetWidth
    const height = container.offsetHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x1a1a2e, 1)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    camera.position.set(0, 30, 60)
    camera.lookAt(0, 0, 0)

    // Generate points
    const count = 50000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      const y = Math.sin(x * 0.1) * 5 + Math.cos(z * 0.1) * 5 + Math.random() * 3 + 5
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      if (mode === 'height') { const t = (y + 5) / 20; colors[i * 3] = t; colors[i * 3 + 1] = 1 - t; colors[i * 3 + 2] = 0.5; }
      else if (mode === 'intensity') { const intensity = Math.random(); colors[i * 3] = intensity; colors[i * 3 + 1] = intensity; colors[i * 3 + 2] = intensity; }
      else if (mode === 'wireframe') { colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.2; }
      else if (mode === 'ai') { colors[i * 3] = 0.3 + Math.random() * 0.7; colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; colors[i * 3 + 2] = 1.0; }
      else { colors[i * 3] = 0.2 + y * 0.02; colors[i * 3 + 1] = 0.4 + y * 0.03; colors[i * 3 + 2] = 0.1 + y * 0.01; }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, sizeAttenuation: true })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const planeGeo = new THREE.PlaneGeometry(120, 120)
    const planeMat = new THREE.MeshBasicMaterial({ color: 0x0a0a1a, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)

    let anim = requestAnimationFrame(function render() { anim = requestAnimationFrame(render); if (scanning) { controls.autoRotate = true; controls.autoRotateSpeed = 0.5; } else { controls.autoRotate = false; } controls.update(); renderer.render(scene, camera); })
    return () => { cancelAnimationFrame(anim); renderer.dispose(); if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement); }
  }, [mode, scanning])

  const retreat = ((year - 2010) / 14) * 350
  const volume = Math.max(0, 100 - ((year - 2010) / 14) * 35).toFixed(0)

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="section-header">
        <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Future Tech</span>
        <h2>LiDAR + AI 3D Mapping</h2>
        <p>Creating walkable, measurable 3D replicas of real-world places with laser precision and AI enhancement.</p>
      </div>

      <div className="lidar-container relative" ref={containerRef}>
        <div className="absolute top-4 left-4 bg-black/60 text-white p-3 rounded-xl text-xs space-y-1 z-10">
          <div>Points: <span className="text-amber-400 font-bold">1,247,832</span></div>
          <div>Resolution: <span className="text-amber-400 font-bold">2.3 cm</span></div>
          <div>Area: <span className="text-amber-400 font-bold">0.8 km²</span></div>
          <div>Scan time: <span className="text-amber-400 font-bold">14 minutes</span></div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap z-10">
          {['color', 'height', 'intensity', 'wireframe', 'ai'].map(m => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-2 rounded-lg text-xs text-white border border-white/20 transition-all ${mode === m ? 'bg-sky-500' : 'bg-white/15 hover:bg-white/25'}`}>
              {m === 'color' ? '🎨 Color' : m === 'height' ? '📊 Height' : m === 'intensity' ? '💡 Intensity' : m === 'wireframe' ? '🔲 Wireframe' : '✨ AI Enhanced'}
            </button>
          ))}
          <button onClick={() => setScanning(!scanning)} className={`px-3 py-2 rounded-lg text-xs text-white border border-white/20 transition-all ${scanning ? 'bg-sky-500' : 'bg-white/15 hover:bg-white/25'}`}>📡 Scan Animation</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">📡 Scan Comparison</h3>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 p-4 bg-gray-100 rounded-xl text-center">
              <div className="text-3xl mb-2">📷</div>
              <div className="font-semibold text-sm">Photo Only</div>
              <div className="text-xs text-gray-500">Gaps, shadows, artifacts</div>
            </div>
            <div className="flex items-center text-gray-400 text-xl">→</div>
            <div className="flex-1 p-4 bg-emerald-50 border-2 border-emerald-700 rounded-xl text-center">
              <div className="text-3xl mb-2">📡</div>
              <div className="font-semibold text-sm text-emerald-800">LiDAR + AI</div>
              <div className="text-xs text-gray-500">Complete, 2cm accurate</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">LiDAR sends millions of laser pulses per second to measure distances with incredible precision. Combined with AI, we fill gaps, colorize points, and generate walkable 3D scenes.</p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">📅 Temporal Capture — Glacier Retreat</h3>
          <p className="text-sm text-gray-600 mb-4">Drag to see how repeat LiDAR scans reveal climate change over time.</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-semibold">2010</span>
            <input type="range" min="2010" max="2024" value={year} onChange={e => setYear(parseInt(e.target.value))} className="flex-1" />
            <span className="text-sm font-semibold">2024</span>
          </div>
          <div className="flex justify-between p-4 bg-gray-100 rounded-xl">
            <div>
              <div className="text-sm font-semibold">Year: {year}</div>
              <div className="text-xs text-gray-500">Ice volume: {volume}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-red-600">Retreat: {retreat.toFixed(0)}m</div>
              <div className="text-xs text-gray-500">Temperature anomaly: +{((year - 2010) * 0.15).toFixed(1)}°C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
