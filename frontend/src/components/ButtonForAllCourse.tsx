import React from 'react'

interface ButtonForAllCourseProps {
  domainName: string | null
  onShowCoursesClick: () => void // Added onClick prop type
}

const ButtonForAllCourse: React.FC<ButtonForAllCourseProps> = ({
  domainName,
  onShowCoursesClick,
}) => {
  return (
    <button
      onClick={onShowCoursesClick}
      className="bg-black text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-800 transition duration-200"
    >
      {`Show All ${domainName} courses`}
    </button>
  )
}

export default ButtonForAllCourse
