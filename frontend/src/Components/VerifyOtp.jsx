import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
function VerifyOtp() {
    const [val,setVal]=useState({otp:''});
    const [info,setInfo]=useState('');
    const navigate=useNavigate();

    async function verifyOtp()
    {
        let response=await fetch('https://task-management-backend-54g1.onrender.com/api/user/verifyOtp',{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(val)});
        let {status,message}=await response.json();
        if(!status)
        {
            setInfo(message);
        }
        else
        {
            navigate('/changePassword');
        }
    }
  return (
    <>
    <div className='verifyOtp card col-4 text-center m-auto mt-5'>
        <div className='card-header'>
            <h4>Verify Otp</h4>
        </div>
                <div className='card-body'>
                    <input value={val.otp} onChange={(e)=>setVal({...val,otp:e.target.value})} type="email" className='form-control mb-3' placeholder='Enter otp to verify' />
                    <button onClick={verifyOtp} className='btn btn-primary'>Verify otp</button>
                </div>
    </div>
    <div className='text-center'><NavLink to='/forgotPassword'>forgot password</NavLink></div>
    <h3 style={{color:'red'}} className='text-center'>{info}</h3>
    </>
  )
}

export default VerifyOtp;