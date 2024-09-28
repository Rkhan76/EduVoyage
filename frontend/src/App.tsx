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
import SigninPage from "./pages/SigninPage"
import SingupPage from "./pages/SingupPage"
import Try from './pages/Try'

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
              <Route path="/signin" element={<SigninPage />}></Route>
              <Route path="/signup" element={<SingupPage />}></Route>
              <Route path="/teachersignup" element={<SingupPage />} />
              <Route path="/try" element={<Try />} /> {/* Fixed here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </RecoilRoot>
  )
}

export default React.memo(App)
