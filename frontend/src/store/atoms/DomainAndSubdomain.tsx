import { atom } from 'recoil'

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
