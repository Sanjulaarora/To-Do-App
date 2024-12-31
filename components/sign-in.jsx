'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function SignIn (){
    const [signInData, setSignInData] = useState({
        email:"",
        password:""
      });
    
      const addSignInData = (e) => {
        const {name, value} = e.target;
        setSignInData(() => {
          return {
            ...signInData,
            [name]:value
          }
        })
      }
      
      const signInUser = async(e) => {
        e.preventDefault();
        const { email, password } = signInData;
    
        const res = await fetch("https://backend-to-do-app-j0km.onrender.com/sign-in", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email, password
          })
        });
    
        const data = await res.json();
        console.log(data);
        if(res.status === 400 || !data) {
          alert("Something went Wrong!");
        } else {
          alert("You are Logged In 🔓!");
          setSignInData({...signInData, email:"", password:""});
          redirect("/dashboard");
        }
      }
    
      return (
        <section className="flex flex-col justify-center items-center px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
          <h1 className="font-extrabold text-lg md:text-2xl text-purple-900 text-center">Welcome to To-Do App</h1>
          <div className="h-80 w-80 p-2 mt-10 border-[1px] border-solid border-gray-500 rounded-lg">
            <form method="POST" className="flex flex-col justify-center space-y-2 p-2">
              <h1 className="text-lg md:text-2xl font-bold">Sign-In</h1>
              <div className="flex flex-col p-2">
                <label className="font-semibold text-sm md:text-base" htmlFor="email">Email</label>
                <input 
                  className="rounded-lg p-1 text-sm md:text-base text-black border-gray-500 border-solid border-[1px]" 
                  type="text" 
                  placeholder="Enter Email"
                  value={signInData.email}
                  onChange={addSignInData}
                  name="email" 
                  id="email"
                />
              </div>
              <div className="flex flex-col p-2">
                <label className="font-semibold text-sm md:text-base" htmlFor="password">Password</label>
                <input 
                  className="rounded-lg p-1 text-sm md:text-base text-black border-gray-500 border-solid border-[1px]" 
                  type="password" 
                  placeholder="At least 6 character"
                  value={signInData.password}
                  onChange={addSignInData} 
                  name="password" 
                  id="password"
                />
              </div>
              <button 
                className="w-16 md:w-20 h-8 text-sm md:text-base bg-purple-900 text-white rounded-lg font-semibold mx-auto"
                onClick={signInUser}
                disabled={!signInData.email || !signInData.password}
              >
                Sign-In
              </button>
              <div className="flex mx-auto">
                <p className="mt-2 font-semibold text-sm md:text-base">Do Not Have an Account ?</p>
                <Link href={"/signup"} className="text-purple-900 m-2 font-semibold text-sm md:text-base">Sign-Up</Link>
              </div>
            </form>
          </div>
        </section>
    )  
}
    