import { useParams } from 'react-router-dom'
import useFetchAllCourses from '../hooks/useFetchAllCourses'
import AllCourses from '../components/AllCourse'

const FetchAllCoursesContainer = () => {
  const { domainName } = useParams() as { domainName: string }
  const { coursesList, isValidDomain } = useFetchAllCourses({ domainName })

  if (isValidDomain === null) {
    return <p>Loading...</p>
  }

  if (!isValidDomain) {
    return <p>Domain not found.</p> 
  }

  return <AllCourses coursesList={coursesList} />
}

export default FetchAllCoursesContainer
