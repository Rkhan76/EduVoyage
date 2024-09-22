import React, { useState } from 'react'
import axios from 'axios'

interface DomainSubdomainFormState {
  domainName: string
  subdomains: string[] // Array of subdomains
}

const AddDomainSubdomain: React.FC = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState<DomainSubdomainFormState>({
    domainName: '',
    subdomains: [''], // Start with one subdomain field
  })

  // State to handle success and error messages
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Handle input changes for domain name
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, domainName: e.target.value })
  }

  // Handle input changes for subdomain fields
  const handleSubdomainChange = (index: number, value: string) => {
    const newSubdomains = [...formData.subdomains]
    newSubdomains[index] = value
    setFormData({ ...formData, subdomains: newSubdomains })
  }

  // Add a new subdomain input field
  const addSubdomainField = () => {
    setFormData({ ...formData, subdomains: [...formData.subdomains, ''] })
  }

  // Remove a subdomain input field
  const removeSubdomainField = (index: number) => {
    const newSubdomains = formData.subdomains.filter((_, i) => i !== index)
    setFormData({ ...formData, subdomains: newSubdomains })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    try {
      const response = await axios.post('/api/domains', formData)
      setMessage('Domain and subdomains created successfully!')
      setFormData({ domainName: '', subdomains: [''] }) // Reset form
    } catch (error) {
      setError('Error creating domain and subdomains.')
      console.error(error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Domain and Subdomains</h1>

      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Domain Name */}
        <div>
          <label htmlFor="domainName" className="block font-medium">
            Domain Name
          </label>
          <input
            type="text"
            id="domainName"
            value={formData.domainName}
            onChange={handleDomainChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Subdomain Fields */}
        {formData.subdomains.map((subdomain, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Subdomain ${index + 1}`}
              value={subdomain}
              onChange={(e) => handleSubdomainChange(index, e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeSubdomainField(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              disabled={formData.subdomains.length === 1} // Disable if only one subdomain field
            >
              Remove
            </button>
          </div>
        ))}

        {/* Add Subdomain Button */}
        <button
          type="button"
          onClick={addSubdomainField}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Add Another Subdomain
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Domain and Subdomains
        </button>
      </form>
    </div>
  )
}

export default AddDomainSubdomain
