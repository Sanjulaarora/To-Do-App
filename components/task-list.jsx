'use client'

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import useAxiosFetch from '@/hooks/useAxiosFetch';

export default function TaskList() {
  const { data: tasks, isLoading, fetchError } = useAxiosFetch('https://backend-todoapp-a1aa.onrender.com/get-tasks');

  // State for filters
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Filter tasks based on selected filters
  const filteredTasks = tasks?.filter((task) => {
    const priorityMatch = selectedPriority ? task.priority.toString() === selectedPriority : true;
    const statusMatch = selectedStatus ? task.status === selectedStatus : true;
    return priorityMatch && statusMatch;
  });

  return (
    <div>
      <h1 className='font-bold text-lg md:text-2xl text-center'>Tasklist</h1>
      <nav className='flex justify-evenly mt-8'>
        <div>
          <Link href={'/tasklist/addtask'}>
            <button className='w-20 md:w-28 text-[12px] md:text-base border-[1px] border-solid border-purple-900 text-purple-900 rounded-sm p-1 md:p-2 hover:scale-110'>+ Add Task</button>
          </Link>
        </div>
        <div className='flex'>
          <div className='ml-2'>
            <select 
              className='text-[12px] md:text-base border-solid border-gray-300 border-[1px] rounded-xl p-1 md:p-2' 
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value=''>Priority</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className='ml-2'>
            <select 
             className='text-[12px] md:text-base border-solid border-gray-300 border-[1px] rounded-xl p-1 md:p-2'
             value={selectedStatus}
             onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value=''>Status</option>
              <option value='pending'>Pending</option>
              <option value='finished'>Finished</option>
            </select>
          </div>
        </div>
      </nav>
      <div>
       <div>
        <ul className='flex justify-center mt-10'>
          <li className='w-10 md:w-20 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Task Id</li>
          <li className='w-36 md:w-52 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Title</li>
          <li className='w-10 md:w-20 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Priority</li>
          <li className='w-28 md:w-24 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Status</li>
          <li className='w-32 md:w-40 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Start Time</li>
          <li className='w-32 md:w-40 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>End time</li>
          <li className='w-24 md:w-32 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Total Time to finish (hrs)</li>
          <li className='w-8 md:w-14 bg-gray-500 text-[8px] md:text-base text-white text-center border-y-0 border-solid border-gray-300 border-[1px] p-1 md:p-2'>Edit</li>
        </ul>
        <Suspense fallback={<div>Loading Tasks...</div>}>
          {isLoading && <p className="text-center font-bold text-sm md:text-base mt-8">Loading tasks...</p>}
          { !isLoading && fetchError && <p className="text-center font-bold text-sm md:text-base">{fetchError}</p>}
          { !isLoading && !fetchError && (filteredTasks.length?
           <>
              { filteredTasks.map((task) => (
                <ul className='flex justify-center' key={task._id}>
                  <li className='w-10 md:w-20 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>{task.id}</li>
                  <li className='w-36 md:w-52 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>{task.title}</li>
                  <li className='w-10 md:w-20 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>{task.priority}</li>
                  <li className='w-28 md:w-24 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>{task.status}</li>
                  <li className='w-32 md:w-40 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>{task.startDate}</li>
                  <li className='w-32 md:w-40 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>{task.endDate}</li>
                  <li className='w-24 md:w-32 text-black text-[8px] md:text-base text-center border-solid border-slate-500 border-[1px] p-1 md:p-2'>
                  {(task.endDate && task.startDate) ? 
                    ((new Date(task.endDate) - new Date(task.startDate)) / (1000 * 60 * 60)).toFixed(0) 
                    : 'Invalid Date'}
                  </li>
                  <Link href={`/tasklist/edittask/${task._id}`}>
                    <li className='w-8 md:w-14 text-center text-[8px] md:text-base border-solid border-slate-500 border-[1px] p-2 hover:underline text-slate-600'>Edit</li>
                  </Link>
                </ul>))
              }
           </> : 
           <>
              <p className='text-center text-slate-600 font-bold text-[8px] md:text-base mt-8'>No tasks are present.</p>
              <p className='text-center text-slate-600 font-bold text-[8px] md:text-base mt-2'>Add your task (Or maybe add task with desired status or priority).</p>
              <p className='text-center text-slate-600 font-bold text-[8px] md:text-base mt-2'>Have a Good Day!!.</p>
           </>
          )}
        </Suspense>
       </div>
      </div>
    </div>
  )
}

