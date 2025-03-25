import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()

  return (
    <Wrapper>
      {/* Small sidebar is hidden by default and only appears whem 'showSidebar is true */}
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        {/* Button to close the side bar */}
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>

          {/* Sidebar header containing the logo */}
          <header>
            <Logo />
          </header>

          {/* Render Navigation links*/}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
