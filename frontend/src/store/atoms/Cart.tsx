// src/store/atoms/Cart.ts
import { atom } from 'recoil'
import { Course} from "../../types/types"

export const cartState = atom<Course[]>({
  key: 'cartState', 
  default: [], 
})
