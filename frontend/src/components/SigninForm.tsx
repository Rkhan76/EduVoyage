import React from 'react'
import { SinginParams } from '@rkhan76/common'

interface SigninFormProps {
  formData: SinginParams
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errorMessage: string | null // New prop for error message
}

const SigninForm: React.FC<SigninFormProps> = ({
  formData,
  onChange,
  onSubmit,
  errorMessage, // Destructure error message prop
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6">
      {errorMessage && (
        <div className="mb-4 text-red-600">{errorMessage}</div> // Show error message
      )}
      <label className="block mb-2 text-gray-700 font-bold">Email</label>
      <input
        name="email"
        value={formData.email}
        onChange={onChange}
        type="text"
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block mb-2 text-gray-700 font-bold">Password</label>
      <input
        name="password"
        value={formData.password}
        onChange={onChange}
        type="password"
        required
        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded transition duration-200 hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  )
}

export default SigninForm
