import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Camera, Video, Mic, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const steps = ['Select Type', 'Upload Files', 'Add Metadata', 'License', 'AI Processing', 'Success']

export default function UploadPage() {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState(null)
  const [files, setFiles] = useState([])
  const [license, setLicense] = useState('cc-by-sa')

  const nextStep = () => setStep(Math.min(steps.length - 1, step + 1))
  const prevStep = () => setStep(Math.max(0, step - 1))

  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files)
    setFiles(dropped)
  }

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(selected)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fade">
            <h3 className="text-xl font-bold text-center mb-6">Step 1: Select Content Type</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { type: '360-photo', icon: Camera, label: '360° Photo Set', desc: 'Multiple overlapping photos to stitch' },
                { type: '360-video', icon: Video, label: '360° Video', desc: 'Immersive video footage' },
                { type: 'audio', icon: Mic, label: 'Audio Narration', desc: 'Voiceover or ambient sound' }
              ].map(item => (
                <button key={item.type} onClick={() => { setSelectedType(item.type); nextStep() }}
                  className={`card p-6 text-center hover:-translate-y-1 transition-all ${selectedType === item.type ? 'ring-2 ring-emerald-700' : ''}`}>
                  <item.icon size={40} className="mx-auto mb-3 text-emerald-700" />
                  <h4 className="font-bold mb-1">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )
      case 1:
        return (
          <div className="animate-fade">
            <h3 className="text-xl font-bold text-center mb-6">Step 2: Upload Files</h3>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('fileInput').click()}
              className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-700 hover:bg-emerald-50/30 transition-all"
            >
              <Upload size={48} className="mx-auto mb-4 text-gray-400" />
              <div className="text-lg font-semibold text-gray-600 mb-1">Drag & drop files here</div>
              <div className="text-sm text-gray-400">or click to browse. Supports JPG, PNG, MP4, WAV</div>
            </div>
            <input id="fileInput" type="file" multiple className="hidden" onChange={handleFileSelect} />
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {files.map((f, i) => (
                  <div key={i} className="px-3 py-2 bg-gray-100 rounded-lg text-sm flex items-center gap-2">
                    <span className="truncate max-w-[200px]">{f.name}</span>
                    <span className="text-xs text-gray-500">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="animate-fade">
            <h3 className="text-xl font-bold text-center mb-6">Step 3: Add Metadata</h3>
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block font-semibold text-sm mb-2">Title</label><input type="text" placeholder="e.g., Serengeti Sunset Panorama" /></div>
                <div><label className="block font-semibold text-sm mb-2">Category</label><select><option>Nature</option><option>History</option><option>STEM</option><option>Culture</option><option>Conservation</option></select></div>
              </div>
              <div><label className="block font-semibold text-sm mb-2">Description</label><textarea rows="3" placeholder="Describe what students will learn..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block font-semibold text-sm mb-2">Grade Level</label><select><option>1-3</option><option>4-6</option><option>7-9</option><option>10-12</option><option>All ages</option></select></div>
                <div><label className="block font-semibold text-sm mb-2">Subjects</label><select><option>Biology</option><option>Geography</option><option>History</option><option>Physics</option><option>Chemistry</option></select></div>
              </div>
              <div><label className="block font-semibold text-sm mb-2">Location</label><input type="text" placeholder="Search location..." /></div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="animate-fade">
            <h3 className="text-xl font-bold text-center mb-6">Step 4: License</h3>
            <div className="max-w-2xl mx-auto space-y-3">
              {[
                { id: 'cc-by-sa', title: 'Creative Commons BY-SA 4.0', desc: 'Others can use and remix with attribution. Recommended for education.' },
                { id: 'public-domain', title: 'Public Domain', desc: 'No restrictions. Maximum educational impact.' },
                { id: 'terralearn', title: 'TerraLearn Use Only', desc: 'We can use it on our platform, but it is not publicly licensed.' }
              ].map(l => (
                <label key={l.id} onClick={() => setLicense(l.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${license === l.id ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200'}`}>
                  <input type="radio" name="license" value={l.id} checked={license === l.id} onChange={() => setLicense(l.id)} className="mt-1" />
                  <div><div className="font-semibold">{l.title}</div><div className="text-sm text-gray-500">{l.desc}</div></div>
                </label>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="animate-fade">
            <h3 className="text-xl font-bold text-center mb-6">Step 5: AI Processing</h3>
            <div className="text-center p-12 bg-slate-900 rounded-2xl text-white max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🤖</div>
              <h4 className="text-xl font-bold mb-4">AI will process your content:</h4>
              <ul className="text-left max-w-md mx-auto space-y-2 text-white/80">
                <li>✓ Stitch panoramas from overlapping images</li>
                <li>✓ Auto-generate captions and descriptions</li>
                <li>✓ Upscale resolution where needed</li>
                <li>✓ Tag objects, species, and landmarks</li>
                <li>✓ Translate to 20+ languages</li>
                <li>✓ Generate text-to-speech narration</li>
              </ul>
              <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <div className="text-sm">Estimated processing time: <strong className="text-amber-400">15 minutes</strong></div>
                <div className="text-xs text-white/60 mt-1">You will receive an email when it is ready</div>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="animate-fade text-center py-12">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-2xl font-bold mb-3">Success!</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">Your content is being processed! Thank you for contributing to global education. Your content will be reviewed and published within 24 hours.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setStep(0); setFiles([]); setSelectedType(null) }} className="btn btn-primary bg-emerald-800 text-white">Upload More</button>
              <Link to="/student" className="btn btn-outline">View My Contributions</Link>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="section-header">
        <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Contribute</span>
        <h2>Help Us Digitize the World</h2>
        <p>Upload your photos, videos, and 360° captures to build educational experiences for students everywhere.</p>
      </div>

      <div className="card p-6">
        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-emerald-800 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {renderStep()}

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-8">
            <button onClick={prevStep} disabled={step === 0} className="btn btn-ghost disabled:opacity-50">
              <ChevronLeft size={18} /> Back
            </button>
            <button onClick={nextStep} className="btn btn-primary bg-emerald-800 text-white">
              {step === 4 ? 'Finish' : 'Next Step'} <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Capture Guidelines */}
      <div className="card p-6 mt-6">
        <h3 className="text-lg font-bold mb-4">📖 Capture Guidelines</h3>
        <div className="space-y-2">
          <details className="p-3 bg-gray-100 rounded-lg"><summary className="font-semibold cursor-pointer">📸 360° Photography Tips</summary><p className="text-sm text-gray-600 mt-2 pl-4">Maintain 30%+ overlap between shots. Keep exposure consistent. Use a tripod for stability.</p></details>
          <details className="p-3 bg-gray-100 rounded-lg"><summary className="font-semibold cursor-pointer">🎥 Video Best Practices</summary><p className="text-sm text-gray-600 mt-2 pl-4">Keep camera stable. Record ambient audio separately. Minimize rapid movement.</p></details>
          <details className="p-3 bg-gray-100 rounded-lg"><summary className="font-semibold cursor-pointer">🦅 Wildlife & Ethics</summary><p className="text-sm text-gray-600 mt-2 pl-4">Never disturb animals. Respect indigenous sites. Follow local regulations.</p></details>
        </div>
      </div>
    </div>
  )
}
