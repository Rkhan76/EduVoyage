import { useRecoilValue } from 'recoil'
import { selectedDomainNameState, selectedSubdomainNameState } from '../store/atoms/DomainAndSubdomain'
import { useNavigate } from 'react-router-dom'
import ButtonForAllCourse from '../components/ButtonForAllCourse'

const ButtonForAllCourseContainer = () => {
  const navigate = useNavigate()
  const domainName = useRecoilValue(selectedDomainNameState)
  

  const handleShowCoursesClick = () => {
    navigate(`/courses/${domainName}`) 
  }

  return (
    <ButtonForAllCourse
      domainName={domainName}
      onShowCoursesClick={handleShowCoursesClick}
    />
  )
}

export default ButtonForAllCourseContainer
