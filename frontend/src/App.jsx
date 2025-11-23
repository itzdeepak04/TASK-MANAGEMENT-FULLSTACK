import React, { useState } from 'react'
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import Dashboard from './Components/Dashboard.jsx';
import VerifyOtp from './Components/VerifyOtp.jsx';
import ChangePassword from './Components/ChangePassword.jsx';

function App() {
  const [storeToken,setStoreToken]=useState(JSON.parse(localStorage.getItem('token')));
  return (
    <>
    <BrowserRouter>
    <Navbar storeToken={storeToken} setStoreToken={setStoreToken}/>
    <Routes>
      <Route path='/' element={<Dashboard storeToken={storeToken} setStoreToken={setStoreToken}/>}></Route>
      <Route path='/login' element={<Login setStoreToken={setStoreToken}/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/verifyOtp' element={<VerifyOtp/>}></Route>
      <Route path='/changePassword' element={<ChangePassword/>}></Route>
      <Route></Route>
      <Route></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;