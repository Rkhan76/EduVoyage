import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL
console.log(BASE_URL)

export const signupUser = async ({ username, password }) => {
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

export const signinUser = async ({ username, password })=>{
  console.log(username, password)

  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, {
      username,
      password,
    })

    if (response.status === 200) {
      console.log('response  is here : ', response)
      return response.data
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (err) {
    console.error('Signip failed:', err)
    throw err
  }
}
