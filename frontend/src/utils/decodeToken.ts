import { jwtDecode, JwtPayload } from 'jwt-decode'
import Cookies from 'js-cookie'

interface CustomJwtPayload extends JwtPayload {
  roles?: string[] // Add the roles property
}

export const getDecodedToken = (): CustomJwtPayload | null => {
  const token = Cookies.get('token')

  if (token) {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token)
      console.log(decodedToken, ' on api decoded ')
      return decodedToken
    } catch (error) {
      console.error('Failed to decode token:', error)
    }
  }

  return null
}
