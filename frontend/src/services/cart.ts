import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_API_URL

export const handleAddCourseToCart = async (courseId: string) => {
  const token = Cookies.get('token')
  console.log(token)
  console.log(courseId, 'course id on api function')

  try {
    const response = await axios.post(
      `${BASE_URL}/cart/create`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if(response.data.success === true) return response.data.cartData.courses

    return null
  } catch (error: any) {
    console.error(error)
    throw new Error(
      error.response?.data?.error || 'Failed to add course to cart'
    )
  }
}

export const handleFetchCart = async () => {
  const token = Cookies.get('token')

  try {
    const response = await axios.get(`${BASE_URL}/cart/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if(response.data.success === true) return response.data.cart
    return []
  } catch (error) {
    throw new Error('Failed to fetch cart data')
  }
}

