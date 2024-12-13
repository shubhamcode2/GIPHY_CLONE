import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Gif from '../components/Gif';
import { GifState } from '../context/gif-context';
import FilterGif from '../components/FilterGif';

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const { gf, filters } = GifState();
  const { query } = useParams();


  const fetchSearchResult = async () => {
    setSearchResult([])
    const { data } = await gf.search(query, { limit: 20, type: filters, sort: "relevant", lang: "en", });
    setSearchResult(data)
  }

  useEffect(() => {
    fetchSearchResult()
  }, [filters,query])




  return (

    <div className='my-4'>
      <h2 className='text-5xl pb-3 font-extrabold'>{query}</h2>

      <FilterGif alignLeft={true} />

      {
        searchResult.length > 0 ? (
          <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
            {searchResult.map((gif) => {
              return <Gif gif={gif} key={gif.id} />
            })}
          </div>
        ) : (
          <span> No gifs found for {query} . try searching for stickers</span>

        )
      }




    </div >
  )
}

export default Search