import React, { useEffect } from 'react'
import { useFetchSubdomains } from '../hooks/useFetchSubdomains'
import SubdomainList from '../components/SubdomainList'
import { useSetRecoilState } from 'recoil'
import { selectedSubdomainState} from "../store/atoms/DomainAndSubdomain"

const FetchSubdomainByDomainContainer: React.FC = () => {
  const { subdomains, loading, error } = useFetchSubdomains()
  const setSelectedSubdomain = useSetRecoilState(selectedSubdomainState)
  
  useEffect(()=>{
    if(subdomains.length > 0){
      setSelectedSubdomain(subdomains[0].id)
    }
  },[subdomains, setSelectedSubdomain])

  const onSubdomainClick = (subdomainId: string)=>{
    setSelectedSubdomain(subdomainId)
  }

  if (loading) return <p className="text-blue-500">Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <SubdomainList
      subdomains={subdomains}
      onSubdomainClick={onSubdomainClick}
    />
  )
}

export default FetchSubdomainByDomainContainer
