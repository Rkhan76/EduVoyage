import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { cartState } from './store/atoms/Cart'
import { handleFetchCartOnLoad } from './services/cart'
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
import TeachCoursePage from './pages/TeachCoursePage'
import CreateCoursePage from './pages/CreateCoursePage'
import Sample from './pages/Sample'
import Checkout from './components/Checkout'
import MylearningPage from './pages/MylearningPage'
import { GoogleOAuthProvider} from '@react-oauth/google'
import GoogleAuthContainer from './container/GoogleAuthContainer'



const AppContent = () => {
  const setCart = useSetRecoilState(cartState)
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)


  // i have to change this code 
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
          const cartData = await handleFetchCartOnLoad()
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

  const GoogleAuthWrapper = ({ children }: { children: any }) => {
    return (
      <GoogleOAuthProvider clientId="">
        {children}
      </GoogleOAuthProvider>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher/course" element={<TeachCoursePage />} />
          <Route
            path="/addDomainAndSubdomain"
            element={<AddDomainSubdomainPage />}
          />
          <Route path="/teacher/course/create" element={<CreateCoursePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/plans&pricing" element={<Pricing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/signin"
            element={
              <GoogleAuthWrapper>
                <SigninPage />
              </GoogleAuthWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <GoogleAuthWrapper>
                <SignupPage />
              </GoogleAuthWrapper>
            }
          />
          <Route
            path="/teachersignup"
            element={
              <GoogleAuthWrapper>
                <SigninPage />
              </GoogleAuthWrapper>
            }
          />
          <Route path="/terms-condition" element={<TermsCondition />} />
          {/* <Route path="/try" element={<Sample/>} /> */}
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/mylearning" element={<MylearningPage />} />
          <Route
            path="/courses/:domainName/:subdomainName?"
            element={<AllCoursesPage />}
          />
          <Route path="*" element={<NotFound />} />
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
