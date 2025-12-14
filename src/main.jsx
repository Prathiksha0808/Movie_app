import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import routes from './routes/index.jsx'
import { RouterProvider } from 'react-router-dom'
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';

axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`;



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes}/>
  </Provider>
  </StrictMode >
)
