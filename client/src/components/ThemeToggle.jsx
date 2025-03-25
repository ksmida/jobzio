import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../pages/DashboardLayout'

const ThemeToggle = () => {
  // Access dark theme state and toggle function from dashboard context
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext()
  return (
    // Wrapper component acting as a button to toggle the theme
    <Wrapper onClick={toggleDarkTheme}>
      {/* Render sun icon if dark theme is enabled, otherwise render moon icon */}
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill /> // Moon icon for dark mode
      )}
    </Wrapper>
  )
}

export default ThemeToggle
