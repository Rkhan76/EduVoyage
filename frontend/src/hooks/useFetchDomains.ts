// src/hooks/useFetchDomains.ts
import { useState, useEffect } from 'react'
import { handleAllfetchDomainNameOnly } from "../services/domainAndSubdomain"
import { selectedDomainState } from '../store/atoms/DomainAndSubdomain'
import { useSetRecoilState } from 'recoil'

interface Domain {
  id: string
  name: string
  courses: any[]
}

export const useFetchDomains = () => {
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const setSelectedDomain = useSetRecoilState(selectedDomainState)

  useEffect(() => {
    const getDomains = async () => {
      try {
        const data = await handleAllfetchDomainNameOnly()
        if(data){
            setDomains(data)
            console.log("here is the domains useState ", domains)
        }
        
      } catch (err) {
        setError('Failed to load domains')
      } finally {
        setLoading(false)
      }
    }

    getDomains()
  }, [])

  
  // setSelectedDomain(domains[0].id)
  console.log("domains is here after usefetchdomain : ",domains)

  return { domains, loading, error }
}
