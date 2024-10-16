import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleRedirectingToHomePage = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The page you're looking for does not exist.
      </p>
      <button
        onClick={handleRedirectingToHomePage}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg transition"
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
