import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Challenge from './Pages/Challenge'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Pages/Main'
import TestEditor from './Components/TestEditor'
import AppLayout from './Layouts/AppLayout'
import CreateChallenge from './Components/CreateChallenge'
import OAuth2Success from './Pages/OAuth2Sucess'
import UpdateProfile from './Components/UpdateProfile'
import UpdateChallenge from './Pages/UpdateChallenge'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/oauth2/success" element={<OAuth2Success />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<AppLayout />}>
              <Route path="/profile/:username" element={<Main />} />
              <Route path="/profile/:username/update-profile" element={<UpdateProfile />} />
              <Route path="/create-challenge" element={<CreateChallenge />} />
              <Route path="/challenge" element={<Challenge />} />
              <Route path='/update-challenge/:id' element={ <UpdateChallenge /> } />
              <Route path='/update=profile/:id' element={ <UpdateChallenge /> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
