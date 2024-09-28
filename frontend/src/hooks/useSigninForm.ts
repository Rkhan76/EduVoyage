// src/hooks/useSigninForm.ts

import { useState } from 'react'

export const useSigninForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return { formData, handleInputChange }
}
