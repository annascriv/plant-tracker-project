import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavbarHeader from './components/NavBar'
import Container from 'react-bootstrap/esm/Container'


function App() {
  
  const [myplants, setMyPlants] = useState([])

  return (
    <>
    <NavbarHeader/>
    <Container className='overlay'>
    <Outlet context={{myplants, setMyPlants}}/>
    </Container>

    </>
  )
}

export default App
