// GoogleAuthContainer.tsx
import { useSetRecoilState } from 'recoil'
import { IsSingnedIn } from '../store/atoms/IsSignedIn'
import { cartState } from '../store/atoms/Cart'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleFetchCartOnLoad } from '../services/cart'
import { toast } from 'react-toastify'
import GoogleLogin from '../components/subcomponents/GoogleLogin'
import { signinWithGoogle } from '../services/authService'

interface GoogleAuthContainerProps {
  onSuccess?: (response: any) => void
  onError?: () => void
}

const GoogleAuthContainer: React.FC<GoogleAuthContainerProps> = ({
  onSuccess,
  onError,
}) => {
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)
  const setCart = useSetRecoilState(cartState)
  const location = useLocation()
  const navigate = useNavigate()

  const currentRoute = location.pathname

  const fetchAndSetCart = async () => {
    try {
      const cartData = await handleFetchCartOnLoad()
      setCart(cartData)
    } catch (error) {
      console.error('Failed to fetch cart data:', error)
    }
  }

  const handleGoogleSuccess = async (response: any) => {
    let role = '0'
    try {
      if (response['code']) {
        if (currentRoute === '/signin') role = '0'
        if (currentRoute === '/teachersignup') role = '1'
        const result = await signinWithGoogle(response['code'], role)

        console.log('User data from backend of Google: ', result.data.user)
      }
      await fetchAndSetCart()
      setIsSignedIn(true)
      toast.success('Google login successful! Redirecting...')
      navigate('/')

      if (onSuccess) onSuccess(response) // Call onSuccess if provided
    } catch (error) {
      console.error('Error processing Google login:', error)
      toast.error('Login failed. Please try again.')
      if (onError) onError() // Call onError if provided
    }
  }

  const handleGoogleError = () => {
    console.error('Google login failed')
    toast.error('Google login failed. Please try again.')
    if (onError) onError() // Call onError if provided
  }

  return (
    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
  )
}

export default GoogleAuthContainer
