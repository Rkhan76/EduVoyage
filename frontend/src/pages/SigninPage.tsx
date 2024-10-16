// SigninPage.tsx
import React from 'react'
import MindBulbImg from '../assets/signin-side-image.png'
import SigninContainer from '../container/SigninContainer'
import GoogleAuthContainer from '../container/GoogleAuthContainer'


const SigninPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-6xl">
        <div className="w-1/2 p-6">
          <img
            src={MindBulbImg}
            alt="bulb image showing brain"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-1/2 p-6 flex flex-col items-center">
          <SigninContainer />
          <GoogleAuthContainer/>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
