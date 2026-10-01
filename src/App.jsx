import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Billing from './pages/Billing'
import History from './pages/History'
import About from './pages/About'
import './App.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo(0, 0)
  }

  const page = path === '/billing' ? <Billing navigate={navigate} /> : path === '/history' ? <History navigate={navigate} /> : path === '/about' ? <About /> : <Home navigate={navigate} />

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <Navbar currentPath={path} navigate={navigate} />
      <main>{page}</main>
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
