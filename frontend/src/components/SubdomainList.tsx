// src/components/SubdomainList.tsx
import React from 'react'

interface SubDomain {
  id: string
  name: string
  domainId: string
  courses: string[]
}

interface SubdomainListProps {
  subdomains: SubDomain[]
  onSubdomainClick: (subdomainId: string, subdomainName: string)=> void
}

const SubdomainList: React.FC<SubdomainListProps> = React.memo(
({ subdomains, onSubdomainClick }) => {
  console.log(subdomains, "subdomain is here for your cll")
  return (
    <div className="grid grid-cols-2 gap-4">
      {subdomains.map((subdomain) => (
        <div
          key={subdomain.id}
          onClick={()=> onSubdomainClick(subdomain.id, subdomain.name)}
          className="p-3 bg-blue-50 border border-blue-200 rounded-md shadow-sm text-left"
        >
          <h4 className="text-md font-medium text-blue-700">
            {subdomain.name}
          </h4>
        </div>
      ))}
    </div>
  )
}
)

export default SubdomainList
