import ShoppingCartImage from "../../assets/shopping-cart.png"

const ShoppingCartLogo = (NumberOfCourses: string) => {
  return (
    <div>
      <div>{6}</div>
      <img src={ShoppingCartImage} alt="Shopping Cart Logo" />
    </div>
  )
}

export default ShoppingCartLogo
