import React from 'react'
import { useEffect,useState } from 'react';
import {NavLink} from 'react-router-dom';
function Navbar({storeToken,setStoreToken}) {
  const [logout,setLogout]=useState(false);
  function accLogout()
  {
    localStorage.removeItem('token');
    setStoreToken(null)
  }
 
  return (
    <>
    <nav className='navbar bg-warning'>
        <h1 className='navbar-brand ps-3'>TODO</h1>
        <div className='me-5 d-flex justify-content-between gap-5'>
            <NavLink className=' topNav btn btn-outline-primary' to={'/'}>Dashboard</NavLink>
            {storeToken ? <button onClick={accLogout} className='topNav btn btn-danger'>Logout</button>: ''}
        </div>
    </nav>
    </>
  )
}

export default Navbar;