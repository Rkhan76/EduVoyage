import React from 'react'
import Card from './Card'

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

interface CourseListProps {
  courses: Course[]
  onCourseClick: (courseId: string) => void
}

const CourseList: React.FC<CourseListProps> = ({ courses, onCourseClick }) => {
  return (
    <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Updated grid layout for better styling */}
      {courses.map((course) => (
        <Card
          key={course.id}
          courseCoverImg={''} // You can update this to an actual image URL if available
          title={course.title}
          creator={course.creator.fullname} // Access fullname here
          price={course.price}
          onClick={() => onCourseClick(course.id)} // Pass the onClick event handler
        />
      ))}
    </div>
  )
}

export default CourseList
