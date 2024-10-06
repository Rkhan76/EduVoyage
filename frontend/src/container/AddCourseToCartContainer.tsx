import React from 'react'
import useAddCourseToCart from '../hooks/useAddCourseToCart'
import AddToCartButton from '../components/subcomponents/AddToCartButton'
import { Course } from '../types/types'

interface AddCourseToCartContainerProps {
  courseDetails: Course
}

const AddCourseToCartContainer: React.FC<AddCourseToCartContainerProps> = ({
  courseDetails,
}) => {
  const { loading, error, isCourseInCart, handleAddToCart } =
    useAddCourseToCart(courseDetails)

  return (
    <div>
      <AddToCartButton
        onClick={handleAddToCart}
        loading={loading}
        isInCart={isCourseInCart}
        courseTitle={courseDetails.title}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default AddCourseToCartContainer
