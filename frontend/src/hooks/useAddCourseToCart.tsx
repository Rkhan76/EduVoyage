// src/hooks/useAddCourseToCart.ts
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { cartState } from '../store/atoms/Cart'
import { handleAddCourseToCart } from '../services/cart'
import { Course } from '../types/types'
import { useNavigate } from 'react-router-dom'

const useAddCourseToCart = (courseDetails: Course) => {
  const [cart, setCart] = useRecoilState(cartState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const isCourseInCart = cart.includes(courseDetails.id)

  const handleAddToCart = async () => {
    if (isCourseInCart) {
      navigate('/cart')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await handleAddCourseToCart(courseDetails.id)
      setCart([...cart, courseDetails.id])
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
