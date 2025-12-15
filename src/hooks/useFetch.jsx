import { useState,useEffect } from "react"
import axios from "axios";

const useFetch = (endpoint) => {
  const [data,setdata]=useState([]);
  const [loading,setloading]=useState(false);

 const fetchData=async()=>{
    try{
        setloading(true)
      const response=await axios.get(endpoint);  
      setloading(false)     
      setdata(response.data.results);
    } catch(error){
      console.error("Error fetching now playing data:",error);
    } 
  }
  
useEffect(()=>{
    fetchData();
  },[]) 
  return {data,loading};
}

export default useFetch;