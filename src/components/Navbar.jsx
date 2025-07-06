import React from 'react'

function Navbar() {
  return (
    <div className='bg-slate-800 '>
      <div className='py-2 mx-auto px-15 text-white flex items-center justify-between '>
        <div className='text-2xl font-bold '>
            <span className='text-green-400'>&lt;</span>
            <span>Site</span>
            <span className='text-green-400'>Lockr/&gt;</span>
        </div>
      <div className='cursor-pointer text-xl hover:font-bold'>
        <ul>
            <li>Home</li>
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Navbar
