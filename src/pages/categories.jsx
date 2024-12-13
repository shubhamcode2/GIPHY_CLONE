import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/gif-context'
import { use } from 'react'
import Gif from '../components/Gif'
import FollowOn from '../components/FollowOn'

function Categories() {
  // const image = <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgiphy.com%2Fsesamestreet%2Fnew-gifs&psig=AOvVaw0rXsGzpyGOucfu2J85U7pR&ust=1734083314816000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOC5lPT5oYoDFQAAAAAdAAAAABAE" alt="default" />


  const [result, setResult] = useState([])
  const { categories } = useParams()
  const { gf } = GifState()

  const fetchResult = async () => {
    setResult([])
    const { data } = await gf.gifs(categories, categories)
    setResult(data)
  }

  useEffect(() => {
    fetchResult()
  }, [categories])


  return (
    <div className='flex flex-col sm:flex-row gap-5 my-4 '>
      <div className='w-full sm:w-72 '>
        {result.length > 0 && <Gif gif={result[0]} hover={false} />}
        <span className='text-gary-400 text-sm pt-2'>
          Do&apos;t tell it to me, gif it to me!
        </span>
        <FollowOn />
        <div className='divider'></div>
      </div>
      <div>

        <h2 className='text-4xl  pb-1 font-extrabold capatitalize'>
          {categories.split("-").join(" & ")} Gifs
        </h2>
        <h2 className='text-lg text-gray-400   pb-3 font-bold hover:text-gray-50 cursor-pointer'>
          @{categories}
        </h2>
        {
          result.length > 0 && (
            <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
              {result.slice(1).map((gif) => {
                return (
                  <Gif gif={gif} key={gif.id} />
                )
              })}
            </div>
          )
        }
        
      </div>

    </div>
  )
}

export default Categories