import { useEffect, useState } from 'react'
// import { useRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
// import { selectedCourseState } from '../store/atoms/Course'
import { handleFetchCourseDetails } from '../services/Courses'
import { Course } from '../types/types'

const useFetchCourseDetails = () => {
    const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState<Course | {}>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        if (courseId) {
          const courseDetailsData = await handleFetchCourseDetails(courseId)
          setCourseDetails(courseDetailsData)
          setLoading(false)
        }
      } catch (err) {
        setError('Failed to fetch course details.')
        setLoading(false)
      }
    }

    fetchCourseDetails()
  }, [courseId]) 

  return { courseDetails, loading, error }
}

export default useFetchCourseDetails
