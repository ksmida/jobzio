import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const StyledBtn = styled.button`
  font-size: 1.5rem;
  background: red;
  color: white;
`


const HomeLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default HomeLayout
