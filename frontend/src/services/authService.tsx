import axios from 'axios'
import Cookies from "js-cookie"
import { SignupParams, SinginParams } from "@rkhan76/common"


const BASE_URL = import.meta.env.VITE_API_URL


export const signupUser = async ({ fullname, email, password, role }: SignupParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      fullname,
      email,
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



export const signinUser = async ({ email, password }: SinginParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, {
      email,
      password,
    })

    if (response.data.success === true) {
      console.log("signin data has been reached to frontend service", response.data)
      return response.data
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (err) {
    console.error('Sign-in failed:', err)
    throw err
  }
}

export const signinWithGoogle = async (code: string, role: string)=>{
  console.log("role on google ", role)
  const response = await axios.get(
    `${BASE_URL}/user/google-login?code=${code}&role=${role}`
  )

  return response
   
}

