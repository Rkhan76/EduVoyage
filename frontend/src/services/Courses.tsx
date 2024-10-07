import axios from 'axios'
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
