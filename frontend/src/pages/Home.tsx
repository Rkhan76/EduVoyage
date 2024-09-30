import React from 'react'
import HomePageImage1 from '../assets/homepageImage1.jpg'
import FetchDomainPage from "./FectchDomains"


const Home: React.FC = () => {
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
        <FetchDomainPage/>

        {/* Domain Section */}
        {/* <div className="mb-6 flex justify-evenly">
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
        </div> */}
        

        {/* Subdomain Section */}
        {/* <ul className="flex flex-wrap justify-evenly mb-6">
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
        </ul> */}

        {/* Card Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              courseCoverImg={card.courseCoverImg}
              title={card.title}
              teacher={card.teacher}
              price={card.price}
            />
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default Home
