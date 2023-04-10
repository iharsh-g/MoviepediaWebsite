import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full flex flex-row gap-5 items-center justify-between text-2xl pr-5 bg-black p-5'>
        <div>
          <NavLink to={"/"}>
            <p className='text-[#f00] text-2xl md:text-5xl font-bold heading ml-5'>Moviepedia</p>
          </NavLink>
        </div>
        {/* <input type='search' placeholder='Search Movies...' className='w-full p-3 rounded-full bg-white bg-opacity-95
         pl-5 pr-5 border-2 border-transparent hover:border-[#f00] outline-[#f00]'/> */}
        
        <div>
          <NavLink to={"/search"}>
            <p className='text-white font-medium'>Search</p>
          </NavLink>
        </div>
    </div>
  )
}

export default Navbar