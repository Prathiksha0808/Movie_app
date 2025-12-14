import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';  
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import axios from 'axios';
import MobileNavigation from './components/MobileNavigation';
import { useDispatch } from 'react-redux';
import { setBannerData ,setImageURL} from './store/movieslice';

export default function App() {

  const dispatch=useDispatch()

const fetchtrending=async()=>{
  try{
    const response=await axios.get('/trending/all/week');
    dispatch(setBannerData(response.data.results))
  }catch(error){
    console.error("Error fetching trending data:",error);
  }
}
const fetchConfiguration=async()=>{
  try{
    const response=await axios.get('/configuration');
    dispatch(setImageURL(response.data.images.secure_base_url+"original"))
  }catch(error){
    console.error("Error fetching configuration data:",error);
  }
}

useEffect(()=>{
  fetchtrending();
  fetchConfiguration();
},[])

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className=''>
        <Home/>
      </div>
      <Footer />
      <MobileNavigation/>
    </main>
  );
}
