// src/components/DomainList.tsx
import React from 'react'

interface Domain {
  id: string
  name: string
  courses: any[]
}

interface DomainListProps {
  domains: Domain[]
  onDomainClick: (domainId: string, domainName:string) => void
}

const DomainList: React.FC<DomainListProps> = React.memo(({ domains, onDomainClick }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {domains.map((domain) => (
        <div
          key={domain.id}
          className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center cursor-pointer"
          onClick={() => onDomainClick(domain.id, domain.name)}
        >
          <h3 className="text-lg font-semibold text-gray-700">{domain.name}</h3>
        </div>
      ))}
    </div>
  )
})


export default DomainList
