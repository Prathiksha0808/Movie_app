import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'

const ExplorePage=()=> {
  const[pageno,setpageno]=useState(1)
  const[data,setData]=useState([])
  const [total_page_no,settotalpageno]=useState(0)
  const params=useParams()

  const fetchData=async()=>{
    try{
      const response=await axios.get(`/discover/${params.explore}`,{
        params:{
          page:pageno
        }
      })
      setData((prev)=>{
        return[...prev,...response.data.results]    
        })
        settotalpageno(response.data.total_page_no)
    }
    catch{
      console.log("error");
      
    }
  }

  const handlescroll=()=>{
    if((window.innerHeight+window.scrollY)>=document.body.offsetHeight){
      setpageno(prev=>prev+1)
    }
  }

  useEffect(()=>{
    fetchData()
  },[pageno])

 useEffect(()=>{
   setpageno(1)
   setData([])
   fetchData()
  },[params.explore])

   useEffect(()=>{
    window.addEventListener('scroll',handlescroll)
  },[])

  return (
    <div className='py-16 '>
      <div>
      <h3 className='px-3 capitalize text-lg lg:text-xl font-semibold my-3 '>Popular {params.explore} Show</h3>
      <div className=' lg:ml-9 grid grid-cols-[repeat(auto-fit,250px)] gap-12 justify-center lg:justify-start'>
        {
        data.map((exploredata,index)=>{
        return(
          <Card data={exploredata} key={exploredata.id+"exploresection"} media_type={params.explore}/>
        )
      })}</div>
      </div>
    </div>
  )
}

export default ExplorePage
