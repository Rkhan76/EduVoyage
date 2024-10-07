import CartDetails from "../components/CartDetails"
import useFetchCart from "../hooks/useFetchCart"

const CartDetailsContainer = () => {
    const { loading, error, cart } = useFetchCart()

    if(loading) return <p>Loading ...</p>
    if(error) return <p className="text-red-400">Unable to fetch the cart information</p>

  return <CartDetails cart={cart} />
}

export default CartDetailsContainer
