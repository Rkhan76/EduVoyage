import React from 'react'

interface CardProps {
  courseCoverImg: string
  title: string
  teacher: string
  price: number | string
}

const Card: React.FC<CardProps> = ({
  courseCoverImg,
  title,
  teacher,
  price,
}) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
      <img
        src={courseCoverImg}
        alt="course Img"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{teacher}</h2>
        <p className="text-lg font-bold text-red-500">{price}</p>
      </div>
    </div>
  )
}

export default Card
