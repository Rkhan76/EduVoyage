import { useState } from "react"

export const useSignupForm=()=>{
    const [formData, setFormData] = useState({ fullname: "", username: "", password: ""})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    return { formData, handleInputChange }
}