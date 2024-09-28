import React from 'react'
import MindBulbImg from '../assets/signin-side-image.png'
import TeacherImage from '../assets/teacherImage.png'
import SignupContainer from '../container/SignupContainer'
import { useLocation } from 'react-router-dom'

const SignupPage: React.FC = () => {
  const location = useLocation()
  console.log(location.pathname) 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-6xl">
        <div className="w-1/2 p-6">
          <img
            src={location.pathname === '/signup' ? MindBulbImg : TeacherImage}
            alt="bulb image showing brain"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-1/2 p-6 flex items-center">
          <SignupContainer />
        </div>
      </div>
    </div>
  )
}

export default SignupPage
