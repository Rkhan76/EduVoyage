import React, { useState } from 'react'
import HomePageImage1 from '../assets/homepageImage1.jpg'
import HomePageImage2 from '../assets/homepageImage2.jpeg'
import HomePageImage3 from '../assets/homepageimage3.jpeg'
import FetchDomainPage from './FectchDomains'
import FetchSubdomainPage from './FetchSubdomainPage'
import FetchCourseBySubdomainPage from './FetchCourseBySubdomainPage'
import ButtonForAllCourseContainer from '../container/ButtonForAllCourseContainer'

const Home: React.FC = () => {
  const images = [HomePageImage1, HomePageImage2, HomePageImage3] // Add your images here
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="md:px-16 py-8">
      <div className="relative w-full h-64 mb-6">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg" // Added rounded corners
        />

        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-custom-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition"
        >
          <span className="text-3xl">&#8249;</span>
        </button>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-custom-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition"
        >
          <span className="text-3xl">&#8250;</span>
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">
          All the skills you need in one place
        </h1>
        <h6 className="text-lg text-gray-700 mb-6">
          From critical skills to technical topics, EduVoyage supports your
          professional development.
        </h6>
        <FetchDomainPage />
        <FetchSubdomainPage />
        <FetchCourseBySubdomainPage />
        <ButtonForAllCourseContainer />
      </div>
    </div>
  )
}

export default Home
