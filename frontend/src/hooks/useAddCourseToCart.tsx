// src/hooks/useAddCourseToCart.ts
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { cartState } from '../store/atoms/Cart'
import { handleAddCourseToCart } from '../services/cart'
import { Course } from '../types/types'

const useAddCourseToCart = (courseDetails: Course) => {
  const [cart, setCart] = useRecoilState(cartState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isCourseInCart = cart.includes(courseDetails.id) // Check if course is already in the cart

  const handleAddToCart = async () => {
    if (isCourseInCart) {
      // Redirect to cart if the course is already in the cart
      window.location.href = '/cart'
      return
    }

    setLoading(true)
    setError(null)

    try {
      await handleAddCourseToCart(courseDetails.id)
      setCart([...cart, courseDetails.id]) // Add the course ID to the cart
    } catch (err) {
      setError('Failed to add course to cart.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    isCourseInCart,
    handleAddToCart,
  }
}

export default useAddCourseToCart
