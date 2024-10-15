import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Types for cart items and user address
interface CartItem {
  courseId: string
  courseName: string
  price: number
  qty: number
}

interface UserAddress {
  fullName: string
  phoneNumber: string
  country: string
  state: string
  pincode: string
  address: string
}

const Checkout1: React.FC = () => {
  const cart = {
    items: [
      { courseId: '1', courseName: 'React Mastery', price: 299, qty: 1 },
      { courseId: '2', courseName: 'Node.js Basics', price: 199, qty: 2 },
    ],
  }

  const userAddress: UserAddress = {
    fullName: 'John Doe',
    phoneNumber: '9999999999',
    country: 'India',
    state: 'Madhya Pradesh',
    pincode: '452001',
    address: 'Vijay Nagar, Indore',
  }

  const url = 'https://api.example.com'
  const user = { _id: '12345' }
  const clearCart = () => console.log('Cart Cleared')

  const [qty, setQty] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    let totalQty = 0
    let totalPrice = 0

    cart.items.forEach((item) => {
      totalQty += item.qty
      totalPrice += item.price * item.qty
    })

    setQty(totalQty)
    setPrice(totalPrice)
  }, [cart])

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `http://localhost:5050/api/v1/payment/checkout`,
        {
          amount: price,
          qty,
          cartItems: cart.items,
          userShipping: userAddress,
          userId: 'e2db274b-9c0f-4c67-a03e-3051825abde3',
        }
      )

      console.log(orderResponse, "order response is here")

      const { orderId, amount: orderAmount } = orderResponse.data

      const options = {
        key: 'rzp_test_qsDtvz2XagPuPq',
        amount: orderAmount * 100, // Convert to subunits
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
            orderItems: cart.items,
            userId: 'e2db274b-9c0f-4c67-a03e-3051825abde3',
            userShipping: userAddress,
          }

          const apiResponse = await axios.post(
            `http://localhost:5050/api/v1/payment/verify-payment`,
            paymentData
          )

          if (apiResponse.data.success) {
            clearCart()
            navigate('/orderconfirmation')
          }
        },
        prefill: {
          name: userAddress.fullName,
          email: 'john.doe@example.com',
          contact: userAddress.phoneNumber,
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
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Order Summary
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <ul className="space-y-2">
              {cart.items.map((item) => (
                <li key={item.courseId} className="flex justify-between">
                  <span>{item.courseName}</span>
                  <span>
                    ₹{item.price} x {item.qty}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total Quantity:</span>
              <span>{qty}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span>₹{price}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <ul className="space-y-2 font-medium">
              <li>Name: {userAddress.fullName}</li>
              <li>Phone: {userAddress.phoneNumber}</li>
              <li>Country: {userAddress.country}</li>
              <li>State: {userAddress.state}</li>
              <li>PinCode: {userAddress.pincode}</li>
              <li>Address: {userAddress.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
            onClick={handlePayment}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout1
