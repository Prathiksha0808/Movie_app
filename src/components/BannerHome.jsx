import React, { use, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerHome = () => {
    const bannerdata = useSelector((state) => state.movieData.bannerData)
    const imageURL = useSelector((state) => state.movieData.imageURL)

    console.log(bannerdata);

    const[curimage,setCurimge]=useState(0);

    const handlenext=()=>{
        if(curimage<bannerdata.length-1){
            setCurimge(prev=>prev+1);
        }
    }
    const handleprev=()=>{
        if(curimage>0){
            setCurimge(prev=>prev-1);
        }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
                    if(curimage<bannerdata.length-1){
                        handlenext();
                    }else{
                        setCurimge(0);
                    }
        },5000);

        return()=>clearInterval(interval);
    },[bannerdata,imageURL]);

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full [max-h-95vh]'>
                {bannerdata.map((data, index) => {
                    return (
                        <div className='min-w-full  h-screen lg:h-[90vh]  overflow-hidden relative group transition-all' style={{transform:`translateX(-${curimage*100}%)`}} key={data.id}>
                            <img src={imageURL + data.backdrop_path} className='h-full w-full object-cover bg-gradient-to-t from-neutral-900'></img>
                            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                                <button className='bg-white p-1 rounded-full text-xl text-black z-10' onClick={handleprev}><FaAngleLeft/></button>
                                <button className='bg-white p-1 rounded-full text-xl text-black z-10' onClick={handlenext}><FaAngleRight/></button>
                            </div>
                            <div className='absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                            <div className='absolute bottom-20 left-10 text-white'>
                            </div>
                            <div className="container mx-7">
                                <div className='absolute bottom-0 max-w-md px-3'>
                                    <h2 className='font-bold text-2xl text-white drop-shadow-2xl'> {data?.title || data?.name}   </h2>
                                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                    <div className='flex items-center gap-4'>
                                        <p>Rating:{Number(data.vote_average).toFixed(1)}+</p><span>|</span>
                                        <p>View:{Number(data.popularity).toFixed(1)}</p>
                                    </div>
                                    <button className='bg-white px-4 py-2 text-black mt-4 font-bold rounded hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all  hover:scale-105'>
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )

                })
                }
            </div>
        </section>
    )
}

export default BannerHome
