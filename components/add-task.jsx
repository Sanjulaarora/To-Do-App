'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { redirect } from 'next/navigation';

export default function AddTask() {
  const { data: tasks } = useAxiosFetch('https://backend-todoapp-a1aa.onrender.com/get-tasks');

  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    status: "pending",
    startDate: "",
    endDate: ""
  });

  const addTaskData = (e) => {
    const { name, value } = e.target;
    setTaskData(() => {
      return {
        ...taskData,
        [name]: value
      }
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = tasks.length ? tasks[tasks.length -1].id + 1 : 1;
    const {title, priority, status, startDate, endDate} = taskData;

    const res = await fetch("https://backend-todoapp-a1aa.onrender.com/post-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id, title, priority, status, startDate, endDate
      })
    });

    const data = await res.json();
    console.log(data);
    if(res.status === 422 || !data) {
      alert("Something went Wrong!");
    } else {
      alert("Task Added Successfully!");
      setTaskData({...taskData, title:"", priority:"", status:"pending", startDate:"", endDate: ""});
      redirect('/tasklist');
    }
  };

  return (
    <div>
      <h1 className='text-center font-bold text-lg md:text-2xl'>Add New Task</h1>
      <div className='flex justify-center'>
        <form className='flex flex-col mt-10 space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-sm md:text-base'>Title</label>
            <input 
              className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2'
              type='text' 
              placeholder='Enter Title'
              value={taskData.title}
              onChange={addTaskData}
              name='title' 
              id='title'
            />
          </div>
          <div className='flex space-x-2'>
            <div className='flex flex-col'>
              <label htmlFor='priority' className='text-sm md:text-base'>Priority</label>
              <input 
                className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2'
                type='number' 
                placeholder='Priority'
                value={taskData.priority}
                onChange={addTaskData}
                name='priority' 
                id='priority'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='status' className='text-sm md:text-base'>Status</label>
              <select 
                className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2' 
                placeholder='Select Status'
                value={taskData.status}
                onChange={addTaskData}
                name='status' 
                id='status'
              >
                {/* <option value=''>Select Status</option> */}
                <option value='pending'>Pending</option>
                <option value='finished'>Finished</option>
              </select>
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col'>
              <label htmlFor='startDate' className='text-sm md:text-base'>Start Date</label>
              <input 
                className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2'
                type='date' 
                placeholder='startDate'
                value={taskData.startDate}
                onChange={addTaskData}
                name='startDate' 
                id='startDate'
              />
            </div>
            <div className='flex flex-col ml-16'>
              <label htmlFor='endDate' className='text-sm md:text-base'>End Date</label>
              <input 
                className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2'
                type='date' 
                placeholder='endDate'
                value={taskData.endDate}
                onChange={addTaskData}
                name='endDate' 
                id='endDate'
              />
            </div>
          </div>
          <div>
            <button className='w-20 md:w-28 bg-purple-900 text-white rounded-lg text-sm md:text-base p-1 md:p-2 hover:scale-110' onClick={handleSubmit}>Add Task</button>
            <Link href={'/tasklist'}>
              <button className='w-20 md:w-28 border-black border-solid border-[1px] ml-2 text-sm md:text-base p-1 md:p-2 rounded-lg hover:scale-110'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

