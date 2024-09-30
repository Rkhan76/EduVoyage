// src/components/DomainList.tsx
import React from 'react'

interface Domain {
  id: string
  name: string
  courses: any[]
}

interface DomainListProps {
  domains: Domain[]
}

const DomainList: React.FC<DomainListProps> = ({ domains }) => {
    console.log(domains)
  return (
    <div className="flex flex-wrap gap-6">
      {domains.map((domain) => (
        <div
          key={domain.id}
          className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center"
        >
          <h3 className="text-lg font-semibold text-gray-700">{domain.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default DomainList
