import React from 'react'
import { Course } from '../types/types'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../store/atoms/Cart'

const CourseDetails: React.FC<{ courseDetails: Course }> = ({
  courseDetails,
}) => {
  const setCart = useSetRecoilState(cartState) 

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, courseDetails]) 
    alert(`${courseDetails.title} has been added to your cart!`)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{courseDetails.title}</h1>
      <p className="text-gray-600 mb-4">{courseDetails.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-green-600">
          ${courseDetails.price.toFixed(2)}
        </span>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-2">
        <h2 className="text-md font-semibold">Subdomains:</h2>
        <ul className="list-disc pl-5">
          {courseDetails.subdomainName.map((subdomain, index) => (
            <li key={index} className="text-gray-700">
              {subdomain}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CourseDetails
