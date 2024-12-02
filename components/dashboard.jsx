'use client';

import React from 'react'
import useAxiosFetch from '@/hooks/useAxiosFetch';

export default function Dashboard() {
  const { data: tasks, isLoading, fetchError } = useAxiosFetch('https://backend-to-do-app-j0km.onrender.com/get-tasks');
  const totalCount = tasks.length;
  const pendingCount = tasks.filter(task => task.status === 'pending').length;
  const completedCount = tasks.filter(task => task.status === 'finished').length;  

  const completedPercent = (completedCount/totalCount)*100;
  const pendingPercent = (pendingCount/totalCount)*100;
  

  return (
    <div className='flex flex-col justify-center items-center space-y-10'>
      <>
        { isLoading && <p className='text-center font-bold text-sm md:text-base'>Loading...</p> }
        { !isLoading && fetchError && <p className='text-center font-bold text-sm md:text-base'>{fetchError}</p> }
        { !isLoading && !fetchError && 
          <>
            <h1 className='font-bold text-lg md:text-2xl text-center'>Dashboard</h1>
            <div className='flex flex-col mt-9 space-y-5'>
              <h1 className='font-bold text-base md:text-xl'>Summary</h1>
              <div className='flex space-x-8'>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>{tasks.length}</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Total Tasks</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>{completedPercent.toFixed(2)}%</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Tasks Completed</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>{pendingPercent.toFixed(2)}%</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Tasks Pending</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>-</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Average Time per Completed Task</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-5'>
              <h1 className='font-bold text-base md:text-xl'>Pending Task Summary</h1>
              <div className='flex space-x-8'>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>{pendingCount}</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Pending Tasks</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>-</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Total time Lapsed</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-purple-900 font-bold text-lg md:text-2xl text-center'>24 hrs</span>
                  <span className='font-bold text-gray-500 text-sm md:text-base'>Total time to finish estimated based on endtime</span>
                </div>
              </div>
            </div> 
         </>   
        }
      </>    
    </div>
  )
}

