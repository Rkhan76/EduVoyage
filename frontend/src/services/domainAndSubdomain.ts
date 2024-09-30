import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_API_URL

export const handleAddDomainAndSubdomain = async (formData: any) => {
  try {
    const token = Cookies.get('token')
    console.log(token)
    console.log(`${BASE_URL}/domain`)

    const addDomainSubdomain = await axios.post(
      `${BASE_URL}/domain`,
      formData, // Send formData directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )

    if (addDomainSubdomain.data.success !== true) {
      return null
    }

    return addDomainSubdomain.data
  } catch (error) {
    console.error('Error while submitting domain and subdomain data:', error)
    throw error // Optional: re-throw for further handling
  }
}

export const handleAllfetchDomainNameOnly = async () => {
  try {
    const domains = await axios.get(`${BASE_URL}/domain`)

    if (domains.data.success === false) {
      console.log("no domain fetch")
      return null
    }


    return domains.data.data
  } catch (error) {
    console.error('Error fetching API:', error)
  }
}
