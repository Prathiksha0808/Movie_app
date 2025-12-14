import { configureStore } from "@reduxjs/toolkit";
import  movieReducer  from "./movieslice";  
export const store = configureStore({
  reducer: { 
    movieData:movieReducer
   },
});
