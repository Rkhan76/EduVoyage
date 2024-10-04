import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL


export const handleFetchCourseByDomainAndSubdomain = async (
  selectedDomainId: string | null,
  selectedSubdomainId: string | null,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/course/view/bysubdomain`, {
      params: { selectedDomainId, selectedSubdomainId },
    })

    console.log(response.data.courses, 'course response is here')
    return response.data.courses
  } catch (error) {
    throw new Error('Error fetching courses')
  }
}