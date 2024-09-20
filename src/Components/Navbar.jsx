import React from 'react'
import logo from '../assets/expenses.png'

const Navbar = () => {
  return (
    <div className='flex items-center gap-3 p-4 justify-center border-b-2 border-[#a93f48]'>
        <img src={logo} className='h-16'></img>
        <h1 className='font-bold text-[#a93f48] text-3xl mt-2'>Budget Ease</h1>
    </div>
  )
}

export default Navbar