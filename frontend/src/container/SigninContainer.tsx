// src/containers/SigninContainer/SigninContainer.tsx

import React from 'react'
import { signinUser } from '../services/authService'
import { useSetRecoilState } from 'recoil'
import {IsSingnedIn} from "../store/atoms/IsSignedIn"
import { useNavigate } from 'react-router-dom'
import SigninForm from '../components/SigninForm'
import { useSigninForm } from '../hooks/useSigninForm'

const SigninContainer: React.FC = () => {
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)
  const { formData, handleInputChange } = useSigninForm() // Using the hook
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await signinUser(formData)
      if (result) {
        navigate('/')
        setIsSignedIn(true)
        console.log('Signin successful')
      }
    } catch (err) {
      console.error('Signin failed:', err)
    }
  }

  return (
    <SigninForm
      formData={formData}
      onChange={handleInputChange} // Use the form handler from the hook
      onSubmit={handleSubmit}
    />
  )
}

export default SigninContainer
