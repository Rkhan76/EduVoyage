import React from "react"
import CourseList from "../components/CourseList"
import { useFetchCourseBySubdomain } from "../hooks/useFetchCourseBySubdomain"

const FetchCoursesContainer: React.FC = () => {
    const { courses, loading, error } = useFetchCourseBySubdomain()
    
    const onCourseClick = (courseId: string)=>{
        console.log("onCourseClick")
    }

    if (loading) return <p className="text-blue-500">Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return <CourseList courses={courses} onCourseClick={onCourseClick} />
}

export default FetchCoursesContainer