import React, { useEffect, useState } from 'react'

function useMovies(val) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getMovies() {
        setLoading(true);
        const output = await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=eb77a6e7061b90a30a6a28502f197d45&page=1`);
        const data = await output.json();
    
        console.log(data.results);
        setMovies(data.results);

        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, [])

    return {getMovies, movies, loading}
}

export default useMovies