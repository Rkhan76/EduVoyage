import React from 'react'
import { Course } from '../../types/types'
import tryImg from '../../assets/teacherImage.jpg'
import { useNavigate } from 'react-router-dom'
// import { useSetRecoilState } from 'recoil'
// import { selectedCourseState } from '../../store/atoms/Course'

const LongCourseCard: React.FC<{ course: Course }> = ({ course }) => {
  // const setSelectedCourse = useSetRecoilState(selectedCourseState)
  const navigate = useNavigate()

  const handleCourseClick = () => {
    // setSelectedCourse(course.id) 
    navigate(`/course/${course.id}`)
  }

  return (
    <div
      onClick={handleCourseClick}
      className="border rounded-lg shadow-md p-4 flex items-center cursor-pointer"
    >
      <img
        src={tryImg}
        alt="Course cover image"
        className="w-32 h-32 object-cover rounded-l-lg mr-4"
      />
      <div className="flex-1">
        <div className="text-lg font-semibold mb-1">{course.title}</div>
        <div className="text-gray-500 text-sm">${course.price.toFixed(2)}</div>
        <div className="text-gray-700 text-sm mt-2">{course.description}</div>
      </div>
    </div>
  )
}

export default LongCourseCard
