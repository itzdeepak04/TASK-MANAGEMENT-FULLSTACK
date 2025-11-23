import React, { useEffect, useState } from 'react'

function Content({update,setStore,setEdit}) {
  const [val,setVal]=useState([]);
  const {token}=JSON.parse(localStorage.getItem('token')) || '';
  const [info,setInfo]=useState('');
  const [log,setLog]=useState(false);
  async function fetchData()
  {
    let response=await fetch('https://task-management-backend-54g1.onrender.com/api/task',{method:'GET',credentials:'include',headers:{'Content-type':'application/json','authorization':`Bearer ${token}`}});
    const {status,message,data}=await response.json();
    if(data)
      {
        setVal(data);
      }
      if(!status)
        {
          setInfo(message);
        }
  }
  useEffect(()=>{
    fetchData();
  },[update])

  async function deleteData(_id) {
    let response=await fetch(`https://task-management-backend-54g1.onrender.com/api/task/delete/${_id}`,{method:'DELETE',credentials:'include',headers:{'Content-type':'application/json'}});
    let {status,message}=await response.json();
    if(status)
    {
      fetchData();
    }
  }
  async function completeData(_id)
  {
    let response=await fetch(`https://task-management-backend-54g1.onrender.com/api/task/complete/${_id}`,{method:'PATCH',credentials:'include',headers:{'Content-type':'application/json'}});
    let {status,message}=await response.json();
    if(status)
    {
      fetchData();
    }
  }
  async function editData(_id)
  {
    let response=await fetch(`https://task-management-backend-54g1.onrender.com/api/task/edit/${_id}`,{method:'GET',credentials:'include',headers:{'Content-type':'application/json'}});
    let {status,message,data}=await response.json();
    if(status)
    {
      fetchData();
      if(data)
      {
        setStore(data);
        setEdit(true);
      }
    }

  }
   async function sortByDate()
  {
    let response=await fetch('https://task-management-backend-54g1.onrender.com/api/task/sortByDate',{method:'GET',credentials:'include',headers:{'Content-type':'application/json','authorization':`Bearer ${token}`}});
    const {status,message,data}=await response.json();
    if(status)
    {
      if(data)
      {
        setVal(data);
      }
    }
  }

     async function sortByPriority()
  {
    let response=await fetch('https://task-management-backend-54g1.onrender.com/api/task/sortByPriority',{method:'GET',credentials:'include',headers:{'Content-type':'application/json','authorization':`Bearer ${token}`}});
    const {status,message,data}=await response.json();
    if(status)
    {
      if(data)
      {
        setVal(data);
      }
    }
  }
    function sortData(e)
  {
    if(e.target.value=='sortedDate')
    {
      sortByDate();
    }
    else if(e.target.value=='sortedPriority')
    {
      sortByPriority();
    }

  }
  return (
    <div onChange={sortData} className='position-relative'>
    <select className='form-select w-25 postion-absolute end-0 top-0'>
            <option value="">Sort by</option>
          <option value='sortedDate'>Sort by due date</option>
          <option value="sortedPriority">Sort by Priority</option>
        </select>
    <h1 style={{color:'red',textAlign:'center'}}>{info}</h1>
        {
          val?.map((ele) => (
        <div key={ele._id} className='card mb-2'>
        <div className='card-body d-flex justify-content-between'>
          <div>
            <h6>{ele.complete ? <s>{ele.title}</s> : ele.title}</h6>
            <div>
              <div>{ele.category} • {ele.priority}</div>
              <div>• Due: {ele.date}</div>
            </div>
          </div>
          <div className='crudDiv'>
            <button className='btn btn-sm btn-outline-secondary me-2' onClick={()=>completeData(ele._id)}>{ele.complete ? 'Incomplete': 'Complete'}</button>
            <button className='btn btn-sm btn-secondary me-2' disabled={ele.complete} style={{cursor:ele.complete ? 'no-drop' : 'pointer'}} onClick={()=>editData(ele._id)}>Edit</button>
            <button className='btn btn-sm btn-danger' disabled={ele.complete} style={{cursor:ele.complete ? 'no-drop' : 'pointer'}} onClick={()=>deleteData(ele._id)}>Delete</button>
          </div>
        </div>
    </div>
      ))
    }
    </div>
  )
}

export default Content;