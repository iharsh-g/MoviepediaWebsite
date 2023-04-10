import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import {BsSearch} from 'react-icons/bs'
import Spinner from '../components/Spinner';
import Card from '../components/Card'

function Search() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  async function getSearchMovie(query) {
    setLoading(true)
    const out = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eb77a6e7061b90a30a6a28502f197d45&query=${query}`);
    const data = await out.json();

    console.log(data.results);
    setMovies(data.results);

    setLoading(false);
  }

  function submitHandler(event) {
    if (event.key === 'Enter') {
      getSearchMovie(event.target.value);
    }
  }

  return (
    <div className='bg-black min-h-[100vh]  w-full'>      
      <Navbar/>

      <div className='my-5 mt-12 md:w-[760px] lg:w-[1200px] mx-auto relative'>
        
        <input type='search' className='w-[100%] py-3 text-lg pl-[1rem] md:pl-[4rem] pr-[4rem] rounded-full outline-[#f00] border-[3px] border-[#f00]'
         placeholder='Search Movies...' onKeyDown={submitHandler}/>

        <BsSearch className='text-black absolute right-7 top-4' fontSize={"1.5rem"}/>

        <div className='grid grid-cols-1 mx-10 sm:mx-[10rem] md:mx-0 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
          {
            loading ? <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center'><Spinner/></div> :
            movies.map((movie) => 
              <Card movie={movie} id={movie.id} search={true}/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Search