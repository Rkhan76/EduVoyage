import React from 'react'

interface AddToCartButtonProps {
  onClick: () => void
  loading: boolean
  isInCart: boolean
  courseTitle: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  loading,
  isInCart,
  courseTitle,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      disabled={loading} // Disable the button while loading
    >
      {loading
        ? 'Adding...'
        : isInCart
        ? 'Go to Cart'
        : `Add ${courseTitle} to Cart`}
    </button>
  )
}

export default AddToCartButton
