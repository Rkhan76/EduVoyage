import axios from 'axios'
import Cookies from "js-cookie"
import { SignupParams, SinginParams } from "@rkhan76/common"


const BASE_URL = import.meta.env.VITE_API_URL


export const signupUser = async ({ fullname, username, password, role }: SignupParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      fullname,
      username,
      password,
      role
    })

    if (response.data.success === true) {
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



export const signinUser = async ({ username, password }: SinginParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, {
      username,
      password,
    })

    console.log(response)
    if (response.status === 200) {
      const token = response.data.userData.token
      Cookies.set('token', token, { expires: 7, path: '/' })
      console.log(Cookies)
      return response.data
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (err) {
    console.error('Sign-in failed:', err)
    throw err
  }
}

