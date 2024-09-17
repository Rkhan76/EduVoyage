import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import TermsCondition from './pages/TermsConditon'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactUs from './pages/ContactUs'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plans&pricing" element={<Pricing />} />
              <Route path="/terms-condition" element={<TermsCondition />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </main>
          {/* The Footer is outside the Routes */}
          <Footer />
        </div>
      </Router>
    </RecoilRoot>
  )
}

export default React.memo(App) // Wrap App with memo as well
