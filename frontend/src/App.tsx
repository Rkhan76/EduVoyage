import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { cartState } from './store/atoms/Cart'
import { handleFetchCart } from './services/cart'
import Cookies from 'js-cookie'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import TermsCondition from './pages/TermsConditon'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactUs from './pages/ContactUs'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddDomainSubdomainPage from './pages/AddDomainSubdomainPage'
import SignupPage from './pages/SingupPage'
import SigninPage from './pages/SigninPage'
import FetchDomainPage from './pages/FectchDomains'
import AllCoursesPage from './pages/AllCoursePage'
import NotFound from './pages/NotFound'
import CourseDetailsPage from './pages/CourseDetailsPage'
import { IsSingnedIn } from './store/atoms/IsSignedIn'
import CartPage from './pages/CartPage'

const AppContent = () => {
  const setCart = useSetRecoilState(cartState)
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)

 useEffect(() => {
   const fetchCartOnAppLoad = async () => {
     const token = Cookies.get('token')
     if (token) {
       const decodedToken = jwtDecode<JwtPayload>(token)
       const isTokenExpired = () => {
         return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : true
       }

       if (isTokenExpired()) {
         setIsSignedIn(false)
         return
       }

       setIsSignedIn(true)

       try {
         const cartData = await handleFetchCart()
         if (cartData) {
           setCart(cartData)
         } else {
           console.warn('Cart is empty or not found')
         }
       } catch (err) {
         console.error('Error fetching cart:', err)
         setIsSignedIn(false)
       }
     } else {
       setIsSignedIn(false)
     }
   }

   fetchCartOnAppLoad()
 }, [])


  return (
    <>
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
          <Route path="/cart" element={<CartPage/>} />
          <Route path="not-found" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="flex flex-col min-h-screen">
          <AppContent />
        </div>
        <ToastContainer />
      </Router>
    </RecoilRoot>
  )
}

export default React.memo(App)
