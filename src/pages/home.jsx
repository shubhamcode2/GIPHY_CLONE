import React, { useEffect } from 'react'
import { GifState } from '../context/gif-context'
import Gif from '../components/Gif';
import FilterGif from '../components/FilterGif';

function Home() {

  const { gf, gifs, setGifs, filters } = GifState();

  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending(
      { limit: 20, type: filters, rating: "g" }
    );
    setGifs(data);
    // console.log(data);

  };
  useEffect(() => {
    fetchTrendingGifs();
  }, [filters])

  return (
    <div>
      <img
        src='/src/assets/banner.gif'
        alt="earth banner"
        className='mt-2 rounded w-full '
      />

      <FilterGif showTrending />


      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title} />
        })}
      </div>


    </div>
  )
}

export default Home