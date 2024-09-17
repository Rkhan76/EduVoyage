import { useState } from 'react'
import MindBulbImg from '../assets/signin-side-image.png'
import FormButton from '../components/FormButton'
import { signinUser } from '../services/authService'
import { useSetRecoilState } from 'recoil'
import { IsSingnedIn } from '../store/atoms/IsSignedIn'

const Signin = () => {
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await signinUser(formData)
      if (result) {
        setFormData({ username: '', password: '' })
        setIsSignedIn(true)
        console.log('Signin successful')
      }
    } catch (err) {
      console.error('Signin failed:', err)
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
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-2"
          >
            <label className="block mb-2 text-gray-700 font-bold">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 text-gray-700 font-bold">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <FormButton>Signin</FormButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
