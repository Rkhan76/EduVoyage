import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logo-white.png'
import FacebookLogo from '../assets/facebook-logo.png'
import LinkedInLogo from '../assets/linkedin-logo.png'
import TwitterLogo from '../assets/twitter-logo.png'
import InstagramLogo from '../assets/instagram-logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="mb-6 md:mb-0">
          <img
            src={Logo}
            alt="EduVoyage Logo"
            className="h-12 md:h-16 rounded-full"
          />
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <NavLink
            to="/terms-condition"
            className={({ isActive }) =>
              isActive
                ? 'block text-yellow-400 hover:text-yellow-500'
                : 'block text-white hover:text-yellow-400'
            }
          >
            Terms & Conditions
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) =>
              isActive
                ? 'block text-yellow-400 hover:text-yellow-500'
                : 'block text-white hover:text-yellow-400'
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? 'block text-yellow-400 hover:text-yellow-500'
                : 'block text-white hover:text-yellow-400'
            }
          >
            Contact Us
          </NavLink>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Follow us</h4>
          <div className="flex space-x-4">
            <NavLink to="">
              <img src={LinkedInLogo} alt="LinkedIn Logo" className="h-8 w-8" />
            </NavLink>
            <NavLink to="">
              <img src={TwitterLogo} alt="Twitter Logo" className="h-8 w-8" />
            </NavLink>
            <NavLink to="">
              <img src={FacebookLogo} alt="Facebook Logo" className="h-8 w-8" />
            </NavLink>
            <NavLink to="">
              <img
                src={InstagramLogo}
                alt="Instagram Logo"
                className="h-8 w-8"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Wrap the Footer component with React.memo to avoid unnecessary re-renders
export default Footer
