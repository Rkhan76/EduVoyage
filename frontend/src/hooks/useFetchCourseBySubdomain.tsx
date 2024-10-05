import { useEffect, useState } from 'react'
import { handleFetchCourseByDomainAndSubdomain } from '../services/Courses'
import { useRecoilValue } from 'recoil'
import {
  selectedDomainNameState,
  selectedDomainState,
  selectedSubdomainNameState,
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
  // const selectedDomainId = useRecoilValue(selectedDomainState)
  // const selectedSubdomainId = useRecoilValue(selectedSubdomainState)
  const selectedDomainName = useRecoilValue(selectedDomainNameState)
  const selectedSubdomainName = useRecoilValue(selectedSubdomainNameState)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getCourseByDomainAndSubdomain = async () => {
      setLoading(true)
      try {
        const data = await handleFetchCourseByDomainAndSubdomain(
          selectedDomainName,
          selectedSubdomainName
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

    if (selectedDomainName && selectedSubdomainName) {
      getCourseByDomainAndSubdomain()
    }
  }, [selectedDomainName, selectedSubdomainName])

  console.log('selectedSubdomainName : ', selectedSubdomainName)
  console.log('selectedDomainName : ', selectedDomainName)

  return { courses, loading, error }
}
