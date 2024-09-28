import { useState } from 'react'
import MindBulbImg from '../assets/signin-side-image.png'
import FormButton from '../components/FormButton'
import { signupUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullname: '', username: '', password: '' })
  const [error, setError] = useState(null) // Initialize error as null
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // Fix the event type here
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signupUser(formData)
      if (result) {
        navigate('/signin')
        setFormData({ username: '', password: '' })
      }
    } catch (err) {
      setError('Signup failed. Please try again.')
      console.error('Signup failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-6xl">
        <div className="w-1/2 p-6">
          <img
            src={MindBulbImg}
            alt="bulb image showing brain"
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <form
            className="bg-white rounded-lg shadow-md p-6"
            onSubmit={handleSubmit} // No need to change this part
          >
            <label className="block mb-2 text-gray-700 font-bold">
              FullName
            </label>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-2 text-gray-700 font-bold">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <label className="block mb-2 text-gray-700 font-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <FormButton>{loading ? 'Signing up...' : 'Signup'}</FormButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
