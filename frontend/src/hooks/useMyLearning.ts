import { useEffect, useState } from "react"
import { handleGetEnrollCourses } from "../services/enrollment"

const useMyLearning = () => {
    const [enrollCourses, setEnrollCourses] = useState()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const getEnrollCourses = async()=>{
            try{
                const courses = await handleGetEnrollCourses()
                if (courses) {
                  console.log(courses)
                  setEnrollCourses(courses)
                  setLoading(false)
                }
            }catch(error){
                console.log(error)
                setError("something went wrong while fetching enroll courses")
            }
        }

        getEnrollCourses()
    },[])
  return { enrollCourses, loading, error}
}

export default useMyLearning
