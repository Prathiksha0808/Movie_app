import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Card = ({ data, trending, index }) => {

  const imageURL = useSelector((state) => state.movieData.imageURL)

  return (
    <Link to={"/"+data.media_type+"/"+data.id} className='w-[250px] h-80 rounded overflow-hidden relative shrink-0 '>
      
      <img
        src={imageURL + data.backdrop_path}
        className='h-full w-full object-cover'
        alt={data?.title || data?.name}
      />

      {trending && (
        <div className='absolute top-4 left-0'>
          <div className='py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full'>
            #{index} Trending
          </div>
        </div>
      )}

      <div className='absolute bottom-0 h-14 backdrop-blur-3xl bg-black/60 w-full p-2'>
        <h2 className='text-lg font-semibold line-clamp-1'>
          {data?.title || data?.name}
        </h2>

        <div className='text-sm text-neutral-400 flex justify-between items-center'>
          <p>
            {data?.release_date
              ? moment(data.release_date).format("MMM Do YYYY")
              : ""}
          </p>
          <p className='bg-black px-1 rounded-full text-xs text-white'>
            Rating:{Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>

    </Link>
  )
}

export default Card
