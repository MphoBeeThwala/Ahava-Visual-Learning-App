import React, { useState } from 'react'
import { BarChart3, Users, FileText, BookOpen, Database, Mail, MessageSquare } from 'lucide-react'

const tabs = [
  { id: 'overview', label: '📊 Overview', icon: BarChart3 },
  { id: 'classes', label: '👥 My Classes', icon: Users },
  { id: 'assignments', label: '📝 Assignments', icon: FileText },
  { id: 'curriculum', label: '🗺️ Curriculum Builder', icon: BookOpen },
  { id: 'offline', label: '💾 Offline Packs', icon: Database },
  { id: 'requests', label: '📮 Requests', icon: MessageSquare }
]

const classes = [
  { name: 'Grade 8 Biology - Spring 2024', students: 28, assignments: 8, completion: 85 },
  { name: 'Grade 9 Geography - Fall 2024', students: 32, assignments: 5, completion: 72 },
  { name: 'Grade 7 Science - Winter 2024', students: 27, assignments: 12, completion: 92 }
]

const assignments = [
  { title: 'Serengeti Great Migration', class: 'Grade 8 Biology', due: 'Mar 15', completed: 24, total: 28 },
  { title: 'The Grand Canyon Layers', class: 'Grade 9 Geography', due: 'Mar 18', completed: 18, total: 32 },
  { title: 'Great Barrier Reef Dive', class: 'Grade 7 Science', due: 'Mar 22', completed: 27, total: 27 }
]

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ v: '3', l: 'Active Classes' }, { v: '87', l: 'Total Students' }, { v: '12', l: 'Assignments Active' }, { v: '78%', l: 'Avg Completion' }].map(s => (
                <div key={s.l} className="bg-gray-100 rounded-xl p-5 text-center">
                  <div className="text-2xl font-extrabold text-emerald-800">{s.v}</div>
                  <div className="text-sm text-gray-500">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-lg mb-4">Class Completion Rates</h3>
                {classes.map(cls => (
                  <div key={cls.name} className="mb-4">
                    <div className="flex justify-between text-sm mb-1"><span>{cls.name}</span><span className="font-semibold">{cls.completion}%</span></div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-700 rounded-full transition-all" style={{ width: `${cls.completion}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-lg mb-4">Popular Experiences</h3>
                {['Serengeti Great Migration', 'The Grand Canyon Layers', 'Great Barrier Reef Dive', 'Machu Picchu: Lost City', 'Amazon Rainforest Canopy'].map((title, i) => (
                  <div key={title} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0" />
                    <div className="flex-1"><div className="font-semibold text-sm">{title}</div><div className="text-xs text-gray-500">{[234, 189, 156, 201, 178][i]} views this week</div></div>
                    <div className="font-bold text-sm text-emerald-700">{[234, 189, 156, 201, 178][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'classes':
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {classes.map(cls => (
              <div key={cls.name} className="card p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-sm">{cls.name}</h3>
                  <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">{cls.students} students</span>
                </div>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 text-center p-3 bg-gray-100 rounded-lg"><div className="font-bold text-emerald-700">{cls.assignments}</div><div className="text-xs text-gray-500">Assignments</div></div>
                  <div className="flex-1 text-center p-3 bg-gray-100 rounded-lg"><div className="font-bold text-emerald-700">{cls.completion}%</div><div className="text-xs text-gray-500">Completion</div></div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium">View</button>
                  <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium">Assign</button>
                </div>
              </div>
            ))}
            <button className="card p-5 flex items-center justify-center border-dashed border-2 border-gray-300 text-gray-500 hover:border-emerald-700 hover:text-emerald-700 transition-colors">
              <span className="text-lg font-semibold">+ Create New Class</span>
            </button>
          </div>
        )
      case 'assignments':
        return (
          <div className="card p-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-gray-200"><th className="text-left py-3 px-2">Experience</th><th className="text-left py-3 px-2">Class</th><th className="text-left py-3 px-2">Due</th><th className="text-left py-3 px-2">Status</th><th className="text-left py-3 px-2">Completed</th></tr></thead>
              <tbody>{assignments.map((a, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 px-2 font-semibold">{a.title}</td>
                  <td className="py-3 px-2 text-gray-500">{a.class}</td>
                  <td className="py-3 px-2 text-gray-500">{a.due}</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Active</span></td>
                  <td className="py-3 px-2">{a.completed}/{a.total}</td>
                </tr>
              ))}</tbody>
            </table>
            <button className="btn btn-primary mt-6 bg-emerald-800 text-white">+ Create Assignment</button>
          </div>
        )
      case 'curriculum':
        return (
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Ecosystems of the World — Journey</h3>
            <div className="space-y-3">
              {['Serengeti Great Migration', 'The Grand Canyon Layers', 'Great Barrier Reef Dive', 'Amazon Rainforest Canopy'].map((title, i) => (
                <React.Fragment key={title}>
                  <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl border-l-4 border-emerald-700">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">{i + 1}</div>
                    <div className="flex-1"><div className="font-semibold text-sm">{title}</div><div className="text-xs text-gray-500">15 min • Biology</div></div>
                    <button className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  {i < 3 && <div className="text-center text-xs text-gray-400 py-1">⬇ Discussion Question</div>}
                </React.Fragment>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="btn btn-outline">+ Add Experience</button>
              <button className="btn btn-primary bg-emerald-800 text-white">Save Journey</button>
            </div>
          </div>
        )
      case 'offline':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {['Grade 8 Biology Pack', 'Grade 9 Geography Pack'].map((name, i) => (
              <div key={name} className="card p-6">
                <h3 className="font-bold text-lg mb-2">{name}</h3>
                <p className="text-sm text-gray-500 mb-4">{[8, 5][i]} experiences • {[2.3, 1.8][i]} GB • For {[28, 32][i]} students</p>
                <div className="flex gap-3">
                  <button className="btn btn-sm btn-primary bg-emerald-800 text-white">Download Pack</button>
                  <button className="btn btn-sm btn-outline">Share</button>
                </div>
              </div>
            ))}
          </div>
        )
      case 'requests':
        return (
          <div className="card p-6">
            <div className="space-y-4">
              <div><label className="block font-semibold text-sm mb-2">Request a New Experience</label><input type="text" placeholder="Location or topic (e.g., 'Great Wall of China')" className="w-full" /></div>
              <div><label className="block font-semibold text-sm mb-2">Why is this needed?</label><textarea rows="3" placeholder="Explain how this would benefit your students..." className="w-full" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block font-semibold text-sm mb-2">Grade Level</label><select className="w-full"><option>7-9</option><option>4-6</option><option>10-12</option></select></div>
                <div><label className="block font-semibold text-sm mb-2">Subject</label><select className="w-full"><option>History</option><option>Biology</option><option>Geography</option></select></div>
              </div>
              <button className="btn btn-primary bg-emerald-800 text-white">Submit Request</button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm h-fit sticky top-20">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Teacher Menu</h3>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${activeTab === tab.id ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
