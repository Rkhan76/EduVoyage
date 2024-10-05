import React, { useEffect } from 'react'
import { useFetchSubdomains } from '../hooks/useFetchSubdomains'
import SubdomainList from '../components/SubdomainList'
import { useSetRecoilState } from 'recoil'
import { selectedSubdomainNameState, selectedSubdomainState} from "../store/atoms/DomainAndSubdomain"

const FetchSubdomainByDomainContainer: React.FC = () => {
  const { subdomains, loading, error } = useFetchSubdomains()
  const setSelectedSubdomain = useSetRecoilState(selectedSubdomainState)
  const setSelectedSubdomainName = useSetRecoilState(selectedSubdomainNameState)
  
  useEffect(()=>{
    if(subdomains.length > 0){
      setSelectedSubdomain(subdomains[0].id)
      setSelectedSubdomainName(subdomains[0].name)
    }
  },[subdomains, setSelectedSubdomain])

  const onSubdomainClick = (subdomainId: string, subdomainName:string) => {
    setSelectedSubdomain(subdomainId)
    setSelectedSubdomainName(subdomainName)
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
