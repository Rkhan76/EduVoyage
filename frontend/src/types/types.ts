import { SignupParams } from '@rkhan76/common'

export interface SignupFormProps {
  formData: SignupParams
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface Course {
  id: string
  title: string
  description: string
  domainName: string
  subdomainName: string[]
  price: number
  creatorId: string
}

export interface CoursesListProps {
  coursesList: Course[]
}


export interface Domain {
  id: string;  
  name: string; 
  
}
