import axios from 'axios'
import Cookies from 'js-cookie'
const BASE_URL = import.meta.env.VITE_API_URL

export const handleFetchCourseByDomainAndSubdomain = async (
  selectedDomainName: string | null,
  selectedSubdomainName: string | null
) => {
  try {
    const response = await axios.get(`${BASE_URL}/course/view/bysubdomain`, {
      params: { selectedDomainName, selectedSubdomainName },
    })

    return response.data.courses
  } catch (error) {
    throw new Error('Error fetching courses')
  }
}

export const checkDomainExists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/domain`)

    if (response.data.success === true) {
      return response.data.data
    }

    return null
  } catch (error) {
    return false
  }
}

export const handleFetchAllCourse = async (domainName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/course/view/bydomain`, {
      params: { domainName },
    })

    if (response.data.success === true) {
      return response.data.data
    }

    return null
  } catch (error) {
    return false
  }
}

export const handleFetchCourseDetails = async (selectedCourseID: string) => {
  try {
    const courseDetails = await axios.get(
      `${BASE_URL}/course/view/${selectedCourseID}`
    )

    if (courseDetails.data.success === true) {
      return courseDetails.data.courseDetail
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}


export const handleFetchCourseByTeacher = async()=>{
  try {
    const token = Cookies.get('token')

    if (!token) {
      throw new Error('No token found, please sign in')
    }

    const response = await axios.get(
      `${BASE_URL}/course/teacher/view`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.data.success) {
      console.log("corses data is on api of teacher ", response.data.courses)
      return response.data.courses
    } else {
      console.error('Error fetching courses details:', response.data.error)
      return []
    }
  } catch (error) {
    console.error('Failed to fetch courses details:', error)
    return []
  }
}

export const handleCreateCourseByTeacher = async (courseData: {
  title: string
  description: string
  price: number
  domain: string
  subDomains: string[]
}) => {
  try {
    const token = Cookies.get('token') 
    const response = await axios.post(`${BASE_URL}/course/add`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}