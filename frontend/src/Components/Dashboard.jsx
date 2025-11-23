import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useEffect } from 'react';
import { useState } from 'react';
import Content from './Content';
function Dashboard({ storeToken,setStoreToken }) {
  const [store,setStore]=useState({title:'',description:'',category:'',priority:'',date:'',complete:false});
  const {token}=JSON.parse(localStorage.getItem('token')) || '';
  const [update,setUpdate]=useState(false);
  const [edit,setEdit]=useState(false);
  const navigate=useNavigate();
  function storeData(e)
  {
    let name=e.target.name;
    let value=e.target.value;
    setStore({...store,[name]:value});
  }

  async function submitData()
  {
    if(!store.title || !store.description || !store.category || !store.priority || !store.date)
    {
      return alert('All details are mandatory')
    }
   if(!edit)
   {
     let response=await fetch('https://task-management-backend-54g1.onrender.com/api/task/',{method:'POST',credentials:'include',headers:{'Content-type':'application/json','authorization':`Bearer ${token}`},body:JSON.stringify(store)});
    const {status,message}=await response.json();
    setStore({title:'',description:'',category:'',priority:'',date:'',complete:false});
    if(status)
    {
      setUpdate(prev=>!prev);
    }
    if(!status)
    {
      if (message === "Session time has passed login again") {
    localStorage.removeItem("token");
    setStoreToken(null);
    alert("Session time has passed. Please login again.");
    navigate('/login');
    }

    }
   }
   else
   {
    let response=await fetch(`https://task-management-backend-54g1.onrender.com/api/task/update/${store._id}`,{method:'PUT',credentials:'include',headers:{'Content-type':'application/json','authorization':`Bearer ${token}`},body:JSON.stringify(store)});
    const {status,message}=await response.json();
    if(status)
    {
      setStore({title:'',description:'',category:'',priority:'',date:''});
      setEdit(false);
      setUpdate(prev=>!prev);
    }
   }
  }
  return (
    <>
    <div className='dashboard'>
      <div className='d-flex justify-content-between mb-3'>
        <h4>Welcome {storeToken ? storeToken?.name?.split(' ')[0] : 'User'},</h4>
        <div>
        </div>
      </div>
      <div className='card col-12 m-auto'>
        <div className='card-body'>
          <h5>Create Task</h5>
          <input name='title' value={store.title} onChange={storeData} type="text" className='form-control mb-3' placeholder='Title' />
          <textarea name='description' value={store.description} onChange={storeData} className='form-control mb-3' placeholder='Description'></textarea>
          <div className=' dropDown d-flex gap-5 mb-3'>
            <select name="category" value={store.category} onChange={storeData}  className='form-select'>
            <option value="">Select category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="others">Others</option>
            </select>

            <select name="priority" value={store.priority} onChange={storeData} className='form-select'>
            <option value="">Select Priority</option>
            <option value="hard">Hard</option>
            <option value="medium">Medium</option>
            <option value="easy">Easy</option>
            </select>

            <input name='date' value={store.date} onChange={storeData} type="date" className='form-control' placeholder='Select Due Date'/>
          </div>
          <button onClick={submitData} className='btn btn-success'>{edit ? 'Update Task' : 'Add task'}</button>
        </div>
      </div>
      <hr />
      {storeToken && <Content update={update} setStore={setStore} setEdit={setEdit}/>}
    </div>
    {!storeToken ?

        <div className='parentDiv'>
          <div className='childDiv p-3'>
            <h1 className='text-center'>To know more about us</h1>
            <div className='log'><NavLink className='btn btn-primary' to={'/login'}>Login</NavLink>  <NavLink className='btn btn-warning' to={'/signup'}>Signup</NavLink></div>
          </div>
        </div>
        :
        ''}
    </>
  )
}

export default Dashboard;