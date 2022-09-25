import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Searchbar} from "./components/Searchbar"
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Searchbar/> 
    </div>
  )
}

export default App
