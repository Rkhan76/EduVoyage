import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_API_URL

export const handleAddDomainAndSubdomain = async (formData: any) => {
  try {
    const token = Cookies.get('token')

    const addDomainSubdomain = await axios.post(
      `${BASE_URL}/domain`,
      formData,
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
    throw error
  }
}

export const handleAllfetchDomainNameOnly = async () => {
  try {
    const domains = await axios.get(`${BASE_URL}/domain`)

    if (domains.data.success === false) {
      return null
    }

    return domains.data.data
  } catch (error) {
    console.error('Error fetching API:', error)
  }
}

export const handleFetchSubdomainByDomain = async (domainId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subdomainsbydomain?domainId=${domainId}`
    )

    return response.data.success === true ? response.data.subdomains : null
  } catch (error) {
    console.error('Error fetching subdomains:', error)
    throw error
  }
}
