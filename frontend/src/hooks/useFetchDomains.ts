// src/hooks/useFetchDomains.ts
import { useState, useEffect } from 'react'
import { handleAllfetchDomainNameOnly } from "../services/domainAndSubdomain"

interface Domain {
  id: string
  name: string
  courses: any[]
}

export const useFetchDomains = () => {
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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

  console.log("domains is here after usefetchdomain : ",domains)

  return { domains, loading, error }
}
