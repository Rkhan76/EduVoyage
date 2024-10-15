import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useRecoilValue } from 'recoil'
import { IsSingnedIn } from '../store/atoms/IsSignedIn'
import ShoppingCartLogo from '../components/subcomponents/ShoppingCartLogo'
import LogoutButton from '../components/subcomponents/LogoutButton'
import { getDecodedToken } from '../utils/decodeToken'
import EduVoyageLogo from '../assets/EduVoyageLogo.png'

const Navbar = () => {
  const isSignedIn = useRecoilValue(IsSingnedIn)
  const navigate = useNavigate()

  const handleTeachOnEduVoyageClick = () => {
    const decodedToken = getDecodedToken()
    console.log(decodedToken, ' token in navbar')

    if (
      decodedToken?.roles?.includes('TEACHER') ||
      decodedToken?.roles?.includes('BOTH')
    ) {
      navigate('/teacher/course')
    } else {
      navigate('/teachersignup')
    }
  }

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/">
          <img className="h-8" src={EduVoyageLogo} alt="EduVoyage Logo" />
        </NavLink>

        <ul className="flex space-x-6">
          <li className="flex flex-col justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-custom-purple hover:text-custom-purple'
                  : 'text-gray-800 hover:text-custom-purple'
              }
            >
              Home
            </NavLink>
          </li>

          <li className="relative group flex flex-col justify-center">
            <span className="text-gray-800 hover:text-custom-purple cursor-pointer">
              Category
            </span>
            <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <li className="hover:bg-gray-100">
                <NavLink
                  to="/category/technology"
                  className="block px-4 py-2 text-gray-800 hover:text-custom-purple"
                >
                  Technology
                </NavLink>
              </li>
              <li className="hover:bg-gray-100">
                <NavLink
                  to="/category/science"
                  className="block px-4 py-2 text-gray-800 hover:text-custom-purple"
                >
                  Science
                </NavLink>
              </li>
              <li className="hover:bg-gray-100">
                <NavLink
                  to="/category/business"
                  className="block px-4 py-2 text-gray-800 hover:text-custom-purple"
                >
                  Business
                </NavLink>
              </li>
              <li className="hover:bg-gray-100">
                <NavLink
                  to="/category/health"
                  className="block px-4 py-2 text-gray-800 hover:text-custom-purple"
                >
                  Health
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="flex flex-col justify-center">
            <NavLink
              to="/plans&pricing"
              className={({ isActive }) =>
                isActive
                  ? 'text-custom-purple hover:text-custom-purple'
                  : 'text-gray-800 hover:text-custom-purple'
              }
            >
              Plans & Pricing
            </NavLink>
          </li>

          <li className="flex flex-col justify-center">
            <button
              onClick={handleTeachOnEduVoyageClick}
              className="text-gray-800 hover:text-custom-purple"
            >
              Teach on EduVoyage
            </button>
          </li>

          <li className="flex flex-col justify-center">
            <NavLink
              to="/mylearning"
              className="text-gray-800 hover:text-custom-purple"
            >
              My Learning
            </NavLink>
          </li>

          <li className="flex flex-col justify-center">
            <NavLink to="/cart">
              <ShoppingCartLogo />
            </NavLink>
          </li>

          {isSignedIn ? (
            <LogoutButton />
          ) : (
            <>
              <li>
                <NavLink to="/signin">
                  <Button
                    text="Login"
                    tailwindcss="bg-transparent hover:bg-gray-200 text-custom-black-high font-semibold py-2 px-4 border border-custom-black hover:border-gray-800"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">
                  <Button
                    text="Signup"
                    tailwindcss="bg-custom-black-high hover:bg-gray-700 text-white font-bold py-2 px-4 border border-custom-black hover:border-gray-700"
                  />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
