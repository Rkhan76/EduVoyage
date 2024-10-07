import { useEffect, useState } from 'react'
import { handleFetchCourseByTeacher } from '../services/Courses'

const useFetchCourseByTeacher = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourseByTeacher = async () => {
      try {
        const courses = await handleFetchCourseByTeacher()

        if (courses) {
          setCourses(courses)
        } else {
          setError('Error fetching courses data')
        }
      } catch (err) {
        setError('Error fetching courses data')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseByTeacher()
  }, [])

  return { loading, error, courses }
}

export default useFetchCourseByTeacher
