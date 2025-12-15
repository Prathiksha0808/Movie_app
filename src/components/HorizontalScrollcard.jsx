import React from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef } from 'react'

const HorizontalScrollcard = ({data = [], heading,trending}) => {
const container=useRef();
const handlenext=()=>{
    container.current.scrollLeft+=300;
}

const handleprev=()=>{
    container.current.scrollLeft-=300;
}

    return (
        
            <div className='container mx-auto px-3 my-10'>
                <h2 className='text-xl lg:text-2xl font-bold mb-3'>{heading}</h2>
                <div className=' relative '>
                <div ref={container} className='grid grid-flow-col auto-cols-[230px] gap-10 overflow-x-hidden overflow-x-scroll scroll-smooth transition-all scrolbar-none'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id+"heading"+index} data={data} index={index + 1} trending={trending} />
                            )
            
                    }
               ) }
               </div>

               <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
                    <button onClick={handleprev} className='bg-white p-1 text-black rounded-full  -ml-1 z-10'><FaAngleLeft/></button>
                    <button  onClick={handlenext} className='bg-white p-1 text-black rounded-full  -mr-1 z-10'><FaAngleRight/></button>
                </div>
                </div>
            </div>
        
    )
}

export default HorizontalScrollcard
