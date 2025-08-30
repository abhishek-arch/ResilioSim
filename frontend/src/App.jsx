import { useState } from 'react'
import{Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Routes>
      <Route path='/' element={<Home />} />
            <Route path='/usersignup' element={<UserSignup />} />
                  <Route path='/userlogin' element={<UserLogin />} />
    </Routes>
   </div>
  )
}

export default App
