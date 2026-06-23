import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ExperienceDetail from './pages/ExperienceDetail'
import StemLab from './pages/StemLab'
import LidarLab from './pages/LidarLab'
import StitchingLab from './pages/StitchingLab'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentProfile from './pages/StudentProfile'
import Tourism from './pages/Tourism'
import Upload from './pages/Upload'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/stemlab" element={<StemLab />} />
          <Route path="/lidar" element={<LidarLab />} />
          <Route path="/stitching" element={<StitchingLab />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentProfile />} />
          <Route path="/tourism" element={<Tourism />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
