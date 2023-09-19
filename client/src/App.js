import {  Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './components/Login.js'
import Register from './components/Register.js'
import ProfilePage from './components/Profilepage.js'
import SearchUser from './components/SearchUser.js'
import SendRec from './components/SendRec.js'

// export default function App() {
//   useEffect(() => {
//     async function getData() {
//       try {
//         await axios.get('/users') // <---- Replace with your endpoint to test the proxy
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getData()
//   }, [])



// const acceptButton = document.getElementById('accept-button')
// const declineButton = document.getElementById('decline-button')

// acceptButton.addEventListener('click', async (res, req, next) => {
//   try {
//     const recommendationId = '...'
//     const response = await axios.patch(`/api/recs/${recommendationId}`)
//   } catch (error) {
//     return res.status(500).json({})
//   }
// })



function App() {
  return (
    <main>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profilepage' element={<ProfilePage />}></Route>
        <Route path='/searchuser' element={<SearchUser />}></Route>
        <Route path='/sendrec' element={<SendRec />}></Route>
      </Routes>
    </main>
  )
}


export default App