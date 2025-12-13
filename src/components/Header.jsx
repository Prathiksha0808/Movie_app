import React from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate,Link } from 'react-router-dom'
import user from '../assets/user.png'
import { IoIosSearch} from "react-icons/io";
import { useState } from 'react';
import { navigation } from '../constant/navigation';


  
const Header = () => {
  const [searchinput, setSearchinput] = useState("");
  const navigate=useNavigate();
  
const handleSearch = (e) => {
  e.preventDefault()
  if (!searchinput.trim()) return

  navigate(`/search?q=${searchinput}`)
}
    
  return (
    <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75'>
      <div className='container m-auto px-2 flex items-center h-full'>
        <Link to="/">
          <img src={logo} alt="Logo" width={120} />
        </Link>

        <nav className='hidden lg:flex item-center gap-5 ml-5 '>
          {
            navigation.map((nav, index) => {
              return (
                <div>
                  <NavLink key={nav.label} to={nav.href} 
                  className={({ isActive }) => `px-3 hover:text-neutral-100 ${isActive && "text-neutral-100"}`} >{nav.label}</NavLink>
                </div>
              )
            })

          }
        </nav>
       
        <div className='ml-auto flex items-center gap-4'>
           <div>
          <form  onSubmit={handleSearch} className='flex items-center '>
            <input type="text" placeholder='Search here....' className='bg-transparent px-4 py-4 outline-none hidden lg:block'
            onChange={(e)=>setSearchinput(e.target.value)}
            value={searchinput} />
            <button className='text-2xl text-white'> <IoIosSearch />  </button>
          </form>

        </div>
          
          <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50'>
            <img src={user} width="w-full h-full rounded" alt="profile" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
