import React from 'react'
import { useSignupForm } from '../hooks/useSignupForm'
import SignupForm from '../components/SignupForm'
import { signupUser } from '../services/authService'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserRole } from '@rkhan76/common'

const SignupContainer: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation() // To detect the current route
  const { formData, handleInputChange } = useSignupForm()

  // Dynamically set the role based on the route
  const isTeacherSignup = location.pathname === '/teachersignup'
   const role = isTeacherSignup ? UserRole.TEACHER : UserRole.STUDENT

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Pass the role dynamically before sending the form data
      const signupResult = await signupUser({ ...formData, role })
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
