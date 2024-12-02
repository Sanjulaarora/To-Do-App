'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { redirect, useParams } from 'next/navigation';

export default function EditTask(){
  const { id } = useParams();
  const { data: tasks } = useAxiosFetch('https://backend-to-do-app-j0km.onrender.com/get-tasks');

  const [editTask, setEditTask] = useState({
    title: "",
    priority: "",
    status: "",
    startDate: "",
    endDate: ""
  });

  const editTaskData = (e) => {
    const { name, value } = e.target;
    setEditTask(() => {
      return {
        ...editTask,
        [name]: value,
      }
    });
  };

  const handleEdit = async(id) => {
    const { title, priority, status, startDate, endDate } = editTask;

    const res = await fetch(`https://backend-to-do-app-j0km.onrender.com/edit-task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title, priority, status, startDate, endDate
      })
    });

    const data = await res.json();
    console.log(data);
    if(res.status === 422 || !data) {
      alert('Something went wrong !');
    } else {
      alert('Task is edited successfully !');
      setEditTask({...editTask, title:"", priority:"", status:"", startDate:"", endDate: ""});
      redirect('/tasklist');
    }
  }

  const handleDelete = async(id) =>{
    if (window.confirm("Are You sure you want to delete the task ?")){
      const res = await fetch(`https://backend-to-do-app-j0km.onrender.com/deletetask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const deletedTask = await res.json();
      if(res.status === 422 || !deletedTask) {
        alert('Something went wrong !');
      } else {
        alert('Task is deleted successfully !');
        redirect('/tasklist');
      }
    }
  }

  const task = tasks.find((task) => task._id === id);

  useEffect(() => {
    if (task) {
      setEditTask({
        title: task.title,
        priority: task.priority,
        status: task.status,
        startDate: task.startDate,
        endDate: task.endDate
      });
    }
  }, [id, tasks]);

  return (
    <div>
      <h1 className='text-center font-bold text-lg md:text-2xl'>Edit Task</h1>
      <div className='flex justify-center'>
        <form className='flex flex-col mt-10 space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-sm md:text-base'>Title</label>
            <input 
              className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2'
              type='text' 
              placeholder='Enter Title'
              value={editTask.title}
              onChange={editTaskData}
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
                value={editTask.priority}
                onChange={editTaskData}
                name='priority' 
                id='priority'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='status' className='text-sm md:text-base'>Status</label>
              <select 
               className='border-slate-500 border-solid border-[1px] rounded-lg text-sm md:text-base p-1 md:p-2' 
               value={editTask.status}
               onChange={editTaskData}
               name='status' 
               id='status'
               >
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
                value={editTask.startDate}
                onChange={editTaskData}
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
                value={editTask.endDate}
                onChange={editTaskData}
                name='endDate' 
                id='endDate'
              />
            </div>
          </div>
          <div>
            <button className='w-20 md:w-28 bg-purple-900 text-white rounded-lg text-sm md:text-base p-1 md:p-2 hover:scale-110' onClick={() => handleEdit(task._id)}>Update</button>
            <button className='w-20 md:w-28 bg-purple-900 text-white rounded-lg ml-1 md:ml-2 text-sm md:text-base p-1 md:p-2 hover:scale-110' onClick={() => handleDelete(task._id)}>🗑️</button>
            <Link href={'/tasklist'}>
              <button className='w-20 md:w-28 border-black border-solid border-[1px] ml-1 md:ml-2 text-sm md:text-base p-1 md:p-2 rounded-lg hover:scale-110'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


