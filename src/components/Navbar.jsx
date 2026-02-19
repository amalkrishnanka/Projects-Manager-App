import React from 'react'
import { Menu, Bell, BellDot, CircleUser, Search } from "lucide-react";

const Navbar = () => {
  const username = "Amal Krishnan";
  const role = "Administrator";
  return (
    <nav className='w-full p-4 sm:px-6 bg-zinc-900 h-fit rounded-lg flex justify-between items-center'>
      <span className='flex text-white gap-3 items-center w-full relative'>
        <Menu className='sm:hidden w-6 h-6' />
        <Search className='w-5 h-5 hidden sm:block absolute left-3 text-zinc-400 pointer-events-none' />
        <input type="text" placeholder='Search projects, tasks or team members...' className='hidden sm:block border border-zinc-800 p-3 pl-10 text-sm text-zinc-400 w-full max-w-xl rounded-lg focus:outline-none' />
      </span>
      <div className='h-full text-white flex justify-end items-center gap-4'>
        <Bell className='w-6 h-6' />
        <div className='flex gap-2 items-center'>
          <div className='w-9 h-9 aspect-square rounded-full bg-gray-600 flex justify-center items-center text-sm'>{username.split(" ").map(word => word[0]).join("").toUpperCase()}</div>
          <span className='flex flex-col'>
            <p className='text-sm font-medium whitespace-nowrap'>{username}</p>
            <p className='text-xs text-zinc-500 -mt-0.5'>{role}</p>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
