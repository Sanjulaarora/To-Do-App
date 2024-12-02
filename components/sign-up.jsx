'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function SignUp () {
  const [signUpData, setSignUpData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    passwordAgain: ""
  });

  const addSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpData(() => {
      return {
        ...signUpData,
        [name]: value
      }
    })
  };

  const signUpUser = async(e) => {
    e.preventDefault();
    const {name, number, email, password, passwordAgain} = signUpData;

    const res = await fetch("https://backend-to-do-app-j0km.onrender.com/post-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, number, email, password, passwordAgain
      })
    });

    const data = await res.json();
    console.log(data);
    if(res.status === 422 || !data) {
      alert("Something went Wrong!");
    } else {
      alert("SignUp Successfull!");
      setSignUpData({...signUpData, name:"", number:"", email:"", password:"", passwordAgain: ""});
      redirect("/");
    }
    
  }

  return (
    <section className="flex flex-col justify-center items-center px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
      <h1 className="font-extrabold text-lg md:text-2xl text-purple-900 text-center">Welcome to To-Do App</h1>
      <div className="h-[450px] md:h-[490px] w-[490px] p-2 mt-10 border-[1px] border-solid border-gray-500 rounded-lg">
        <form method="POST" className="flex flex-col justify-center p-2">
          <h1 className="text-lg md:text-2xl font-bold">Sign-Up</h1>
          <div className="flex flex-col p-2">
            <label className="font-semibold text-sm md:text-base" htmlFor="name">Your Name</label>
            <input 
              className="rounded-lg p-1 text-sm md:text-base text-black border-gray-500 border-solid border-[1px]" 
              type="text" 
              placeholder="Enter Your Name"
              value={signUpData.name}
              onChange={addSignUpData}
              name="name" 
              id="name"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold text-sm md:text-base" htmlFor="number">Phone Number</label>
            <input 
              className="rounded-lg p-1 text-sm md:text-base text-black border-gray-500 border-solid border-[1px]" 
              type="number" 
              placeholder="Enter Phone Number"
              value={signUpData.number}
              onChange={addSignUpData}
              name="number" 
              id="number"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold text-sm md:text-base" htmlFor="email">Email</label>
            <input 
              className="rounded-lg p-1 text-sm md:text-base text-black border-gray-500 border-solid border-[1px]" 
              type="text" 
              placeholder="Enter Email"
              value={signUpData.email}
              onChange={addSignUpData}
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
              value={signUpData.password}
              onChange={addSignUpData}
              name="password" 
              id="password"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold text-sm md:text-base" htmlFor="passwordAgain">Password Again</label>
            <input 
              className="rounded-lg p-1 text-sm md:text-base text-black border-gray-500 border-solid border-[1px]" 
              type="password" 
              placeholder="Enter Password Again"
              value={signUpData.passwordAgain}
              onChange={addSignUpData}
              name="passwordAgain" 
              id="passwordAgain"
            />
          </div>
          <button className="w-20 h-8 bg-purple-900 text-white rounded-lg font-semibold text-sm md:text-base mx-auto" onClick={signUpUser}>Sign-Up</button>
          <div className="flex mx-auto">
            <p className="mt-2 font-semibold text-sm md:text-base">Already Have Account ?</p>
            <Link href={"/"} className="text-purple-900 m-2 font-semibold text-sm md:text-base">Sign-In</Link>
          </div>
        </form>
      </div>
    </section>
  )
}