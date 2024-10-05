import { Course } from '../../types/types'
import { CoursesListProps } from '../../types/types'
import LongCourseCard from './LongCourseCard'

const ShowAllCourses: React.FC<CoursesListProps> = ({ coursesList }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {' '}
      {/* Only one card per row */}
      {coursesList.map((course: Course) => (
        <div key={course.id}>
          <LongCourseCard course={course} />
        </div>
      ))}
    </div>
  )
}

export default ShowAllCourses
