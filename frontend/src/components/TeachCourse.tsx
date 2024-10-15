import { Course } from '../types/types'
import { useNavigate } from 'react-router-dom'

const TeachCourse = ({ courses }: { courses: Course[] }) => {
  const navigate = useNavigate()

  const handleCreateCourse = () => {
    navigate('/teacher/course/create')
  }

  const handleAddLesson = (courseId: string) => {
    navigate(`/teacher/course/${courseId}/lesson/add`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Courses Created By You
        </h1>
        <button
          onClick={handleCreateCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <p className="text-gray-800 font-medium mb-1">
              Domain: <span className="text-gray-900">{course.domainName}</span>
            </p>
            <p className="text-gray-800 font-medium mb-4">
              Subdomains:{' '}
              <span className="text-gray-900">
                {course.subdomainName.join(', ')}
              </span>
            </p>
            <p className="text-green-500 font-bold text-lg mb-4">
              Price: ${course.price.toFixed(2)}
            </p>

            <button
              onClick={() => handleAddLesson(course.id)}
              className="mt-2 w-full bg-indigo-500 text-white py-2 rounded-md shadow hover:bg-indigo-600 transition"
            >
              Add Lesson
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeachCourse
