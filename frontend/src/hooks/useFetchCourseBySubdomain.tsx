import { useEffect, useState } from 'react'
import { handleFetchCourseByDomainAndSubdomain } from '../services/Courses'
import { useRecoilValue } from 'recoil'
import {
  selectedDomainState,
  selectedSubdomainState,
} from '../store/atoms/DomainAndSubdomain'

interface Course {
  id: string
  title: string
  description: string
  domainName: string
  subdomainName: string[]
  price: number
  creator: {
    fullname: string // Added fullname here
  }
}

export const useFetchCourseBySubdomain = () => {
  const selectedDomainId = useRecoilValue(selectedDomainState)
  const selectedSubdomainId = useRecoilValue(selectedSubdomainState)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getCourseByDomainAndSubdomain = async () => {
      setLoading(true)
      try {
        const data = await handleFetchCourseByDomainAndSubdomain(
          selectedDomainId,
          selectedSubdomainId
        )

        if (data) {
          setCourses(data)
          console.log(data)
        }
      } catch (error) {
        setError('Failed to fetch the courses')
      } finally {
        setLoading(false)
      }
    }

    if (selectedDomainId && selectedSubdomainId) {
      getCourseByDomainAndSubdomain()
    }
  }, [selectedDomainId, selectedSubdomainId])

  console.log('selectedDomainId', selectedSubdomainId)
  console.log('selectedSubdomainId', selectedSubdomainId)

  return { courses, loading, error }
}
