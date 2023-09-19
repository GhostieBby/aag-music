import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Link, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './components/login.js'

export default function App() {
  useEffect(() => {
    async function getData() {
      try {
        await axios.get('/users') // <---- Replace with your endpoint to test the proxy
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  )
}
