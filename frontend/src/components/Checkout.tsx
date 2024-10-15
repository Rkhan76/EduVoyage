import { useRecoilValue } from 'recoil'
import { cartDetails } from '../store/atoms/Cart'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { getUserIdFromToken } from '../utils/decodeToken'

interface CartItem {
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

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const cartData = useRecoilValue<CartItem[]>(cartDetails)

  useEffect(() => {
    const decodedUserId = getUserIdFromToken() 
    setUserId(decodedUserId)

    const calculatedTotal = cartData.reduce(
      (total, item) => total + item.price,
      0
    )
    setTotalAmount(calculatedTotal)
  }, [cartData])

  console.log(cartData)

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        'http://localhost:5050/api/v1/payment/checkout',
        {
          amount: totalAmount,
          qty: cartData.length,
          cartItems: cartData,
          userId: userId,
        }
      )

      console.log(orderResponse, 'order response is here')

      const { orderId, amount: orderAmount } = orderResponse.data

      const options = {
        key: 'rzp_test_qsDtvz2XagPuPq',
        amount: orderAmount * 100,
        currency: 'INR',
        name: 'Web Dev Mastery',
        description: 'Web Dev Mastery Courses',
        order_id: orderId,
        handler: async (response: any) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            userId: userId,
            courseItems: cartData,
          }

          try {
            const apiResponse = await axios.post(
              'http://localhost:5050/api/v1/payment/verify-payment',
              paymentData
            )

            if (apiResponse.data.success) {
              console.log('successfully purchased')
              // Clear cart and navigate to order confirmation
            }
          } catch (error) {
            console.error('Verification Error:', error)
          }
        },
        prefill: {
          name: '', // Replace with user's full name
          email: 'john.doe@example.com', // Replace with user's email
          contact: '', // Replace with user's phone number
        },
        theme: {
          color: '#4f46e5',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

        {cartData.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <span className="text-sm font-medium text-gray-700">
                      Domain: {item.domainName} | Subdomains:{' '}
                      {item.subdomainName.join(', ')}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-blue-600">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between text-xl font-semibold">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition-colors"
              onClick={handlePayment}
            >
              Proceed to Pay
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Checkout
