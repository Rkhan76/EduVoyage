import React, { useEffect, useCallback } from 'react'
import DomainList from '../components/DomainList'
import { useFetchDomains } from '../hooks/useFetchDomains'
import { useSetRecoilState } from 'recoil'
import {
  selectedDomainState,
  selectedDomainNameState,
} from '../store/atoms/DomainAndSubdomain'

const DomainContainer: React.FC = () => {
  const { domains, loading, error } = useFetchDomains()
  const setSelectedDomain = useSetRecoilState(selectedDomainState)
  const setSelectedDomainName = useSetRecoilState(selectedDomainNameState)
  // Automatically set the first domain as selected once domains are fetched
  useEffect(() => {
    if (domains.length > 0) {
      setSelectedDomain(domains[0].id)
      setSelectedDomainName(domains[0].name)
    }
  }, [domains, setSelectedDomain])

  // Memoize the handleDomainClick function to avoid unnecessary re-renders
  const handleDomainClick = useCallback(
    (domainId: string, domainName: string) => {
      setSelectedDomain(domainId)
      setSelectedDomainName(domainName)
    },
    [setSelectedDomain]
  )

  if (loading) return <p className="text-blue-500">Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return <DomainList domains={domains} onDomainClick={handleDomainClick} />
}

export default DomainContainer
