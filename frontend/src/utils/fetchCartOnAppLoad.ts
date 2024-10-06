import Cookies from 'js-cookie'
import { handleFetchCart } from '../services/cart'
import { SetterOrUpdater } from 'recoil'

// Function to fetch cart on app load
export const fetchCartOnAppLoad = async (
  setCart: SetterOrUpdater<string[]>
) => {
  const token = Cookies.get('token')

  if (token) {
    try {
      const cartData = await handleFetchCart()
      if (cartData && cartData.courses) {
        setCart(cartData.courses) // Ensure the correct type here, which is string[]
      }
    } catch (err) {
      console.error('Error fetching cart:', err)
    }
  }
}
