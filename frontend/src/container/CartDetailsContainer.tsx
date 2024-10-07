import CartDetails from '../components/CartDetails'
import useFetchCartDetails from "../hooks/useFetchCartDetails"

const CartDetailsContainer = () => {
  const { cartDetails,loading, error } = useFetchCartDetails()

  if (loading) return <p>Loading ...</p>
  if (error)
    return <p className="text-red-400">Unable to fetch the cart information</p>

  return <CartDetails cartDetails={cartDetails} />
}

export default CartDetailsContainer
