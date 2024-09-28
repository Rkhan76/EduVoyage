import { SignupParams } from '@rkhan76/common'

export interface SignupFormProps {
  formData: SignupParams
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
