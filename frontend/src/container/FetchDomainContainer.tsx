import React from 'react'
import { useFetchDomains } from '../hooks/useFetchDomains'
import DomainList from '../components/DomainList'

const DomainContainer: React.FC = () => {
  const { domains, loading, error } = useFetchDomains()

  if (loading) return <p className="text-blue-500">Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return <DomainList domains={domains} />
}

export default DomainContainer
