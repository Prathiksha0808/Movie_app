import { useSelector } from 'react-redux'
import BannerHome from '../components/BannerHome'
import HorizontalScrollcard from '../components/HorizontalScrollcard'
import useFetch from '../hooks/useFetch';

const Home = () => {

  const trending=useSelector((state)=>state.movieData.bannerData)
  const {data:nowplayingdata}=useFetch('/movie/now_playing')
    const {data:populardata}=useFetch('/movie/top_rated')
  const {data:ontheairtvdata}=useFetch('/tv/on_the_air')
  const {data:populartvdata}=useFetch('/tv/top_rated')

  return (
    <div className=''>
      <BannerHome/>
      <HorizontalScrollcard data={trending} heading="Trending" trending={true}/>
      <HorizontalScrollcard data={nowplayingdata} heading="Now Playing" />
       <HorizontalScrollcard data={populardata} heading="Top Rated Movies" />
       <HorizontalScrollcard data={ontheairtvdata} heading="On The Air TV Shows" />
       <HorizontalScrollcard data={populartvdata} heading="Popular TV Shows" />
    </div>
  )
}

export default Home
