import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useDashboardContext } from '../pages'

const BigSidebar = () => {
  // Access sidebar state from the dashboard context
  const { showSidebar } = useDashboardContext()
  return (
    <Wrapper>
      {/* Sidebar is hidden by default on smaller screens and always visible on larger screens */}
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          {/* Sidebar header containing the logo */}
          <header>
            <Logo />
          </header>

          {/*Renders navigation links. Prop passed prevents side bar from closing when link it clicked */}
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
