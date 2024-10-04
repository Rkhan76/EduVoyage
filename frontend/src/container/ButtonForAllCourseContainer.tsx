import { useRecoilValue } from 'recoil'
import { selectedDomainNameState } from '../store/atoms/DomainAndSubdomain'
import { useNavigate } from 'react-router-dom'
import ButtonForAllCourse from '../components/ButtonForAllCourse'

const ButtonForAllCourseContainer = () => {
  const navigate = useNavigate()
  const domainName = useRecoilValue(selectedDomainNameState) // Get the domain name from Recoil state

  const handleShowCoursesClick = () => {
    navigate(`/courses/${domainName}`) // Navigate to the courses page with the domain name
  }

  return (
    <ButtonForAllCourse
      domainName={domainName}
      onShowCoursesClick={handleShowCoursesClick}
    />
  )
}

export default ButtonForAllCourseContainer
