// src/store/atoms/Cart.ts
import { atom } from 'recoil'

export const cartState = atom<string[]>({
  key: 'cartState', 
  default: [], 
})

export const cartDetails = atom<[]>({
  key: 'cartDetails',
  default: []
})
