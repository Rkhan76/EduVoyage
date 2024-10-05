// hooks/useFetchAllCourses.ts
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { domainState } from '../store/atoms/DomainAndSubdomain'
import { checkDomainExists, handleFetchAllCourse } from '../services/Courses'
import { Course } from '../types/types'

const useFetchAllCourses = ({ domainName }: { domainName: string }) => {
  const [domains, setDomains] = useRecoilState(domainState)
  const [coursesList, setCoursesList] = useState<Course[]>([])
  const [isValidDomain, setIsValidDomain] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const validateDomain = async () => {
      if (domains.length === 0) {
        const fetchedDomains = await checkDomainExists()

        if (fetchedDomains) {
          setDomains(fetchedDomains)
        } else {
          navigate('/not-found')
        }
      } else {
        const validDomain = domains.some((domain) => domain.name === domainName)
        setIsValidDomain(validDomain)
        if (!validDomain) {
          navigate('/not-found')
        }
      }
    }

    const fetchCourses = async () => {
      const courses = await handleFetchAllCourse(domainName)
      if (courses) {
        setCoursesList(courses)
      }
    }

    validateDomain()
    fetchCourses()
  }, [domains, setDomains, navigate, domainName])

  return { domains, coursesList, isValidDomain }
}

export default useFetchAllCourses
