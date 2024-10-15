// // src/PaymentHistory.tsx
// import React from 'react'

// // Define Payment interface for TypeScript
// interface Payment {
//   id: number
//   date: string
//   description: string
//   amount: number
//   status: 'Completed' | 'Pending' | 'Failed'
// }

// // Payment data
// const payments: Payment[] = [
//   {
//     id: 1,
//     date: '2024-09-01',
//     description: 'Product Purchase',
//     amount: 99.99,
//     status: 'Completed',
//   },
//   {
//     id: 2,
//     date: '2024-08-28',
//     description: 'Service Subscription',
//     amount: 49.99,
//     status: 'Pending',
//   },
//   {
//     id: 3,
//     date: '2024-08-25',
//     description: 'Gift Card Purchase',
//     amount: 25.0,
//     status: 'Completed',
//   },
//   {
//     id: 4,
//     date: '2024-08-20',
//     description: 'Product Purchase',
//     amount: 149.99,
//     status: 'Failed',
//   },
// ]

// // Helper function to get status color
// const getStatusColor = (status: Payment['status']): string => {
//   switch (status) {
//     case 'Completed':
//       return 'text-green-500'
//     case 'Pending':
//       return 'text-yellow-500'
//     case 'Failed':
//       return 'text-red-500'
//     default:
//       return 'text-gray-500'
//   }
// }

// const PaymentHistory: React.FC = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h1>
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               {['Date', 'Description', 'Amount', 'Status'].map((header) => (
//                 <th
//                   key={header}
//                   className="py-3 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment.id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{payment.date}</td>
//                 <td className="py-3 px-4 border-b">{payment.description}</td>
//                 <td className="py-3 px-4 border-b">
//                   ₹{payment.amount.toFixed(2)}
//                 </td>
//                 <td
//                   className={`py-3 px-4 border-b ${getStatusColor(
//                     payment.status
//                   )}`}
//                 >
//                   {payment.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default PaymentHistory
