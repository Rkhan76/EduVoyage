import React, { useState, useEffect } from 'react'
import HomePageImage1 from '../assets/homepageImage1.jpg'
import Card from '../components/Card'

const domain = [
  'Development',
  'IT Certifications',
  'Leadership',
  'Data Science',
  'Communication',
  'Business Analytics & Intelligence',
]

const subdomains = [
  'Web Development',
  'iOS Development',
  'Android Development',
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Game Development',
  'Mobile Development',
  'DevOps',
]

const cardData = [
  {
    courseCoverImg: 'https://example.com/images/course1.jpg',
    title: 'Introduction to Web Development',
    teacher: 'Jane Doe',
    price: '$199',
  },
  // More card data here...
]

const Home: React.FC = () => {
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [activeSubdomain, setActiveSubdomain] = useState<string | null>(null)

  // Function to handle domain click
  const handleDomainClick = (title: string) => {
    setActiveTitle(title)
  }

  // Function to handle subdomain click
  const handleSubdomainClick = (subdomain: string) => {
    setActiveSubdomain(subdomain)
    // Fetch data or perform any action you want on click
  }

  // Automatically hit the API and set "Web Development" and "Development" active when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data') // Replace with your API URL
        const data = await response.json()
        console.log('API Data:', data)
        // You can set any state with the API data if needed here
      } catch (error) {
        console.error('Error fetching API:', error)
      }
    }

    fetchData()

    // Set "Web Development" and "Development" as the active subdomain and domain when the page loads
    setActiveSubdomain('Web Development')
    setActiveTitle('Development')
  }, []) // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="p-8">
      <img
        src={HomePageImage1}
        alt="image about studying"
        className="w-full h-auto mb-6"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4">
          All the skills you need in one place
        </h1>
        <h6 className="text-lg text-gray-700 mb-6">
          From critical skills to technical topics, EduVoyage supports your
          professional development.
        </h6>

        {/* Domain Section */}
        <div className="mb-6 flex justify-evenly">
          {domain.map((title, index) => (
            <div
              key={index}
              className="p-3 bg-gray-500 rounded-3xl cursor-pointer"
              onClick={() => handleDomainClick(title)}
            >
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  activeTitle === title ? 'text-red-500' : 'text-black'
                }`}
              >
                {title}
              </h3>
            </div>
          ))}
        </div>

        {/* Subdomain Section */}
        <ul className="flex flex-wrap justify-evenly mb-6">
          {subdomains.map((subdomain, index) => (
            <li key={index}>
              <h3
                className={`text-2xl font-semibold mb-2 cursor-pointer ${
                  activeSubdomain === subdomain ? 'text-red-500' : 'text-black'
                }`}
                onClick={() => handleSubdomainClick(subdomain)}
              >
                {subdomain}
              </h3>
            </li>
          ))}
        </ul>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              courseCoverImg={card.courseCoverImg}
              title={card.title}
              teacher={card.teacher}
              price={card.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
