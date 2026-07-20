import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import AIAssistant from './components/AIAssistant'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import AddProperty from './pages/AddProperty'
import Favorites from './pages/Favorites'
import Dashboard from './pages/Dashboard'
import MortgageCalculator from './pages/MortgageCalculator'
import Projects from './pages/Projects'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/properties"   element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/about"        element={<About />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/login"        element={<Login />} />
            <Route path="/register"     element={<Register />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/favorites"    element={<Favorites />} />
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/calculator"   element={<MortgageCalculator />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/admin"        element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <AIAssistant />
      </div>
    </BrowserRouter>
  )
}
