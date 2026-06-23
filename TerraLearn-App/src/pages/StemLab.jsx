import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ArrowRight, FlaskConical, Atom, Waves, Beaker } from 'lucide-react'
import { cellData, organLayerInfo, periodicData, elementGroupColors, elementDescriptions } from '../data/experiences'

export default function StemLab() {
  const [activeTab, setActiveTab] = useState('biology')
  const [organLayer, setOrganLayer] = useState(0)
  const [cellInfo, setCellInfo] = useState('Click an organelle to learn about its function')
  const [titrationVol, setTitrationVol] = useState(0)
  const [selectedElement, setSelectedElement] = useState(periodicData[0])
  const [pendulum, setPendulum] = useState({ length: 1.0, mass: 1.0, gravity: 9.8 })
  const [wave, setWave] = useState({ freq1: 1.0, freq2: 1.0, amp: 50 })
  const pendulumRef = useRef(null)
  const waveRef = useRef(null)

  const pH = (() => { const eq = 25; let pH; if (titrationVol < eq - 5) pH = 1 + (titrationVol / (eq - 5)) * 5; else if (titrationVol < eq + 5) pH = 6 + ((titrationVol - (eq - 5)) / 10) * 5; else pH = 11 + ((titrationVol - (eq + 5)) / 20) * 2; return Math.max(1, Math.min(14, pH)); })()
  const period = 2 * Math.PI * Math.sqrt(pendulum.length / pendulum.gravity)

  // Pendulum canvas
  useEffect(() => {
    const canvas = pendulumRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); let t = 0, anim;
    function draw() { anim = requestAnimationFrame(draw); t += 0.016; ctx.clearRect(0, 0, canvas.width, canvas.height); const originX = canvas.width / 2, originY = 20; const stringLen = pendulum.length * 80; const angle = (Math.PI / 4) * Math.cos((2 * Math.PI / period) * t); const bobX = originX + stringLen * Math.sin(angle); const bobY = originY + stringLen * Math.cos(angle); ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(bobX, bobY); ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.arc(bobX, bobY, 10 + pendulum.mass * 3, 0, Math.PI * 2); ctx.fillStyle = '#d32f2f'; ctx.fill(); ctx.fillStyle = '#334155'; ctx.font = '12px sans-serif'; ctx.fillText(`T = ${period.toFixed(2)}s`, 10, 20); } draw(); return () => cancelAnimationFrame(anim); }, [pendulum, period])

  // Wave canvas
  useEffect(() => { const canvas = waveRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); let time = 0, anim; function draw() { anim = requestAnimationFrame(draw); time += 0.05; ctx.clearRect(0, 0, canvas.width, canvas.height); const w = canvas.width, h = canvas.height; ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, h / 4); for (let x = 0; x < w; x++) ctx.lineTo(x, h / 4 + wave.amp * Math.sin((x / 50) * wave.freq1 - time)); ctx.stroke(); ctx.strokeStyle = '#f59e0b'; ctx.beginPath(); ctx.moveTo(0, h / 4); for (let x = 0; x < w; x++) ctx.lineTo(x, h / 4 + wave.amp * Math.sin((x / 50) * wave.freq2 - time + 1)); ctx.stroke(); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 3 * h / 4); for (let x = 0; x < w; x++) { const y1 = wave.amp * Math.sin((x / 50) * wave.freq1 - time); const y2 = wave.amp * Math.sin((x / 50) * wave.freq2 - time + 1); ctx.lineTo(x, 3 * h / 4 + y1 + y2); } ctx.stroke(); } draw(); return () => cancelAnimationFrame(anim); }, [wave])

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="section-header">
        <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">STEM Education</span>
        <h2>Interactive STEM Laboratory</h2>
        <p>Explore biology up close, conduct virtual chemistry experiments, and discover physics through hands-on simulations.</p>
      </div>

      <div className="flex gap-2 justify-center mb-8 flex-wrap">
        {[
          { id: 'biology', label: '🔬 Biology', icon: FlaskConical },
          { id: 'chemistry', label: '⚗️ Chemistry', icon: Beaker },
          { id: 'physics', label: '🔭 Physics', icon: Atom }
        ].map(tab => (
          <button key={tab.id} data-tab={tab.id} onClick={() => setActiveTab(tab.id)} className={`stem-tab ${activeTab === tab.id ? 'active' : ''}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* BIOLOGY */}
      {activeTab === 'biology' && (
        <div className="animate-fade">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Heart */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center text-xl">🫀</div>
                <div><h3 className="font-bold text-lg">The Human Heart: Up Close</h3><p className="text-sm text-gray-500">Layer-by-layer interactive dissection</p></div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl h-72 flex items-center justify-center relative overflow-hidden">
                {organLayer === 0 && (
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    <ellipse cx="100" cy="100" rx="70" ry="80" fill="#e57373" stroke="#c62828" strokeWidth="3" />
                    <path d="M100 20 Q130 60 100 100 Q70 60 100 20" fill="#ef5350" stroke="#c62828" strokeWidth="2" />
                    <ellipse cx="75" cy="70" rx="25" ry="30" fill="#ef9a9a" opacity="0.6" />
                    <ellipse cx="125" cy="70" rx="25" ry="30" fill="#ef9a9a" opacity="0.6" />
                    <text x="100" y="180" textAnchor="middle" fontSize="12" fill="#5d1010" fontWeight="600">External View</text>
                  </svg>
                )}
                {organLayer === 1 && (
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    <ellipse cx="100" cy="100" rx="70" ry="80" fill="#e57373" stroke="#c62828" strokeWidth="2" />
                    <ellipse cx="70" cy="80" rx="30" ry="35" fill="#ffcc80" stroke="#ef6c00" strokeWidth="2" />
                    <ellipse cx="130" cy="80" rx="30" ry="35" fill="#ffcc80" stroke="#ef6c00" strokeWidth="2" />
                    <ellipse cx="70" cy="120" rx="25" ry="30" fill="#ffcc80" stroke="#ef6c00" strokeWidth="2" />
                    <ellipse cx="130" cy="120" rx="25" ry="30" fill="#ffcc80" stroke="#ef6c00" strokeWidth="2" />
                    <text x="70" y="80" textAnchor="middle" fontSize="8" fill="#5d1010">RA</text>
                    <text x="130" y="80" textAnchor="middle" fontSize="8" fill="#5d1010">LA</text>
                    <text x="70" y="120" textAnchor="middle" fontSize="8" fill="#5d1010">RV</text>
                    <text x="130" y="120" textAnchor="middle" fontSize="8" fill="#5d1010">LV</text>
                    <text x="100" y="180" textAnchor="middle" fontSize="12" fill="#5d1010" fontWeight="600">The Four Chambers</text>
                  </svg>
                )}
                {organLayer === 2 && (
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    <ellipse cx="100" cy="100" rx="70" ry="80" fill="#e57373" opacity="0.3" />
                    <path d="M70 80 Q85 70 100 80 Q115 70 130 80" fill="none" stroke="#1565c0" strokeWidth="4" strokeLinecap="round" />
                    <path d="M70 120 Q85 110 100 120 Q115 110 130 120" fill="none" stroke="#1565c0" strokeWidth="4" strokeLinecap="round" />
                    <text x="100" y="180" textAnchor="middle" fontSize="12" fill="#5d1010" fontWeight="600">Valves & Vessels</text>
                  </svg>
                )}
                {organLayer === 3 && (
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    <defs><linearGradient id="bloodGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style={{ stopColor: '#b71c1c', stopOpacity: 0.3 }} /><stop offset="50%" style={{ stopColor: '#d32f2f', stopOpacity: 0.6 }} /><stop offset="100%" style={{ stopColor: '#b71c1c', stopOpacity: 0.3 }} /></linearGradient></defs>
                    <ellipse cx="100" cy="100" rx="70" ry="80" fill="url(#bloodGrad)" />
                    <circle cx="100" cy="100" r="8" fill="#d32f2f" opacity="0.8"><animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" /></circle>
                    <text x="100" y="180" textAnchor="middle" fontSize="12" fill="#5d1010" fontWeight="600">❤️ Blood Flow</text>
                  </svg>
                )}
              </div>
              <div className="flex justify-between items-center mt-4 gap-3">
                <button onClick={() => setOrganLayer(Math.max(0, organLayer - 1))} className="btn btn-sm btn-ghost">← Previous</button>
                <span className="font-semibold text-sm text-pink-600">{organLayerInfo[organLayer].title}</span>
                <button onClick={() => setOrganLayer(Math.min(3, organLayer + 1))} className="btn btn-sm text-white" style={{ background: '#E91E63' }}>Next Layer →</button>
              </div>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm leading-relaxed">
                <h4 className="font-bold mb-1">{organLayerInfo[organLayer].title}</h4>
                <p className="text-gray-600">{organLayerInfo[organLayer].text}</p>
              </div>
            </div>

            {/* Cell Explorer */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center text-xl">🧫</div>
                <div><h3 className="font-bold text-lg">Plant Cell Explorer</h3><p className="text-sm text-gray-500">Click organelles to discover their functions</p></div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl h-72 relative overflow-hidden">
                <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
                  <rect x="10" y="10" width="280" height="280" rx="30" fill="#81c784" stroke="#2e7d32" strokeWidth="3" />
                  <rect x="20" y="20" width="260" height="260" rx="25" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" />
                  <ellipse cx="150" cy="150" rx="50" ry="40" fill="#fff9c4" stroke="#f9a825" strokeWidth="2" />
                  <circle cx="150" cy="150" r="12" fill="#5d4037" />
                  <circle cx="80" cy="80" r="25" fill="#66bb6a" stroke="#2e7d32" opacity="0.8" />
                  <circle cx="220" cy="100" r="20" fill="#66bb6a" stroke="#2e7d32" opacity="0.8" />
                  <circle cx="100" cy="220" r="22" fill="#66bb6a" stroke="#2e7d32" opacity="0.8" />
                  <circle cx="200" cy="210" r="18" fill="#66bb6a" stroke="#2e7d32" opacity="0.8" />
                  <rect x="30" y="120" width="15" height="80" rx="7" fill="#ce93d8" stroke="#8e24aa" strokeWidth="1.5" />
                  <rect x="250" y="140" width="15" height="60" rx="7" fill="#ce93d8" stroke="#8e24aa" strokeWidth="1.5" />
                  <ellipse cx="150" cy="270" rx="80" ry="12" fill="#c8e6c9" stroke="#388e3c" opacity="0.6" />
                  <text x="80" y="80" textAnchor="middle" fontSize="8" fill="#1b5e20">Chloroplast</text>
                  <text x="150" y="150" textAnchor="middle" fontSize="9" fill="#5d4037">Nucleus</text>
                </svg>
                <div className="absolute top-[22%] left-[22%] w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform" onClick={() => setCellInfo(`<strong style="color:#66bb6a">Chloroplast:</strong> ${cellData.chloroplast.func}`)} title="Chloroplast" />
                <div className="absolute top-[43%] left-[43%] w-12 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform" onClick={() => setCellInfo(`<strong style="color:#5d4037">Nucleus:</strong> ${cellData.nucleus.func}`)} title="Nucleus" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl text-xs" dangerouslySetInnerHTML={{ __html: cellInfo }} />
              </div>
            </div>
          </div>

          {/* DNA */}
          <div className="card p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center text-xl">🧬</div>
              <div><h3 className="font-bold text-lg">DNA: The Double Helix</h3><p className="text-sm text-gray-500">Interactive base pairing model</p></div>
            </div>
            <div className="flex justify-center gap-8 h-56 items-center">
              {['A-T', 'C-G', 'T-A', 'G-C', 'A-T', 'C-G', 'T-A', 'G-C'].map((pair, i) => {
                const [a, b] = pair.split('-'); const colors = { A: '#1565c0', T: '#ef6c00', C: '#2e7d32', G: '#c62828' };
                return (
                  <div key={i} className="relative h-48 w-5">
                    <div className="absolute top-0 left-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: colors[a], animation: `dnaBob 2s ease-in-out infinite ${i * 0.15}s` }}>{a}</div>
                    <div className="absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: colors[b], animation: `dnaBob 2s ease-in-out infinite ${i * 0.15}s` }}>{b}</div>
                    <div className="absolute left-2.5 top-2.5 w-8 h-0.5 bg-gray-400 -translate-x-1/2" style={{ animation: `dnaBob 2s ease-in-out infinite ${i * 0.15}s` }} />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-6 flex-wrap mt-4">
              {[{ l: 'A', c: '#1565c0', n: 'Adenine' }, { l: 'T', c: '#ef6c00', n: 'Thymine' }, { l: 'C', c: '#2e7d32', n: 'Cytosine' }, { l: 'G', c: '#c62828', n: 'Guanine' }].map(b => (
                <div key={b.l} className="text-center px-5 py-3 rounded-xl" style={{ background: b.c + '15' }}>
                  <div className="text-2xl font-extrabold" style={{ color: b.c }}>{b.l}</div>
                  <div className="text-xs text-gray-500">{b.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHEMISTRY */}
      {activeTab === 'chemistry' && (
        <div className="animate-fade">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Titration */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl">⚗️</div>
                <div><h3 className="font-bold text-lg">Acid-Base Titration Lab</h3><p className="text-sm text-gray-500">Interactive pH simulation</p></div>
              </div>
              <div className="flex gap-6 flex-wrap">
                <div className="flex-1 min-w-[140px]">
                  <div className="w-24 h-44 border-[3px] border-gray-400 rounded-b-[50px] mx-auto relative overflow-hidden bg-white/50">
                    <div className="absolute bottom-0 left-0 right-0 transition-all duration-500 rounded-b-[47px]" style={{ height: `${60 + titrationVol}%`, background: pH < 6 ? '#fff9c4' : pH < 8.2 ? '#ffe0b2' : '#f8bbd0' }} />
                  </div>
                </div>
                <div className="flex-[2] min-w-[200px]">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="flex justify-between text-sm font-medium mb-2">Acid added (NaOH mL): <span className="font-bold">{titrationVol.toFixed(1)}</span></label>
                    <input type="range" min="0" max="50" step="0.5" value={titrationVol} onChange={e => setTitrationVol(parseFloat(e.target.value))} className="w-full mb-3" />
                    <div className="text-center text-2xl font-extrabold py-3 rounded-xl transition-all" style={{ background: pH < 6 ? '#e8f5e9' : pH < 8.2 ? '#fff3e0' : '#fce4ec', color: pH < 6 ? '#2e7d32' : pH < 8.2 ? '#ef6c00' : '#c62828' }}>pH {pH.toFixed(1)}</div>
                    <div className="text-center text-sm font-semibold mt-2" style={{ color: pH < 6 ? '#2e7d32' : pH < 8.2 ? '#ef6c00' : '#c62828' }}>{pH < 6 ? 'Acidic — Colorless' : pH < 8.2 ? 'Near Neutral — Pale Pink' : 'Basic — Bright Pink!'}</div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl text-xs text-gray-600">
                    <strong>Reaction:</strong> HCl + NaOH → NaCl + H₂O<br />
                    <strong>Indicator:</strong> Phenolphthalein (colorless → pink at pH &gt; 8.2)
                  </div>
                </div>
              </div>
            </div>

            {/* Reaction Simulator */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl">🧪</div>
                <div><h3 className="font-bold text-lg">Chemical Reaction Simulator</h3><p className="text-sm text-gray-500">Mix reactants and observe products</p></div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 text-center p-4 bg-gray-50 rounded-xl"><div className="text-3xl mb-1">💧</div><div className="font-semibold text-sm">H₂</div><div className="text-xs text-gray-500">Hydrogen</div></div>
                <span className="text-gray-400 text-xl">+</span>
                <div className="flex-1 text-center p-4 bg-gray-50 rounded-xl"><div className="text-3xl mb-1">💨</div><div className="font-semibold text-sm">O₂</div><div className="text-xs text-gray-500">Oxygen</div></div>
                <span className="text-gray-400 text-xl">→</span>
                <div className="flex-1 text-center p-4 bg-gray-50 rounded-xl"><div className="text-3xl mb-1">💧</div><div className="font-semibold text-sm">H₂O</div><div className="text-xs text-gray-500">Water</div></div>
              </div>
              <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">🔥 Mix Chemicals</button>
            </div>
          </div>

          {/* Periodic Table */}
          <div className="card p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl">🧬</div>
              <div><h3 className="font-bold text-lg">Periodic Table Explorer</h3><p className="text-sm text-gray-500">Click any element to discover its properties</p></div>
            </div>
            <div className="overflow-x-auto">
              <div className="grid gap-0.5 p-2 bg-slate-900 rounded-xl" style={{ gridTemplateColumns: 'repeat(18, minmax(32px, 1fr))' }}>
                {[1, 2, 3, 4].flatMap(p => Array.from({ length: 18 }, (_, g) => {
                  const el = periodicData.find(e => e.g === g + 1 && e.p === p);
                  if (!el) return <div key={`${p}-${g}`} />;
                  return (
                    <button key={el.s} onClick={() => setSelectedElement(el)} className="aspect-square flex flex-col items-center justify-center rounded-sm text-white text-[10px] hover:scale-125 hover:z-10 transition-transform cursor-pointer"
                      style={{ background: elementGroupColors[el.g] || '#37474f' }}>
                      <span className="text-[8px] opacity-70">{el.n}</span>
                      <span className="font-bold text-xs">{el.s}</span>
                    </button>
                  )
                }))}
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-lg">{selectedElement.nm} ({selectedElement.s})</h4>
              <p className="text-sm text-gray-600 mt-1">Atomic Number: {selectedElement.n} | Group: {selectedElement.g} | Period: {selectedElement.p}</p>
              <p className="text-sm text-gray-500 mt-2">{elementDescriptions[selectedElement.s] || `${selectedElement.nm} is element ${selectedElement.n} in the periodic table.`}</p>
            </div>
          </div>
        </div>
      )}

      {/* PHYSICS */}
      {activeTab === 'physics' && (
        <div className="animate-fade">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pendulum */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-xl">🔭</div>
                <div><h3 className="font-bold text-lg">Pendulum Physics Lab</h3><p className="text-sm text-gray-500">Adjust parameters and observe the period</p></div>
              </div>
              <canvas ref={pendulumRef} width={400} height={280} className="w-full bg-gradient-to-br from-sky-50 to-blue-100 rounded-xl" />
              <div className="mt-4 space-y-3">
                <label className="flex justify-between text-sm">Length (m): <span className="font-bold">{pendulum.length.toFixed(1)}</span></label>
                <input type="range" min="0.5" max="2.0" step="0.1" value={pendulum.length} onChange={e => setPendulum({ ...pendulum, length: parseFloat(e.target.value) })} className="w-full" />
                <label className="flex justify-between text-sm">Mass (kg): <span className="font-bold">{pendulum.mass.toFixed(1)}</span></label>
                <input type="range" min="0.5" max="5.0" step="0.5" value={pendulum.mass} onChange={e => setPendulum({ ...pendulum, mass: parseFloat(e.target.value) })} className="w-full" />
                <label className="flex justify-between text-sm">Gravity (m/s²): <span className="font-bold">{pendulum.gravity.toFixed(1)}</span></label>
                <input type="range" min="1.6" max="20.0" step="0.1" value={pendulum.gravity} onChange={e => setPendulum({ ...pendulum, gravity: parseFloat(e.target.value) })} className="w-full" />
                <div className="bg-gray-100 p-3 rounded-lg text-center text-sm font-mono">T = 2π√(L/g) = <span className="text-cyan-600 font-bold text-lg">{period.toFixed(2)}</span> s</div>
              </div>
            </div>

            {/* Wave Interference */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-xl">〰️</div>
                <div><h3 className="font-bold text-lg">Wave Interference Simulator</h3><p className="text-sm text-gray-500">Two waves combining — constructive and destructive</p></div>
              </div>
              <canvas ref={waveRef} width={400} height={200} className="w-full bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl" />
              <div className="mt-4 space-y-3">
                <label className="flex justify-between text-sm">Wave 1 Frequency: <span className="font-bold">{wave.freq1.toFixed(1)} Hz</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={wave.freq1} onChange={e => setWave({ ...wave, freq1: parseFloat(e.target.value) })} className="w-full" />
                <label className="flex justify-between text-sm">Wave 2 Frequency: <span className="font-bold">{wave.freq2.toFixed(1)} Hz</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={wave.freq2} onChange={e => setWave({ ...wave, freq2: parseFloat(e.target.value) })} className="w-full" />
                <label className="flex justify-between text-sm">Amplitude: <span className="font-bold">{wave.amp} px</span></label>
                <input type="range" min="20" max="100" step="5" value={wave.amp} onChange={e => setWave({ ...wave, amp: parseInt(e.target.value) })} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
