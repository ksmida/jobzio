import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'
import { useDashboardContext } from '../pages'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  // Access toggleSidebar function from dashboard context
  const { toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        {/* Button to toggle sidebar visibility */}
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        {/* Logo and dashboard title */}
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>

        {/* Container for theme toggle and logout button */}
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
