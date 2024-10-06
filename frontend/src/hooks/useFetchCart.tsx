import { useEffect, useState } from 'react'
import { handleFetchCart } from '../services/cart'
import { useRecoilState } from 'recoil'
import { cartState } from '../store/atoms/Cart'

const useFetchCart = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cart, setCart] = useRecoilState(cartState)

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true)
      setError(null)

      try {
        const cartData = await handleFetchCart()
        setCart(cartData.courses)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cart data')
      } finally {
        setLoading(false)
      }
    }

    if (cart.length === 0) {
      fetchCartData()
    } else {
      setLoading(false)
    }
  }, [cart, setCart])

  return { loading, error, cart }
}

export default useFetchCart
