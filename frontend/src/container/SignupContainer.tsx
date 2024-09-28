import React, { useState } from 'react'
import SignupForm from '../components/SignupForm'
import { signupUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useSignupForm } from '../hooks/useSignupForm'

const SignupContainer: React.FC = () => {
  const navigate = useNavigate()
  const { formData, handleInputChange } = useSignupForm()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const signupResult = await signupUser(formData)
      if (signupResult) {
        navigate('/signin')
      }
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <SignupForm
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}

export default SignupContainer
