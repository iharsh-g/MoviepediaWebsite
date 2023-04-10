import React, { useEffect } from 'react'
import useMovies from '../hooks/useMovies'
import Card from './Card'
import Spinner from './Spinner'
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'

function PopularMovies() {
    const {getMovies, movies, loading} = useMovies("popular");

    let box;
    useEffect(() => {
        box = document.querySelector('.container-popular');
    })

    function leftButton() {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }

    function rightButton() {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
    }

    return (
        <div className='flex justify-center'>
            {
                loading ? (<Spinner/>) : 
                movies.length === 0 ? <p>No Movies Found</p> :
                (<div className=' w-full relative  px-3'>

                    <AiOutlineDoubleLeft className='text-black rounded-full bg-white p-2 absolute opacity-70 left-0 z-[1] top-28
                     hover:opacity-100 ease-in duration-300 cursor-pointer' fontSize={"3rem"} onClick={leftButton}/>

                    <div className='container-popular flex items-start gap-5 overflow-hidden scroll-smooth py-5 px-5 bg-[#0b0b0b] rounded-xl'>
                        {movies.map((movie) => 
                            <Card key={movie.id} movie={movie} search={false}/>    
                        )}
                    </div>

                    <AiOutlineDoubleRight className='text-black rounded-full bg-white opacity-70 p-2 absolute right-0 z-[1] top-28
                    hover:opacity-100 ease-in duration-300 cursor-pointer' fontSize={"3rem"} onClick={rightButton}/>
                </div>)
            }
        </div>
    )
}

export default PopularMovies