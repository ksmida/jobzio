import React from 'react'
import { FaUserCircle, FaCaretDown, FaUser } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { useState } from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'

const LogoutContainer = () => {
  // State to manage visibility of the logout dropdown
  const [showLogout, setShowLogout] = useState(false)

  //Access user and logout function from the dashboard context
  const { user, logoutUser } = useDashboardContext()
  return (
    <Wrapper>
      {/* Button to toggle the logout dropdown menu */}
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle /> {/* User Profile icon */}
        {user?.name} {/* Display logged-in user's name */}
        <FaCaretDown /> {/* Dropdown arrow icon */}
      </button>

      {/*Logout dropdown menu is shown when showLogout is true */}
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        {/* Logout button to trigger logout function */}
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer
