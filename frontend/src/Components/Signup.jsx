import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';

function Signup() {
    const [info,setInfo]=useState('');
    const [val,setVal]=useState({name:'',email:'',dob:'',password:''});
    const [confirm,setConfirm]=useState('');
    const [strong,setStrong]=useState(false)
    const [serverStatus,setServerStatus]=useState(false);
    const navigate=useNavigate();
    function storeData(e)
    {
        let name=e.target.name;
        let value=e.target.value;
        setVal({...val,[name]:value});
    }

    async function submitData(e)
    {
        e.preventDefault();
        if(val.password !=confirm)
        {
            return setInfo("Password and Confirm Password are not matching");
        }

        let response=await fetch('https://task-management-backend-54g1.onrender.com/api/user/signup',{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(val)});
        let {status,message}=await response.json();
        if(status)
        {
            navigate('/login')
        }
        else
        {
        setServerStatus(status);
        setInfo(message);
        }
    }

    function isStrong()
    {
        let upper=false,lower=false,special=false,pnumber=false,plength=false;
        if(val.password.length>8)
        {
            plength=true;
        }
        for(let ele of val.password)
        {
            if(ele>='A' && ele<='Z')
            {
                upper=true;
            }
            else if(ele>='a' && ele<='z')
            {
                lower=true;
            }
            else if(ele>='0' && ele<='9')
            {
                pnumber=true;
            }
            else
            {
                special=true;
            }
        }
        if(upper && lower && pnumber && special && plength)
        {
            setStrong(true);
        }
        else
        {
            setStrong(false)
        }
    }
    useEffect(()=>{
        isStrong();
    },[val.password])
  return (
    <>
    <div className='signup card col-3 text-center m-auto mt-5'>
        <form action="">
            <div className='card-header'>
                <h3>Signup Page</h3>
            </div>
            <div className='card-body'>
                <input name='name' type="text" value={val.name} onChange={storeData} className='form-control mb-3' placeholder='Enter your Name'/>
                <input name='email' type="email" value={val.email} onChange={storeData} className='form-control mb-3' placeholder='Enter your Email Address'/>
                <label style={{textAlign:'start'}}>Date of birth:</label>
                <input name='dob' type="date" value={val.dob} onChange={storeData} className='form-control mb-3' placeholder='Select Date of Birth'/>
                <input name='password' type="password" value={val.password} onChange={storeData} className='form-control mb-3' placeholder='Enter your Password'/>
                <div style={{color:`${strong ? 'green' : 'red'}`}}>{strong ? 'Strong' : val.password ? 'Weak' : ''}</div>
                <input style={{cursor:`${strong ? 'text' : 'no-drop'}`}} disabled={strong==false} value={confirm}  onChange={(e)=>setConfirm(e.target.value)} type="password" className='form-control' placeholder='Confirm Password'/>
            </div>
            <div className='card-footer'>
                <button onClick={submitData} className='btn btn-warning'>Signup</button>
            </div>
        </form>
    </div>
    <h4 className='text-center'>Already have an Account ?<NavLink to='/login'>Login</NavLink></h4>
    <h3 style={{color:'red', textAlign:'center'}}>{serverStatus ? '' : info}</h3>
    </>
  )
}

export default Signup;