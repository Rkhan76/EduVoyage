import { jwtDecode, JwtPayload } from 'jwt-decode'
import Cookies from 'js-cookie'

interface DecodedToken {
  userId: string // Unique identifier for the user
  username: string // Username of the user
  fullname: string // Full name of the user
  roles: string[] // Array of roles assigned to the user
  iat: number // Issued at time (in Unix timestamp)
  exp: number // Expiration time (in Unix timestamp)
}


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

export const getUserIdFromToken = (): string | null => {
  const token = Cookies.get('token')

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token)
      console.log(decodedToken, ' on api decoded ')
      return decodedToken.userId
    } catch (error) {
      console.error('Failed to decode token:', error)
    }
  }

  return null
}
