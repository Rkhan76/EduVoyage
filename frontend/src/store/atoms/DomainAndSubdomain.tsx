import { atom } from 'recoil'
import { Domain } from '../../types/types'

export const selectedDomainState = atom<string | null>({
  key: 'selectedDomainState',
  default: null,
})

export const selectedSubdomainState = atom<string | null>({
  key: 'selectedSubdomainState',
  default: null
})

export const selectedDomainNameState = atom<string | null>({
  key: 'selectedDomainNameState',
  default: null
})

export const selectedSubdomainNameState = atom<string | null>({
  key: 'selectedSubdomainNameState',
  default: null,
})

export const domainState = atom<Domain[]>({
  key: 'domainState',
  default: [],
})