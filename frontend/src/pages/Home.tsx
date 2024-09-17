import React from 'react'
import HomePageImage1 from '../assets/homepageImage1.jpg'
import SubDomain from '../components/SubDomain'
import Card from '../components/Card'

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
  {
    courseCoverImg: 'https://example.com/images/course2.jpg',
    title: 'Advanced iOS Development',
    teacher: 'John Smith',
    price: '$299',
  },
  {
    courseCoverImg: 'https://example.com/images/course3.jpg',
    title: 'Android Development Bootcamp',
    teacher: 'Alice Johnson',
    price: '$249',
  },
  {
    courseCoverImg: 'https://example.com/images/course4.jpg',
    title: 'Frontend Mastery',
    teacher: 'Bob Brown',
    price: '$179',
  },
  {
    courseCoverImg: 'https://example.com/images/course5.jpg',
    title: 'Backend Development with Node.js',
    teacher: 'Charlie Davis',
    price: '$219',
  },
  {
    courseCoverImg: 'https://example.com/images/course6.jpg',
    title: 'Full Stack Development',
    teacher: 'Emily Wilson',
    price: '$349',
  },
  {
    courseCoverImg: 'https://example.com/images/course7.jpg',
    title: 'Game Development with Unity',
    teacher: 'Michael Lee',
    price: '$399',
  },
  {
    courseCoverImg: 'https://example.com/images/course8.jpg',
    title: 'Mobile Development Essentials',
    teacher: 'Sarah Clark',
    price: '$159',
  },
  {
    courseCoverImg: 'https://example.com/images/course9.jpg',
    title: 'DevOps and Continuous Delivery',
    teacher: 'David Martinez',
    price: '$259',
  },
]

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
          From critical skills to technical topics, Udemy supports your
          professional development.
        </h6>
        <div className="mb-6 flex  justify-evenly">
          <div className="p-3 bg-gray-500 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Development</h3>
          </div>

          <div className="p-3 bg-gray-500 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">IT Certifications</h3>
          </div>

          <div className="p-3 bg-gray-500 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Leadership</h3>
          </div>

          <div className="p-3 bg-gray-500 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Data Science</h3>
          </div>

          <div className="p-3 bg-gray-500 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Communication</h3>
          </div>

          <div className="p-3 bg-gray-500 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">
              Business Analytics & Intelligence
            </h3>
          </div>
        </div>

        <ul className="flex flex-wrap justify-evenly mb-6">
          {subdomains.map((subdomain, index) => (
            <SubDomain index={index} subdomain={subdomain} />
          ))}
        </ul>
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
