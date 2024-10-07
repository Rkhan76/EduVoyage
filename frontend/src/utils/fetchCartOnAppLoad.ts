// import Cookies from 'js-cookie'
// import { handleFetchCart } from '../services/cart'
// import { SetterOrUpdater } from 'recoil'


// export const fetchCartOnAppLoad = async (
//   setCart: SetterOrUpdater<string[]>
// ) => {
//   const token = Cookies.get('token')

//   if (token) {
//     try {
//       const cartData = await handleFetchCart()
//       if (cartData) {
//         console.log(cartData, " cart data is here")
//         setCart(cartData) 
//       }
//     } catch (err) {
//       console.error('Error fetching cart:', err)
//     }
//   }
// }
