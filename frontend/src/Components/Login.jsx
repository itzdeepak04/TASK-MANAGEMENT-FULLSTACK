import React, { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';

function Login({setStoreToken}) {
    const [val,setVal]=useState({email:'',password:''});
    const [info,setInfo]=useState('');
    const navigate=useNavigate();
    function loginData(e)
    {
        let name=e.target.name;
        let value=e.target.value;
        setVal({...val,[name]:value});
    }
    async function submitData(e)
    {
        e.preventDefault();
        let response=await fetch('https://task-management-backend-kl7k.onrender.com/api/user/login',{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(val)});
        let {status,message,token,name}=await response.json();
        if(!status)
        {
            setInfo(message)
        }
        else
        {
            setStoreToken({token,name});
            localStorage.setItem('token',JSON.stringify({token,name}));
            navigate('/');
        }
    }
  return (
    <>
    <div className=' login card col-3 text-center m-auto mt-5'>
        <form>
            <div className='card-header'>
                <h3>Login Page</h3>
            </div>
            <div className='card-body'>
                <input name='email' value={val.email} className='form-control mb-3' type="text" onChange={loginData} placeholder='Enter your Email address'/>
                <input name='password' value={val.password} className='form-control mb-3' type="password" onChange={loginData} placeholder='Enter your Password'/>
            </div>
            <div className='card-footer'>
                <button onClick={submitData} className='btn btn-primary'>Login</button>
            </div>
        </form>
    </div>
    <h4 className='text-center'>Don't have an Account ? <NavLink to='/signup'>SignUp</NavLink></h4>
    <div className='text-center'><NavLink to='/forgotPassword'>Forget Password</NavLink></div>
    <h3 style={{color:'red', textAlign:'center'}}>{info}</h3>
    </>
  )
}

export default Login;