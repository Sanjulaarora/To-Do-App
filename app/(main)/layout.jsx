'use client';

import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const MainLayout = ({children}) => {
  const userSignOut = async() => {
    try{
      const res = await fetch("https://backend-todoapp-a1aa.onrender.com/sign-out", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });  
      
      const data = await res.json();
      console.log(data);

      if(res.status !== 201) {
        console.log("error");
        alert("Something went Wrong!");
      } else {
        console.log("data valid");
        alert("Your are Logged Out 🔐");
        redirect("/");
      }
    } catch(error) {
      console.log("Error occured:", error);
    }
  };


  return (
    <div>
      <nav className='flex justify-around mt-14'>
        <div>
          <Link href={'/dashboard'}>
            <button className='font-extrabold text-sm md:text-base p-1 md:p-2 hover:underline'>Dashboard</button>
          </Link>
          <Link href={'/tasklist'} className='ml-2'>
            <button className='font-extrabold text-sm md:text-base p-1 md:p-2 hover:underline'>Tasklist</button>
          </Link>
        </div>
        <button className='w-20 md:w-28 bg-purple-900 text-white text-sm md:text-base rounded-lg p-1 md:p-2 hover:scale-110' onClick={userSignOut}>Sign-Out</button>
      </nav>
      <div className='mt-20'>{children}</div>
    </div>
  )
}

export default MainLayout;