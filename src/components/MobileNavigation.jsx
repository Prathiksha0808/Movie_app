import React from 'react';
import { mobileNavigation } from '../constant/navigation';
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
    
  return (
    <section className='lg:hidden fixed bottom-0 w-full h-14 bg-neutral-800 bg-opacity-90'>
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
