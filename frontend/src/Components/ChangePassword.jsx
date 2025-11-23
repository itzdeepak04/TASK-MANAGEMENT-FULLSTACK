import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';

function ChangePassword() {
    const [val,setVal]=useState({newPassword:'',confirmPassword:''});
    const [info,setInfo]=useState('');
    const [strong,setStrong]=useState(false);
    const navigate=useNavigate();
   function isStrong()
       {
           let upper=false,lower=false,special=false,pnumber=false,plength=false;
           if(val.newPassword.length>8)
           {
               plength=true;
           }
           for(let ele of val.newPassword)
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
       },[val.newPassword])

    async function changePassword(e)
    {
        e.preventDefault();
        let response=await fetch('https://task-management-backend-kl7k.onrender.com/api/user/changePassword', {method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(val)});
        const {status,message}=await response.json();
        if(!status)
        {
            setInfo(message);
        }
        else
        {
            navigate('/login');
        }
    }
  return (
    <>
    <div className='changePassword card col-3 text-center m-auto mt-5'>
        <form>
            <div className='card-header'>
                <h3>Change Password </h3>
            </div>
            <div className='card-body'>
                <input value={val.newPassword} onChange={(e)=>setVal({...val,newPassword:e.target.value})} name='password' className='form-control mb-3' type="password" placeholder='Enter your New Password'/>
                <div style={{color:strong ? 'green': 'red'}}>{strong ? 'strong' : val.newPassword.length>0 ? 'weak' : ''}</div>
                <input disabled={!strong} style={{cursor:strong ? 'text' : 'no-drop'}} value={val.confirmPassword} onChange={(e)=>setVal({...val,confirmPassword:e.target.value})} name='password' className='form-control mb-3' type="password" placeholder='Enter your confirm password'/>
            </div>
            <div className='card-footer'>
                <button onClick={changePassword} className='btn btn-warning'>Change</button>
            </div>
        </form>
    </div>
    <h3 style={{color:'red', textAlign:'center'}}>{info}</h3>
    </>
  )
}

export default ChangePassword;