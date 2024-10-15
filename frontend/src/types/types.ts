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

// export interface Course {
//   id: string
//   title: string
//   description: string
//   domainName: string
//   subdomainName: string[] // Array since multiple subdomains are possible
//   price: number
//   creatorId: string
//   createdAt: string // ISO string format for timestamps
//   updatedAt: string
// }


export interface CoursesListProps {
  coursesList: Course[]
}


export interface Domain {
  id: string;  
  name: string; 
  
}

export interface DomainNameOnly{
  id: string;
  name: string;
}
