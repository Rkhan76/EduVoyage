import React, { useEffect, useRef } from 'react'
import { useSignupForm } from '../hooks/useSignupForm'
import SignupForm from '../components/SignupForm'
import { signupUser } from '../services/authService'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserRole } from '@rkhan76/common'
import { toast } from 'react-toastify'

const SignupContainer: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { formData, handleInputChange, resetFormData } = useSignupForm()

  const isTeacherSignup = location.pathname === '/teachersignup'
  const role = isTeacherSignup ? UserRole.TEACHER : UserRole.STUDENT

  // Use ref to track the previous pathname
  const prevPathnameRef = useRef(location.pathname)

  useEffect(() => {
    // Only reset form if the route changes between `/signup` and `/teachersignup`
    if (
      (prevPathnameRef.current === '/signup' &&
        location.pathname === '/teachersignup') ||
      (prevPathnameRef.current === '/teachersignup' &&
        location.pathname === '/signup')
    ) {
      resetFormData() // Reset form only when switching between the two paths
    }

    // Update the previous pathname to the current one
    prevPathnameRef.current = location.pathname
  }, [location.pathname, resetFormData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const signupResult = await signupUser({ ...formData, role })
      if (signupResult) {
        toast.success('Signup successful! Redirecting to sign-in...', {
          position: 'top-right',
          autoClose: 2000,
        }) 
        navigate('/signin')
      }
    } catch (error) {
      toast.error('Signup failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      }) // Show error toast
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
