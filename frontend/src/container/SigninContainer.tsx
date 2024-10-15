// src/containers/SigninContainer/SigninContainer.tsx

import React from 'react'
import { signinUser } from '../services/authService'
import { useSetRecoilState } from 'recoil'
import { IsSingnedIn } from '../store/atoms/IsSignedIn'
import { cartState } from '../store/atoms/Cart'
import { useNavigate } from 'react-router-dom'
import SigninForm from '../components/SigninForm'
import { useSigninForm } from '../hooks/useSigninForm'
import { handleFetchCartOnLoad } from '../services/cart'
import { toast } from 'react-toastify'

const SigninContainer: React.FC = () => {
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)
  const setCart = useSetRecoilState(cartState)
  const { formData, handleInputChange } = useSigninForm()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await signinUser(formData)
      if (result) {
        toast.success('Signin successful! Redirecting...', {
          position: 'top-right',
          autoClose: 2000,
        })

        // Fetch cart after successful signin
        const cartData = await handleFetchCartOnLoad()
        setCart(cartData)

        setIsSignedIn(true)
        navigate('/')
      }
    } catch (err) {
      toast.error('Signin failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      })
      console.error('Signin failed:', err)
    }
  }

  return (
    <SigninForm
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}

export default SigninContainer
