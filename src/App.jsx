import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TheForm from './TheForm'

function App() {
  let [uzers, setUzers] = useState([]);    //מערך לשמירת כל המשתמשים

  const saveUzers = (newUzers) =>{         //פונקציה לשמירה...
    setUzers((prevUzers) => [...prevUzers, newUzers])
  }
  console.log(uzers)

  return (
    <div>
      <TheForm saveUzers = {saveUzers}/>
    </div>
  )
}

export default App
