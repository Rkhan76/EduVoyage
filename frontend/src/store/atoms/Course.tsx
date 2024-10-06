import { atom } from 'recoil'

export const selectedCourseState = atom<string>({
  key: 'selectedCourseState',
  default: "",
})