import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Search from '../pages/search';
function GifSearch() {

  const [Query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchGifs = async () => {
    if (Query.trim() === '') {
      return;
    }
    navigate(`/search/${Query}`);
  }







  return (
    <div className='flex relative'>
      <input
        type="text"
        onKeyDown={(e) => e.key === 'Enter' && searchGifs()}
        value={Query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search Gifs and stickers'
        className='w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl outline-none' />
      {Query && (
        <button
          onClick={() =>

            setQuery('')
            }
          className='absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-5 '>
          <HiMiniXMark size={30} />
        </button>
      )}
      <button
        onClick={searchGifs}
        className='bg-red-600 text-white px-4 py-2 rounded-tr-lg '
      >

        <HiOutlineMagnifyingGlass size={35} className='-scale-x-100' />
      </button>
    </div>
  )
}

export default GifSearch