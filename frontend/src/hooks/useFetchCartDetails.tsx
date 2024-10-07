import { useEffect, useState } from 'react';
import { fetchCartDetails } from '../services/cart'

export const useFetchCartDetails = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const cartData = await fetchCartDetails();
        setCartDetails(cartData);
      } catch (err) {
        setError('Error fetching cart details');
      } finally {
        setLoading(false);
      }
    };

    getCartDetails();
  }, []);

  return { cartDetails, loading, error }
};

export default useFetchCartDetails

