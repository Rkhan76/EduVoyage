import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { cartDetails as cartAtom } from '../store/atoms/Cart'

type Course = {
  id: string
  title: string
  description: string
  domainName: string
  subdomainName: string[]
  price: number
  creatorId: string
  createdAt: string
  updatedAt: string
}

const CartDetails = () => {
  const [cartDetails, setCartDetails] = useRecoilState<Course[]>(cartAtom)
  const navigate = useNavigate()

  const totalAmount = useMemo(() => {
    return cartDetails.reduce((total, course) => total + course.price, 0)
  }, [cartDetails])

  const handleRemove = (id: string) => {
    const updatedCart = cartDetails.filter((course) => course.id !== id)
    setCartDetails(updatedCart)
  }

  const handleCheckout = () => {
    console.log('Proceeding to checkout')
    navigate('/cart/checkout')
  }

  return (
    <div className="container mx-auto my-10 p-4 lg:flex lg:space-x-8">
      {/* Cart Items */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartDetails.length > 0 ? (
          cartDetails.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between border border-gray-300 rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <div className="mt-1 text-sm text-gray-500">
                  <span className="mr-2">Domain: {course.domainName}</span> |
                  <span className="ml-2">
                    Subdomain: {course.subdomainName.join(', ')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">
                  ${course.price.toFixed(2)}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleRemove(course.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="lg:w-1/3">
        <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="text-lg">
            <p className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-medium">${totalAmount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-sm text-gray-500 mb-4">
              <span>Discount</span>
              <span className="font-medium">- $0.00</span>
            </p>
            <p className="flex justify-between text-lg font-semibold border-t pt-4">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full py-3 px-6 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDetails
