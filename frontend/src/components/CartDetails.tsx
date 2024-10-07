import { useMemo } from 'react'

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

const CartDetails = ({ cartDetails }: { cartDetails: Course[] }) => {

  
  const totalAmount = useMemo(() => {
    return cartDetails.reduce((total, course) => total + course.price, 0)
  }, [cartDetails])

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6">
      
      <div className="flex-1 p-4">
        {cartDetails.length > 0 ? (
          cartDetails.map((course) => (
            <div
              key={course.id}
              className="flex justify-between items-center border p-4 mb-4 rounded shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-600">{course.description}</p>
                <div className="text-gray-500">
                  <span>Domain: {course.domainName}</span>
                  <span> | Subdomain: {course.subdomainName.join(', ')}</span>
                </div>
              </div>
              <div className="text-green-600 font-semibold text-lg">
                ${course.price.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Total amount and buy button section */}
      <div className="flex-shrink-0 w-full lg:w-1/3 p-4">
        <div className="border p-4 rounded shadow-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="text-lg">
            <p className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold">${totalAmount.toFixed(2)}</span>
            </p>
          </div>
          <button className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDetails
