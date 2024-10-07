import TeachCourse from "../components/TeachCourse"
import useFetchCourseByTeacher from "../hooks/useFetchCourseByTeacher"


const TeachCourseContainer = () => {
    const { loading, error, courses } = useFetchCourseByTeacher()

    if(loading) return <p>loading ...</p>
    if(error) return <div>Error: {error}</div>

  return <TeachCourse courses={courses}/>
}

export default TeachCourseContainer
