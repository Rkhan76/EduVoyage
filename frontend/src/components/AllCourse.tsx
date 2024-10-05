import React from 'react'
import { useParams } from 'react-router-dom'
import ShowAllCourses from './subcomponents/ShowAllCourses'
import { CoursesListProps } from "../types/types"

const AllCourse:React.FC<CoursesListProps> = ({coursesList}) => {
  const { domainName } = useParams<{ domainName: string }>()
  
  return (
    <div>
      <h1>{`All ${domainName} Courses`}</h1>
      <ShowAllCourses coursesList={coursesList} />
    </div>
  )
}

export default AllCourse
