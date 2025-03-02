import './App.css'
import Navbar from './components/Navbar'
import SearchControls from './components/SearchControls'
import Rooms from './components/Rooms';

function App() {

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <SearchControls />
      <Rooms />

    </div>
  )
}

export default App
