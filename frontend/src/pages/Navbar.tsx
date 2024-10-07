import { NavLink } from 'react-router-dom'
import Button from '../components/Button'
import { useRecoilValue } from 'recoil'
import { IsSingnedIn } from '../store/atoms/IsSignedIn'

const Navbar = () => {
  const isSignedIn = useRecoilValue(IsSingnedIn)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 text-2xl font-bold hover:text-yellow-500'
              : 'text-white text-2xl font-bold hover:text-yellow-400'
          }
        >
          EduVoyage
        </NavLink>
        <ul className="flex space-x-6">
          <li className="flex flex-col justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-400 hover:text-yellow-500'
                  : 'text-white hover:text-yellow-400'
              }
            >
              Home
            </NavLink>
          </li>
          <li className="relative group flex flex-col justify-center">
            <span className="text-white hover:text-yellow-400 cursor-pointer">
              Category
            </span>
            <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <li className="hover:bg-gray-200">
                <NavLink
                  to="/category/technology"
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-400"
                >
                  Technology
                </NavLink>
              </li>
              <li className="hover:bg-gray-200">
                <NavLink
                  to="/category/science"
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-400"
                >
                  Science
                </NavLink>
              </li>
              <li className="hover:bg-gray-200">
                <NavLink
                  to="/category/business"
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-400"
                >
                  Business
                </NavLink>
              </li>
              <li className="hover:bg-gray-200">
                <NavLink
                  to="/category/health"
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-400"
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
                  ? 'text-yellow-400 hover:text-yellow-500'
                  : 'text-white hover:text-yellow-400'
              }
            >
              Plans & Price
            </NavLink>
          </li>
          <li className="flex flex-col justify-center">
            <NavLink
              to="/teachersignup"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-400 hover:text-yellow-500'
                  : 'text-white hover:text-yellow-400'
              }
            >
              Teach on EduVoyage
            </NavLink>
          </li>
          {isSignedIn ? (
            <h1 className='text-white'>logout</h1>
          ) : (
            <>
              <li>
                <NavLink to="/signin">
                  <Button
                    text="login"
                    tailwindcss=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">
                  <Button
                    text="signup"
                    tailwindcss="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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
