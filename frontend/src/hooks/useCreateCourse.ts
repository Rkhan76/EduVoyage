import { useState } from 'react'
import { handleCreateCourseByTeacher } from '../services/Courses'
import { useNavigate } from 'react-router-dom'

const useCreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const createCourse = async (courseData: {
    title: string
    description: string
    price: number
    domain: string
    subDomains: string[]
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await handleCreateCourseByTeacher(courseData)
      if(result){
        setIsLoading(false)
        return result
      }
      setIsLoading(false)
      return result
    } catch (err) {
      setError('Failed to create course.')
      setIsLoading(false)
      throw err
    }
  }

  return { createCourse, isLoading, error }
}

export default useCreateCourse
