import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFetchDetail from '../hooks/useFetchDetail'
import moment from 'moment'
import Divider from '../components/Divider'
import useFetch from '../hooks/useFetch'
import HorizontalScrollcard from '../components/HorizontalScrollcard'
import Videoplay from '../components/Videoplay'



const DetailsPage = () => {
  const params = useParams()
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommedData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)

  const[playvideo,setplayvideo]=useState(false)
  const[playvideoid,setplayvideoid]=useState("")

  const imageURL = useSelector((state) => state.movieData.imageURL)
  const duration = data?.runtime ? (data.runtime / 60).toFixed(1).split(".") : null;
  const director = castData?.crew?.find((person) => person.job === "Director");
  const writer = castData?.crew?.find((person) => person.job === "Writer");

  const handlePlayvideo = () => {
  setplayvideoid(data?.id);
  setplayvideo(true);
};



  return (
    <div>
      <div className='w-full h-[450px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img src={imageURL + data?.backdrop_path}
            className='w-full object-cover h-full' />
        </div>
        <div className='absolute h-full w-full top-0 bg-gradient-to-t  from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>

        <div className='relative mx-auto lg:mx-0 lg:ml-6 lg:-mt-28 lg:ml-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='w-60 h-80 object-cover rounded'
          />
           <button onClick={handlePlayvideo}

          className='mt-3 w-full py-2 px-4 text-center bg-white text-black font-bold rounded text-lg hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all  hover:scale-105'>Play Now</button>
        </div>




        <div>
          <h2 className='font-bold text-2xl lg:text-4xl text-white'>{data?.title || data.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>
          <Divider />
          <div className="flex items-center  gap-3 text-neutral-300">

            {data?.vote_average && (
              <>
                <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>

              </>
            )}

            {data?.vote_count && (
              <>
                <span>|</span>
                <p>Views: {Number(data.vote_count)}</p>

              </>
            )}

            {duration && (
              <>
                <span>|</span>
                <p>Duration: {duration[0]}h {duration[1]}m</p>
              </>
            )}

          </div>
          {data?.overview && <Divider />}


          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>
            {data?.status && <Divider />}
            <div className='flex items-center gap-4 my-3 text-center'>
              {data?.status && <p>Status: {data.status}</p>}

              {data?.release_date && (
                <>
                  <span>|</span>
                  <p>
                    Release Date:{" "}
                    {moment(data.release_date).format("MMMM Do YYYY")}
                  </p>
                </>
              )}

              {Number(data?.revenue) > 0 && (
                <>
                  <span>|</span>
                  <p>Revenue: {Number(data.revenue).toLocaleString()}</p>
                </>
              )}

            </div>
            {director && <Divider />}
          </div>
          <div>
            {director && <p className='text-white'>Director:{director.name}</p>}
            {writer && <Divider />}
            {writer && <p className='text-white'>Writer:{writer.name}</p>}
          </div>
          <Divider />
          <h2 className='font-bold text-lg'>Cast:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {
              castData?.cast?.filter(el => el?.profile_path).map((starcast, index) => {
                return (
                  <div>
                    <div>
                      <img src={imageURL + starcast?.profile_path}
                        className='w-20 h-24 object-cover rounded-full' />
                    </div>
                    <p className='font-bold text-center text-sm'>{starcast?.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>

      <div>
        <HorizontalScrollcard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore} />
        <HorizontalScrollcard data={recommedData} heading={"Recommendation " + params?.explore} media_type={params?.explore} />
      </div>

{playvideo && (
  <Videoplay
  videoid={playvideoid}
  media_type={params?.explore}
  close={() => setplayvideo(false)}
/>

)}

    </div>
  )
}

export default DetailsPage
