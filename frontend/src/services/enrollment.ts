import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_API_URL


export async function handleGetEnrollCourses() {
    const token = Cookies.get('token')
    console.log(token)
    
     try {
       const response = await axios.get(
         `${BASE_URL}/enrollment/enrolled-courses`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       )

       console.log(response.data.enrolledCourses, "here is the enrolled courses")
       if (response.data.success === true) return response.data.enrolledCourses

       return null
     } catch (error: any) {
       console.error(error)
       throw new Error(
         error.response?.data?.error || 'Failed to fetch the enrolled courses'
       )
     }
}