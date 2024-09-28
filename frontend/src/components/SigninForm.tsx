// src/components/SigninForm/SigninForm.tsx

import React from 'react'
import {SinginParams} from '@rkhan76/common'

interface SigninFormProps {
  formData: SinginParams
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const SigninForm: React.FC<SigninFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6">
      <label className="block mb-2 text-gray-700 font-bold">Username</label>
      <input
        name="username"
        value={formData.username}
        onChange={onChange}
        type="text"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mb-2 text-gray-700 font-bold">Password</label>
      <input
        name="password"
        value={formData.password}
        onChange={onChange}
        type="password"
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
