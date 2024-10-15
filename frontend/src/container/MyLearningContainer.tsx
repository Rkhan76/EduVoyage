import MyLearning from "../components/MyLearning"
import useMyLearning from "../hooks/useMyLearning"

const MyLearningContainer = () => {
    const { enrollCourses, loading, error } = useMyLearning()
  
    if(loading) return <p>loading ...</p>
    if(error)   return <p className="text-red-400">{error}</p>

    return <MyLearning enrollCourses={enrollCourses}/>
}

export default MyLearningContainer
