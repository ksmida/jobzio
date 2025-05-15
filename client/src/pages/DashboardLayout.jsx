import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

// Create context for managing dashboard state
const DashboardContext = createContext()

// Obtaining logged in user from loader
const DashboardLayout = () => {
  const { user } = useLoaderData()

  const navigate = useNavigate()

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

  // Function to handle user logout. Ensures cookies are cleared.
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logging out...')
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
              <Outlet context={{ user }} />
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
