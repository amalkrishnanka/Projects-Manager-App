import React from 'react'
import { Menu, Bell, BellDot, CircleUser } from "lucide-react";

const Navbar = () => {
  const username = "amalkrishnan";
  const job = "Lead Developer";
  return (
    <nav className='w-full p-4 sm:px-6 bg-zinc-900 h-fit rounded-lg flex justify-between items-center'>
      <span className='flex text-white gap-1'>
        <Menu className='sm:hidden w-6 h-6' />
        <h2 className='hidden sm:block text-white text-md font-medium'>Dashboard</h2>
      </span>
      <div className='h-full text-white flex justify-between items-center gap-4'>
        <Bell className='w-5 h-5' />
        <span className='flex gap-1'>
          <CircleUser className='w-5 h-5' />
          <p className='text-sm'>{username}</p>
        </span>
      </div>
    </nav>
  )
}

export default Navbar
