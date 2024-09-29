import React from 'react'

interface DomainSubdomainFormState {
  domainName: string
  subdomains: string[]
}

interface FormBodyProps {
  formData: DomainSubdomainFormState
  handleDomainChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubdomainChange: (
    index: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void // Updated to accept index
  removeSubdomainField: (index: number) => void
  addSubdomainField: () => void
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const DomainForm: React.FC<FormBodyProps> = ({
  formData,
  handleDomainChange,
  handleSubdomainChange,
  removeSubdomainField,
  addSubdomainField,
  onsubmit,
}) => {
  return (
    <form
      onSubmit={onsubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      {/* Domain Name Field */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="domainName"
        >
          Domain Name
        </label>
        <input
          id="domainName"
          type="text"
          placeholder="Enter Domain Name"
          value={formData.domainName}
          onChange={handleDomainChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Subdomain Fields */}
      {formData.subdomains.map((subdomain, index) => (
        <div key={index} className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={`subdomain-${index}`}
          >
            Subdomain {index + 1}
          </label>
          <div className="flex items-center space-x-3">
            <input
              id={`subdomain-${index}`}
              value={subdomain}
              placeholder={`Enter Subdomain ${index + 1}`}
              type="text"
              onChange={handleSubdomainChange(index)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              onClick={() => removeSubdomainField(index)}
              className={`bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 focus:outline-none ${
                formData.subdomains.length === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={formData.subdomains.length === 1}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add Another Subdomain Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={addSubdomainField}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Another Subdomain
        </button>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Submit Domain and Subdomain
        </button>
      </div>
    </form>
  )
}

export default DomainForm
