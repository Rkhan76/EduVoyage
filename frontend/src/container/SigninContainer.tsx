import React, { useState } from 'react' // Import useState
import { signinUser } from '../services/authService'
import { useSetRecoilState } from 'recoil'
import { IsSingnedIn } from '../store/atoms/IsSignedIn'
import { cartState } from '../store/atoms/Cart'
import { useNavigate } from 'react-router-dom'
import SigninForm from '../components/SigninForm'
import { useSigninForm } from '../hooks/useSigninForm'
import { handleFetchCartOnLoad } from '../services/cart'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const SigninContainer: React.FC = () => {
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)
  const setCart = useSetRecoilState(cartState)
  const { formData, handleInputChange } = useSigninForm()
  const navigate = useNavigate()

  // State to hold error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null) // Clear any previous error messages
    try {
      const result = await signinUser(formData)
      if (result) {
        const token = result.userData.token
        Cookies.set('token', token, { expires: 7, path: '/' })
        toast.success('Signin successful! Redirecting...', {
          position: 'top-right',
          autoClose: 2000,
        })
        await fetchAndSetCart()
        setIsSignedIn(true)
        navigate('/')
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Signin failed. Please try again.'
      ) // Capture error message
      toast.error('Signin failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      })
      console.error('Signin failed:', err)
    }
  }

  const fetchAndSetCart = async () => {
    try {
      const cartData = await handleFetchCartOnLoad()
      setCart(cartData)
    } catch (error) {
      console.error('Failed to fetch cart data:', error)
    }
  }

  return (
    <div>
      {/* Signin Form */}
      <SigninForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        errorMessage={errorMessage} // Pass error message
      />
    </div>
  )
}

export default SigninContainer
