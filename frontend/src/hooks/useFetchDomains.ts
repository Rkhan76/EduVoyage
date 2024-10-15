import { useState, useEffect } from 'react'
import { handleAllfetchDomainNameOnly } from "../services/domainAndSubdomain"
// import { selectedDomainState } from '../store/atoms/DomainAndSubdomain'
// import { useSetRecoilState } from 'recoil'
import { DomainNameOnly } from '@rkhan76/common'


export const useFetchDomains = () => {
  const [domains, setDomains] = useState<DomainNameOnly[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  // const setSelectedDomain = useSetRecoilState(selectedDomainState)

  useEffect(() => {
    const getDomains = async () => {
      try {
        const data = await handleAllfetchDomainNameOnly()
        if(data){
            setDomains(data)
        }
        
      } catch (err) {
        setError('Failed to load domains')
      } finally {
        setLoading(false)
      }
    }

    getDomains()
  }, [])

  
  return { domains, loading, error }
}
