import { useState } from 'react'

export const useSignupForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const resetFormData = () => {
    setFormData({
      fullname: '',
      email: '',
      password: '',
    })
  }

  return { formData, handleInputChange, resetFormData }
}
