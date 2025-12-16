import React from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef } from 'react'

const HorizontalScrollcard = ({ data = [], heading, trending, media_type }) => {
    const container = useRef();
    const handlenext = () => {
        container.current.scrollLeft += 300;
    }

    const handleprev = () => {
        container.current.scrollLeft -= 300;
    }

    return (

        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>
            <div className=' relative '>
                <div ref={container} className='grid grid-flow-col auto-cols-[230px] gap-10 overflow-x-hidden overflow-x-scroll scroll-smooth transition-all scrolbar-none'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type} />
                            )

                        }
                        )}
                </div>

                <div className="absolute inset-0 hidden lg:flex justify-between items-center px-2 z-30 pointer-events-none">
                    <button
                        onClick={handleprev}
                        className="bg-white p-1 text-black rounded-full z-40 pointer-events-auto"
                    >
                        <FaAngleLeft />
                    </button>

                    <button
                        onClick={handlenext}
                        className="bg-white p-1 text-black rounded-full z-40 pointer-events-auto"
                    >
                        <FaAngleRight />
                    </button>

                </div>
            </div>
        </div>

    )
}

export default HorizontalScrollcard
