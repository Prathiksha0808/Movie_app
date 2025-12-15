import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([])
  const [page, setpageno] = useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location.search.slice(3),
          page: page
        }
      })
      setData((prev) => {
        return [...prev, ...response.data.results]
      })
    }
    catch {
      console.log("error");

    }
  }



  useEffect(() => {
    setpageno(1)
    setData([])
    fetchData()
  }, [location?.search])

  const handlescroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setpageno(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handlescroll)
  }, [])

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input type="text" placeholder='Search here..'
          className="px-4 py-1 text-lg w-full bg-white rounded-full mx-1 text-neutral-900 border-2 border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => navigate(`/search?q=${e.target.value}`)} />

      </div>
      <div className='container mx-auto'>
        <h3 className=' px-3 capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
        <div className='lg:ml-9 grid grid-cols-[repeat(auto-fit,250px)] gap-12 justify-center lg:justify-start'>
          {
            data.map((searchdata, index) => {
              return (
                <Card data={searchdata} key={searchdata.id + "search"} media_type={searchdata.media_type} />
              )
            })}</div>
      </div>
    </div>
  )
}

export default SearchPage
