import { Course } from '../../types/types'
import { CoursesListProps } from '../../types/types'
import LongCourseCard from './LongCourseCard'

const ShowAllCourses: React.FC<CoursesListProps> = ({ coursesList }) => {
  return (
    <div>
    <div></div>
      <div className="grid grid-cols-1 gap-4">
        {coursesList.map((course: Course) => (
          <div key={course.id}>
            <LongCourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowAllCourses
