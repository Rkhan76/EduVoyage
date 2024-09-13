import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pricing from './components/Pricing'
import TermsCondition from './components/TermsConditon'
import PrivacyPolicy from './components/PrivacyPolicy'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

function App() {
   return (
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
           </Routes>
         </main>
         <Footer />
       </div>
     </Router>
   )
}

export default App
