import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './styles/App.css'
import Header from './components/Header'
import BuildingsList from './components/BuildingsList'

function App() {
  return (
    <>
      <Header />
      <BuildingsList />
    </>
  )
}

export default App
