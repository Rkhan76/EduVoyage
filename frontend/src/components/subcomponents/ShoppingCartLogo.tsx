import { useRecoilState } from 'recoil'
import ShoppingCartImage from "../../assets/shopping-cart.png"
import { cartState } from '../../store/atoms/Cart'
import { IsSingnedIn } from '../../store/atoms/IsSignedIn'

const ShoppingCartLogo = () => {
  const [cart] = useRecoilState(cartState)
  const [isSignedIn] = useRecoilState(IsSingnedIn)

  return (
    <div className="relative flex items-center">
      <img
        src={ShoppingCartImage}
        alt="Shopping Cart Logo"
        className="w-8 h-8"
      />
      {isSignedIn && (
        <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-600 text-white rounded-full px-1 text-xs font-bold">
          {cart.length}
        </span>
      )}
    </div>
  )
}

export default ShoppingCartLogo
