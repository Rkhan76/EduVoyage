import { useState } from 'react'
import useCreateCourse from '../hooks/useCreateCourse'
import CreateCourseForm from '../components/CreateCourseForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateCourseContainer = () => {
  const { createCourse, isLoading, error } = useCreateCourse()
  const navigate = useNavigate()

  // State for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    domain: '',
    subDomains: [] as string[],
  })

  // Handle form input changes
  const handleInputChange = (
    field: string,
    value: string | number | string[]
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Reset form after successful creation
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      domain: '',
      subDomains: [],
    })
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await createCourse(formData)

      // Show success toast
      toast.success('Course created successfully!',{
        position: 'top-right',
        autoClose: 2000
      })

      // Reset the form
      resetForm()
      navigate('/teacher/course')
      
    } catch (error) {
      toast.error('Error creating course')
    }
  }

  return (
    <div className="pt-10">
      <CreateCourseForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default CreateCourseContainer
