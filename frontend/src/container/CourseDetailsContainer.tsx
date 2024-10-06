import useFetchCourseDetails from '../hooks/useFetchCourseDetails'
import CourseDetails from "../components/CourseDetails" // Assuming CourseDetails is the component to display the course details

function CourseDetailsContainer() {
  const { courseDetails, loading, error } = useFetchCourseDetails()
  
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return <CourseDetails courseDetails={courseDetails} />
}

export default CourseDetailsContainer
