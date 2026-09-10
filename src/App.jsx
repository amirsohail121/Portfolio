import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GithubStats from './components/GithubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetails from './components/ProjectDetails'

function PortfolioHome() {
  return (
    <div className="flex min-h-screen " style={{ background: 'var(--bg-primary)' }}>

      {/* Left Sidebar — hidden on mobile */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 pt-16 sm:pt-0 sm:ml-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <GithubStats />
        <Contact />
        <Footer />
      </main>

    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/:section" element={<PortfolioHome />} />
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
      <Route path="*" element={<PortfolioHome />} />
    </Routes>
  )
}

export default App