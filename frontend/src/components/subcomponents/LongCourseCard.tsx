import React from 'react'
import { Course } from '../../types/types'
import tryImg from "../../assets/teacherImage.jpg"

const LongCourseCard: React.FC<{ course: Course }> = ({ course }) => {
  console.log('data has reached to longcoursecard', course)

  return (
    <div className="border rounded-lg shadow-md p-4 flex items-center">
      <img
        src={tryImg} // Replace with the actual image URL
        alt="Course cover image"
        className="w-32 h-32 object-cover rounded-l-lg mr-4" // Adjusted width and height
      />
      <div className="flex-1">
        <div className="text-lg font-semibold mb-1">{course.title}</div>
        <div className="text-gray-500 text-sm">${course.price.toFixed(2)}</div>
        <div className="text-gray-700 text-sm mt-2">
          {course.description}
        </div>{' '}
        {/* Added description */}
      </div>
    </div>
  )
}

export default LongCourseCard
