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