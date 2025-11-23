import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
function ForgotPassword() {
  const [val,setVal]=useState({email:''});
  const [info,setInfo]=useState('');
  const navigate=useNavigate();
    async function submitData(e)
    {
      e.preventDefault();
      let response=await fetch('https://task-management-backend-kl7k.onrender.com/api/user/forgotPassword',{method:'POST', credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(val)});
      let {status,message}=await response.json();
      setInfo(message);
      if(status)
      {
        navigate('/verifyOtp');
      }
    }
  return (
    <>
    <div className=' forgot card col-4 text-center m-auto mt-5'>
        <div className='card-header'>
            <h4>Forgot Password</h4>
        </div>
                <div className='card-body'>
                    <input type="email" value={val.email} onChange={(e)=>setVal({...val,email:e.target.value})} className='form-control mb-3' placeholder='Enter your Email Address' />
                    <button onClick={submitData} className='btn btn-primary'>Send Otp</button>
                </div>
    </div>
    <div className='text-center'>Back to login <NavLink to='/login'>Login</NavLink></div>
    <h3 style={{color:'red'}} className='text-center'>{!status&&info}</h3>
    </>
  )
}

export default ForgotPassword;