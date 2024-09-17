import React from 'react'

// Define a type for the props
interface SubDomainProps {
  subdomain: string | ""
  index: number
}

const SubDomain: React.FC<SubDomainProps> = ({ subdomain, index }) => {
  return (
    <li className="bg-red-300 p-3 rounded-3xl" key={index}>
      {subdomain}
    </li>
  )
}

export default SubDomain
