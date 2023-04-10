import React from 'react'

function Cast({cast}) {
    let characterName = cast.character.length > 25 ? (`as ${cast.character.slice(0, 25)}...`) : (`as ${cast.character}`);
    return (
        <div className='md:min-w-[250px] min-w-[150px] flex flex-col items-center px-3'>

            <img src={`https://image.tmdb.org/t/p/w1280${cast.profile_path}`} alt='No image available' loading='lazy'
            className='md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full text-white shadow-[0_8px_10px_rgb(255,255,255,255)]'/>

            <p className='text-white mt-3'>{cast.original_name}</p>
            <p className='text-gray-400'>{characterName}</p>
        </div>
    )
}

export default Cast