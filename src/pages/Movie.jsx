import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import Iframe from 'react-iframe'
import Cast from '../components/Cast';
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'

function Movie() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [movie, setMovie] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    async function getSearchMovie() {
        setLoading(true)
        const out = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=eb77a6e7061b90a30a6a28502f197d45`);
        const data = await out.json();

        console.log(data);
        setMovie(data);

        let genres = [];
        for(let i=0; i<data.genres.length; i++) {
            genres.push(data.genres[i].name);
        }
        setMovieGenres(genres);

        setLoading(false);
    }

    const[key, setKey] = useState('');
    async function getYoutube() {
        const out2 = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=eb77a6e7061b90a30a6a28502f197d45`);
        const data2 = await out2.json();

        // console.log(data2.results);
        for(let i=0; i<data2.results.length; i++) {
            if(data2.results[i].site === "YouTube" && data2.results[i].type === "Trailer") {
                setKey(data2.results[i].key);
                console.log(data2.results[2].key);
                break;
            }
        }
    }

    const [casts, setCasts] = useState([]);
    async function getCast() {
        const out = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=eb77a6e7061b90a30a6a28502f197d45`);
        const data = await out.json();

        console.log(data.cast);
        setCasts(data.cast);
    }

    useEffect(() => {
        getSearchMovie();
        getYoutube();
        getCast();
    }, [])
    
    function toDateAndTime(date = "12-12-12") {
        if(date === "") {
            return;
        } else {
            let arr = date.split("-");
            let monthNo = arr[1];
            return arr[2] + " " + months[monthNo - 1] + " " + arr[0];
        }
    }

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    }

    let box;
    useEffect(() => {
        box = document.querySelector('.container-cast');
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
        <div className='md:h-[100vh] h-screen bg-black md:w-[100vw] lg:overflow-hidden overflow-y-scroll'>
            {
                loading ? <div className='absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center'><Spinner/></div> :
                <div className='relative'>
                
                    <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} className='lg:h-screen lg:w-screen md:w-[1000px] md:h-[1000px] rounded-full md:block hidden' loading='lazy' />
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[#00000088] z-[1] md:block hidden'></div>

                    <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} className='rounded-full md:hidden block' loading='lazy' />
                    <div className='absolute bg-[#00000088] top-0 left-0 right-0 bottom-0 z-[1] md:hidden block border-white'></div>
                    
                    <div className='absolute w-full h-[100vh] top-0 z-[5] flex flex-col gap-5'>
                        <div className='w-full text-white text-center'>
                            <p className='lg:text-5xl md:text-3xl text-2xl font-bold my-5'>{movie.title}</p>
                            <p className='md:text-xl opacity-80 md:px-[20rem]'>{movie.tagline}</p>
                        </div>

                        <div className='flex mt-[1rem] md:ml-[10rem] lg:mr-0 md:mr-[10rem] px-10 lg:gap-16 lg:justify-start justify-between'> 

                            <p className='text-white rounded-full border px-2 py-1'>
                                {`${toHoursAndMinutes(movie.runtime).hours}hr ${toHoursAndMinutes(movie.runtime).minutes}min`}
                            </p>     

                            <p className='text-white lg:text-xl md:text-lg'>{`💖 ${movie.vote_average}`}</p>
                            <p className='text-white rounded-full border py-1 px-2'>{toDateAndTime(movie.release_date)}</p>
                        </div>

                        <div className='grid lg:grid-cols-2 grid-cols-1 mt-[1rem] lg:mr-0 md:ml-[10rem] md:mr-[10rem] px-10'>

                            <div className='text-white text-center md:text-left'>
                                <p className='md:text-2xl'>{movie.overview !== undefined && movie.overview.length > 0 && `${movie.overview.split(" ").slice(0, 40).join(" ")}...`}</p>
                                <p className='mt-[2rem] text-[25px] italic genresShadow font-semibold'>{movieGenres.join(", ")}</p>
                            </div>

                            <Iframe url={`http://www.youtube.com/embed/${key}`}
                             className='md:w-[400px] md:h-[220px] h-[200px] w-[300px] lg:-mt-[1rem] mt-5 rounded-xl shadow-[0_8px_30px_rgb(255,255,255,255)] place-self-center' />
                        </div>

                        <div className='relative md:ml-[10rem] md:mr-[9rem] lg:mt-0 mt-5'>

                            <AiOutlineDoubleLeft className='text-white rounded-full bg-black p-2 absolute opacity-70 left-0 z-[1] md:top-24 top-10
                             hover:opacity-100 ease-in duration-300 cursor-pointer' fontSize={"3rem"} onClick={leftButton}/>

                            <div className='container-cast flex overflow-hidden scroll-smooth'>
                                {
                                    casts.length > 0 ? casts.map((cast) => 
                                        <Cast cast={cast} key={cast.id}/>
                                    ) :
                                    <p className='text-white'> No Cast Availalbe</p>
                                }
                            </div>

                            <AiOutlineDoubleRight className='text-white rounded-full bg-black opacity-70 p-2 absolute right-0 z-[1] md:top-24 top-10
                             hover:opacity-100 ease-in duration-300 cursor-pointer' fontSize={"3rem"} onClick={rightButton}/>
                        </div>
                    </div>

                </div>  
            }
        </div>
    )
}

export default Movie