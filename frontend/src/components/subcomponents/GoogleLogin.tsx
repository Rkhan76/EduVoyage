// src/components/GoogleLogin.tsx

import { useGoogleLogin } from '@react-oauth/google'
import googleIcon from '../../assets/googleIcon.png'

const GoogleLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (response: any) => void
  onError: () => void
}) => {
  const login = useGoogleLogin({
    onSuccess,
    onError,
    flow: 'auth-code',
  })

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={login}
        className="flex items-center justify-center w-full max-w-sm px-4 py-3 text-blue-800 bg-blue-50 rounded-lg shadow hover:bg-blue-100 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      >
        <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  )
}

export default GoogleLogin
