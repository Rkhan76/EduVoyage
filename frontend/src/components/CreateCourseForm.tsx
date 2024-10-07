interface CreateCourseFormProps {
  formData: {
    title: string
    description: string
    price: number
    domain: string
    subDomains: string[]
  }
  onInputChange: (field: string, value: string | number | string[]) => void
  onSubmit: () => void
  isLoading: boolean
  error: string | null
}

const CreateCourseForm = ({
  formData,
  onInputChange,
  onSubmit,
  isLoading,
  error,
}: CreateCourseFormProps) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={(e) => onInputChange('price', Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Domain</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.domain}
            onChange={(e) => onInputChange('domain', e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Subdomains</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Separate with commas"
            value={formData.subDomains.join(', ')}
            onChange={(e) =>
              onInputChange(
                'subDomains',
                e.target.value.split(',').map((sub) => sub.trim())
              )
            }
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Course'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  )
}

export default CreateCourseForm
