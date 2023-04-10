import React from 'react'
import PopularMovies from "../components/PopularMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
        <Navbar/>

        <div className="flex flex-col gap-4 min-h-[90vh] bg-black p-5">
                <div className="space-y-7"> 
                    <p className=" text-3xl font-bold text-white text-center">Popular Movies</p>
                    <PopularMovies/>
                </div>
                <div className=" space-y-7">
                    <p className=" text-3xl font-bold text-white text-center">Top Rated Movies</p>
                    <TopRatedMovies/>
                </div>
                <div className=" space-y-7">
                    <p className=" text-3xl font-bold text-white text-center">Upcoming Movies</p>
                    <UpcomingMovies/>
                </div>
        </div>
    </div>
  )
}

export default Home