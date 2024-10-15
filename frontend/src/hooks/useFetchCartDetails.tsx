import { useEffect, useState } from 'react'
import { fetchCartDetails } from '../services/cart'
import { useRecoilState } from 'recoil'
import { cartDetails } from '../store/atoms/Cart'

export const useFetchCartDetails = () => {
  const [cartData, setCartDetails] = useRecoilState(cartDetails) // Fetch and set atom data
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const fetchedData = await fetchCartDetails()
        setCartDetails(fetchedData) // Update the Recoil atom with fetched data
      } catch (err) {
        setError('Error fetching cart details')
      } finally {
        setLoading(false)
      }
    }

    if (cartData.length === 0) {
      // Only fetch if the atom is empty to avoid unnecessary API calls
      getCartDetails()
    } else {
      setLoading(false) // If data already exists, skip loading state
    }
  }, [cartData, setCartDetails])

  return { cartDetails: cartData, loading, error }
}

export default useFetchCartDetails
