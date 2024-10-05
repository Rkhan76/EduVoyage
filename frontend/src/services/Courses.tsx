import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL


export const handleFetchCourseByDomainAndSubdomain = async (
  selectedDomainName: string | null,
  selectedSubdomainName: string | null
) => {
  try {
    const response = await axios.get(`${BASE_URL}/course/view/bysubdomain`, {
      params: { selectedDomainName, selectedSubdomainName },
    })

    console.log(response.data.courses, 'course response is here')
    return response.data.courses
  } catch (error) {
    throw new Error('Error fetching courses')
  }
}

export const checkDomainExists = async ()=> {
  try {
    const response = await axios.get(`${BASE_URL}/domain`)
   
    if(response.data.success === true ){
       console.log(response.data)
      return response.data.data
    }

    return null
    
  } catch (error) {
    console.error('Error checking domain existence:', error)
    return false // Return false if there's an error
  }
}

export const handleFetchAllCourse = async (domainName: string) => {
  console.log(domainName, "domain name is here")
  try {
    const response = await axios.get(`${BASE_URL}/course/view/bydomain`, {
      params: { domainName },
    })

    if (response.data.success === true) {
      console.log(response.data, 'courses data has been fetched from api')
      return response.data.data
    }

    return null
  } catch (error) {
    console.error('Error fetching courses by domain:', error)
    return false
  }
}