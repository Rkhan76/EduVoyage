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
import { ToastContainer } from 'react-toastify' // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import react-toastify styles
import AddDomainSubdomainPage from './pages/AddDomainSubdomainPage'
import SignupPage from './pages/SingupPage'
import SigninPage from './pages/SigninPage'
import FetchDomainPage from './pages/FectchDomains'
import AllCoursesPage from './pages/AllCoursePage'
import NotFound from './pages/NotFound'
import CourseDetailsPage from './pages/CourseDetailsPage'

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
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/teachersignup" element={<SignupPage />} />
              <Route path="/course/:courseId" element={<CourseDetailsPage />} />
              <Route
                path="/addDomainAndSubdomain"
                element={<AddDomainSubdomainPage />}
              />
              <Route
                path="/courses/:domainName/:subdomainName?"
                element={<AllCoursesPage />}
              />
              <Route path="/try" element={<FetchDomainPage />} />
              <Route path="not-found" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer /> {/* Add ToastContainer here */}
      </Router>
    </RecoilRoot>
  )
}

export default React.memo(App)
