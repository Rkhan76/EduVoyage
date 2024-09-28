import axios from 'axios'
import Cookies from "js-cookie"


const BASE_URL = import.meta.env.VITE_API_URL


export const signupUser = async ({ fullname, username, password }: AuthB) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      username,
      password,
    })

    if (response.status === 200) {
      console.log("response  is here : ", response)
      return response.data
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (err) {
    console.error('Signup failed:', err)
    throw err
  }
}



export const signinUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, {
      username,
      password,
    })

    if (response.status === 200) {
      const token = response.data.user.token
      Cookies.set('token', token, { expires: 7, path: '/' })
      return response.data
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (err) {
    console.error('Sign-in failed:', err)
    throw err
  }
}

