import { useSetRecoilState } from 'recoil'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { IsSingnedIn } from '../../store/atoms/IsSignedIn'

const LogoutButton = () => {
  const setIsSignedIn = useSetRecoilState(IsSingnedIn)
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('token')
    setIsSignedIn(false)
    navigate('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  )
}

export default LogoutButton
