import React, { useState } from 'react'
import { Play, RotateCcw, Image, Link2, PenTool, Palette, Sparkles, Globe } from 'lucide-react'

const steps = [
  { id: 'step1', icon: Image, label: 'Source Collection', desc: '47 images from Wikimedia, Flickr, drones' },
  { id: 'step2', icon: Link2, label: 'Feature Matching', desc: 'AI detects overlapping points' },
  { id: 'step3', icon: PenTool, label: 'Alignment', desc: 'Geometric correction & warping' },
  { id: 'step4', icon: Palette, label: 'Blending', desc: 'Seamless color & exposure merge' },
  { id: 'step5', icon: Sparkles, label: 'AI Enhancement', desc: 'Upscale, inpaint, caption' },
  { id: 'step6', icon: Globe, label: '360° Output', desc: '16K panorama ready' }
]

const sources = [
  { name: 'Wikimedia Commons', count: '1.2M images', icon: '📚' },
  { name: 'Flickr Creative Commons', count: '450K photos', icon: '📷' },
  { name: 'NASA Earth Observatory', count: '89K satellite', icon: '🛰️' },
  { name: 'Mapillary Street View', count: '2.1M panoramas', icon: '🗺️' },
  { name: 'YouTube CC', count: '78K videos', icon: '🎬' },
  { name: 'Google Arts & Culture', count: '12K artworks', icon: '🎨' }
]

export default function StitchingLab() {
  const [running, setRunning] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [enhancements, setEnhancements] = useState({ superres: false, inpaint: false, color: false, caption: false })

  const runDemo = () => {
    if (running) return
    setRunning(true)
    setProcessing(true)
    setActiveStep(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setActiveStep(i)
      if (i >= steps.length) {
        clearInterval(interval)
        setProcessing(false)
        setRunning(false)
      }
    }, 1200)
  }

  const reset = () => { setRunning(false); setProcessing(false); setActiveStep(0); }

  const toggleEnhancement = (key) => setEnhancements(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="section-header">
        <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">AI Engine</span>
        <h2>AI Content Stitching Engine</h2>
        <p>Combining thousands of publicly available images into seamless, immersive educational experiences.</p>
      </div>

      <div className="card p-6 mb-6">
        <h3 className="text-lg font-bold mb-6">🔧 Processing Pipeline</h3>
        <div className="flex flex-wrap items-center gap-4 p-6 bg-slate-900 rounded-xl overflow-x-auto">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className={`flex-1 min-w-[140px] text-center p-5 rounded-xl border transition-all ${i < activeStep ? 'border-emerald-500 bg-emerald-500/10' : i === activeStep && running ? 'border-sky-500 bg-sky-500/10' : 'border-white/10 bg-white/5'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl transition-all ${i < activeStep ? 'bg-emerald-500 text-white' : i === activeStep && running ? 'bg-sky-500 text-white' : 'bg-white/10 text-white'}`}>
                  <step.icon size={20} />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{step.label}</h4>
                <p className="text-white/50 text-xs">{step.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="text-gray-600 text-xl hidden lg:block">→</div>}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-6 flex gap-3 justify-center">
          <button onClick={runDemo} disabled={running} className="btn btn-primary bg-sky-500 text-white disabled:opacity-50">
            <Play size={18} /> {running ? 'Running...' : 'Run Stitching Demo'}
          </button>
          <button onClick={reset} className="btn btn-ghost"><RotateCcw size={18} /> Reset</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">📸 Source Images</h3>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(12)].map((_, i) => (
              <img key={i} src={`https://picsum.photos/seed/${i + 100}/200/150`} alt="" className="w-full h-20 object-cover rounded-lg opacity-70 hover:opacity-100 transition-opacity" />
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Sources:</strong> Wikimedia Commons (18), Flickr CC (12), Drone footage (8), Tourist photos (9)
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">🖼️ AI Processing Preview</h3>
          <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden">
            {processing && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                <div className="w-14 h-14 border-4 border-white/10 border-t-sky-500 rounded-full animate-spin mb-4" />
                <div className="text-white font-semibold">Processing step {activeStep + 1} of {steps.length}...</div>
              </div>
            )}
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" alt="Output" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {[{ key: 'superres', label: 'Super-Resolution' }, { key: 'inpaint', label: 'Inpainting' }, { key: 'color', label: 'Color Correction' }, { key: 'caption', label: 'Auto-Caption' }].map(e => (
              <button key={e.key} onClick={() => toggleEnhancement(e.key)} className={`filter-chip ${enhancements[e.key] ? 'active' : ''}`}>{e.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[{ v: '47', l: 'Source Images' }, { v: '3.2m', l: 'Processing Time' }, { v: '12%', l: 'AI-Generated Fill' }, { v: '16K', l: 'Final Resolution' }].map(s => (
          <div key={s.l} className="bg-gray-100 rounded-xl p-5 text-center">
            <div className="text-2xl font-extrabold text-emerald-800">{s.v}</div>
            <div className="text-sm text-gray-500">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {sources.map(s => (
          <div key={s.name} className="card p-4 flex items-center gap-3">
            <div className="text-3xl">{s.icon}</div>
            <div>
              <div className="font-semibold text-sm">{s.name}</div>
              <div className="text-xs text-gray-500">{s.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
