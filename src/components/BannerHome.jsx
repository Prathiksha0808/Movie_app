import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Videoplay from './Videoplay';


const BannerHome = () => {
    const bannerdata = useSelector((state) => state.movieData.bannerData)
    const imageURL = useSelector((state) => state.movieData.imageURL)
    const [playvideo, setPlayvideo] = useState(false);
    const [playvideoid, setPlayvideoid] = useState(null);
    const [mediaType, setMediaType] = useState("");


    console.log(bannerdata);

    const [curimage, setCurimge] = useState(0);

    const handlenext = () => {
        setCurimge(prev =>
            prev === bannerdata.length - 1 ? 0 : prev + 1
        );
    }

    const handleprev = () => {
        setCurimge(prev =>
            prev === 0 ? bannerdata.length - 1 : prev - 1
        );
    }


    useEffect(() => {
        const interval = setInterval(handlenext, 5000);
        return () => clearInterval(interval);
    }, [bannerdata.length]);

    const handlePlayVideo = (data) => {
        setPlayvideoid(data.id);
        setMediaType(data.media_type); // movie / tv
        setPlayvideo(true);
    };

    return (
        <section className='w-full h-full overflow-hidden'>
            <div className='flex min-h-full max-h-[95vh]  transition-transform duration-700' style={{ transform: `translateX(-${curimage * 100}%)` }}>
                {bannerdata.map((data, index) => {
                    return (
                        <div className='min-w-full  h-screen lg:h-[90vh]  overflow-hidden relative group transition-all' key={data.id}>
                            <img src={imageURL + data.backdrop_path} className='h-full w-full object-cover bg-gradient-to-t from-neutral-900'></img>
                            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                                <button className='bg-white p-1 rounded-full text-xl text-black z-10' onClick={handleprev}><FaAngleLeft /></button>
                                <button className='bg-white p-1 rounded-full text-xl text-black z-10' onClick={handlenext}><FaAngleRight /></button>
                            </div>
                            <div className='absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                            <div className='absolute bottom-20 left-10 text-white'>
                            </div>
                            <div className="container mx-7">
                                <div className="absolute bottom-0 max-w-md px-3 pb-24 md:pb-0">
                                    <h2 className='font-bold text-2xl text-white drop-shadow-2xl'> {data?.title || data?.name}   </h2>
                                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                    <div className='flex items-center gap-4'>
                                        <p>Rating:{Number(data.vote_average).toFixed(1)}+</p><span>|</span>
                                        <p>View:{Number(data.popularity).toFixed(1)}</p>
                                    </div>
                                    <button
                                        onClick={() => handlePlayVideo(data)}
                                        className='bg-white px-4 sm:px-4 sm:py-2 py-2 text-black mt-4 font-bold rounded hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'
                                    >
                                        Play Now
                                    </button>

                                </div>
                            </div>
                        </div>
                    )

                })
                }
            </div>
            {playvideo && (
                <Videoplay
                    videoid={playvideoid}
                    media_type={mediaType}
                    close={() => setPlayvideo(false)}
                />
            )}

        </section>
    )
}

export default BannerHome
