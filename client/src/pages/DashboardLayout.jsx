import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom' // Handles nested routes
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { checkDefaultTheme } from '../App'

// Create context for managing dashboard state
const DashboardContext = createContext()

const DashboardLayout = () => {
  // Temprary user data
  const user = { name: 'john' }

  // State for sidebar visibility
  const [showSidebar, setShowSidebar] = useState(false)

  // State for dark theme toggle
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  // Function to toggle dark theme. Ensures dark mode preference persists after page refresh.
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // Function to handle user logout
  const logoutUser = async () => {
    console.log('logout user')
  }

  return (
    //Provides global context
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          {/* Sidebars */}
          <SmallSidebar />
          <BigSidebar />

          <div>
            {/* Navbar */}
            <Navbar />

            {/* Main content area where nested routes are rendered*/}
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

// Custom hook to use DashboardContext() instead of useContext(DashboardContext)
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
