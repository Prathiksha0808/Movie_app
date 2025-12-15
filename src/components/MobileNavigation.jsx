import React from 'react';
import { mobileNavigation } from '../constant/navigation';
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
    
  return (
    <section className='lg:hidden p-2 fixed bottom-0 w-full h-14 bg-black z-40 bg-opacity-70 backdrop-blur-2xl'>
        <div className='flex justify-between items-center text-neutral-400'>
            {mobileNavigation.map((nav,index)=>{
                const Icon=nav.icon;
                return(
                    <NavLink key={nav.label} to={nav.href}
                    className={({ isActive }) => `px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"    }`}>
                        <Icon size={26}/>
                        <p className='text-sm'>{nav.label}</p>
                    </NavLink>
                )})
            }
        </div>
    </section>
  )
}

export default MobileNavigation
