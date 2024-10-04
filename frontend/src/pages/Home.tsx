import React from 'react'
import HomePageImage1 from '../assets/homepageImage1.jpg'
import FetchDomainPage from "./FectchDomains"
import FetchSubdomainPage from "./FetchSubdomainPage"
import FetchCourseBySubdomainPage from './FetchCourseBySubdomainPage'
import ButtonForAllCourseContainer  from "../container/ButtonForAllCourseContainer"


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
        <FetchSubdomainPage/>
        <FetchCourseBySubdomainPage/>
       <ButtonForAllCourseContainer />
      
      </div>
    </div>
  )
}

export default Home
