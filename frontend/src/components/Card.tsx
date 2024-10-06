import React from 'react'
import cardImg from "../assets/teacherImage.jpg"

interface CardProps {
  courseCoverImg: string
  title: string
  creator: string
  price: number | string
  onClick: () => void // Add onClick prop
}

const Card: React.FC<CardProps> = ({
  courseCoverImg,
  title,
  creator,
  price,
  onClick, 
}) => {
  return (
    <div
      className="bg-white border rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={courseCoverImg || cardImg}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{creator}</h2>
        <p className="text-lg font-bold text-red-500">{price}</p>
      </div>
    </div>
  )
}

export default Card
