import React, { useState } from 'react'
import DomainForm from '../components/DomainForm'
import { toast } from 'react-toastify'
import { handleAddDomainAndSubdomain } from '../services/domainAndSubdomain'

const DomainAndSubdomainContainer: React.FC = () => {
  const [formData, setFormData] = useState({ domainName: '', subdomains: [''] })

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      domainName: e.target.value,
    }))
  }

  const handleSubdomainChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSubdomains = [...formData.subdomains]
      newSubdomains[index] = e.target.value
      setFormData((prevData) => ({
        ...prevData,
        subdomains: newSubdomains,
      }))
    }

  const addSubdomainField = () => {
    setFormData((prevData) => ({
      ...prevData,
      subdomains: [...prevData.subdomains, ''],
    }))
  }

  const removeSubdomainField = (index: number) => {
    const newSubdomains = [...formData.subdomains]
    newSubdomains.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      subdomains: newSubdomains,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const addDomainResult = await handleAddDomainAndSubdomain(formData)
      if (addDomainResult) {
        toast.success('Successfull Add domain and subdomain', {
          position: 'top-right',
          autoClose: 2000,
        })
      }
      setFormData({ domainName: '', subdomains: [''] })
      console.log('Form data submitted:', formData)
    } catch (error) {
        toast.error('something went wrong while adding domain and subdomain', {
          position: 'top-right',
          autoClose: 2000,
        })
    }
  }

  return (
    <DomainForm
      formData={formData}
      handleDomainChange={handleDomainChange}
      handleSubdomainChange={(index: number) => handleSubdomainChange(index)} // Pass the index
      removeSubdomainField={removeSubdomainField}
      addSubdomainField={addSubdomainField}
      onsubmit={handleSubmit}
    />
  )
}

export default DomainAndSubdomainContainer
