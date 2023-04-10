import React from 'react'
import {useNavigate} from 'react-router-dom'

function Card({movie, search}) {
  const desc = movie.title.length > 40 ? (`${movie.title.slice(0, 40)}....`) : (movie.title);
  const navigate = useNavigate();

  function clickHandler(id) {
    if(search) {
      navigate({
        pathname:'/search/movies',
        search: `id=${id}`,
      });
    }
    else {  
      navigate({
        pathname:'/movies',
        search: `id=${id}`,
      });
    }
  }

  return (
    <div className='min-w-[300px] my-7 relative cursor-pointer hover:scale-110 hover:shadow-[0_3px_20px_rgb(255,255,255,255)] hover:z-[5]
          transition-all duration-300 ease-in rounded-md flex flex-col items-center' onClick={() => clickHandler(movie.id)}>

        <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} loading='lazy' alt={`${movie.title} is not available`} className='w-[280px] h-[160px] rounded-md text-center flex text-white'/>

        <p className='w-[200px] mx-auto text-center text-white text-opacity-90 text-lg font-semibold my-2'>{desc}</p>

        <p className='mx-auto text-center text-yellow-300 text-opacity-90 font-medium absolute top-0 
          right-0 bg-[#0b0b0b] px-[2px] py-[1px] rounded-md'>{`💖 ${movie.vote_average}`}</p>
          
        <p className='bg-[#1b1b1b] text-white absolute top-0 left-0 px-2 py-[1px] rounded-md '>{movie.release_date.slice(0, 4)}</p>
    </div>
  )
}

export default Card