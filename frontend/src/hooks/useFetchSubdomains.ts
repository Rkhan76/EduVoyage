import { useEffect, useState } from 'react'
import { handleFetchSubdomainByDomain } from '../services/domainAndSubdomain'
import { useRecoilValue } from 'recoil'
import { selectedDomainState } from '../store/atoms/DomainAndSubdomain'

interface SubDomain {
  id: string
  name: string
  domainId: string
  courses: string[]
}

export const useFetchSubdomains = () => {
  const selectedDomainId = useRecoilValue(selectedDomainState)
  const [subdomains, setSubdomains] = useState<SubDomain[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getSubdomains = async () => {
      if (!selectedDomainId) return
      setLoading(true)
      try {
        const data = await handleFetchSubdomainByDomain(selectedDomainId)
        if (data) {
          setSubdomains(data)
        }
      } catch (error) {
        setError('Failed to load subdomains')
      } finally {
        setLoading(false)
      }
    }

    getSubdomains()
  }, [selectedDomainId])

  return { subdomains, loading, error }
}
