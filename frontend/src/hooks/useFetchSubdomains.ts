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
  const selectedDomainId = useRecoilValue(selectedDomainState) // Read the selected domain ID
  const [subdomains, setSubdomains] = useState<SubDomain[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getSubdomains = async () => {
      if (!selectedDomainId) return // Don't fetch if no domain ID is selected
      setLoading(true) // Set loading to true when fetching
      try {
        const data = await handleFetchSubdomainByDomain(selectedDomainId)
        if (data) {
          setSubdomains(data)
          console.log('subdomain data has reached to hook')
        }
      } catch (error) {
        setError('Failed to load subdomains')
      } finally {
        setLoading(false)
      }
    }

    getSubdomains() // Fetch subdomains when selected domain ID changes
  }, [selectedDomainId]) // Depend on selectedDomainId

  return { subdomains, loading, error }
}
