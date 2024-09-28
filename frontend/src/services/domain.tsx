import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_API_URL

export const handlefetchDomainNameOnly = async () => {
  try {
    
    const token = Cookies.get('token')

    const domains = await axios.get(`${BASE_URL}/domain`, {
      headers: {
        Authorization: `${token}`, 
      },
      withCredentials: true, 
    })

    if (!domains) {
      return null
    }

    return domains.data
  } catch (error) {
    console.error('Error fetching API:', error)
  }
}
