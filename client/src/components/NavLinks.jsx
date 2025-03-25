import React from 'react'
import { useDashboardContext } from '../pages'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext()
  return (
    /* Navigation links. Each link nivigates to a different page and conditionally closes sidebar*/
    <div>
      <div className='nav-links'>
        {links.map((link) => {
          const { text, path, icon } = link
          return (
            <NavLink
              to={path}
              key={text}
              className='nav-link'
              onClick={isBigSidebar ? null : toggleSidebar} //When a NavLink item is clicked, side bar doesn't auto-close
              end
            >
              <span className='icon'>{icon}</span>
              {text}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default NavLinks
