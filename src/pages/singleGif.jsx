import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import { HiMiniChevronUp, HiMiniChevronDown, HiMiniHeart } from "react-icons/hi2"
import { FaLink, FaPaperPlane } from "react-icons/fa6";
import FollowOn from "../components/FollowOn";
import { IoCodeSharp } from "react-icons/io5";
function SingleGif() {

  const contentType = ["gifs", "stickers", "texts"];
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const { gf, favories, addtoFavorites } = GifState()
  const [readmore, setReadmore] = useState(false);



  const shareGif = () => {
    const url = `https://giphy.com/gifs/${slug}`;
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard");
  }

  const EmbedGif = () => {
    const url = `https://giphy.com/gifs/${slug}`;
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard");
  }

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], { limit: 10 });
    setGif(data);
    setRelatedGifs(related);
  }

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }

    fetchGif()

  }, [])



  return (
    <div className="grid grid-cols-4 my-10 gap-4 ">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14" />
              <div className="px-2 ">
                <div className="font-bold "> {gif?.user?.display_name}</div>
                <div className="faded-text"> @{gif?.user?.username}</div>

              </div>
            </div>
            {
              gif?.user?.description && (
                <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                  {readmore ? gif?.user?.description : gif?.user?.description?.slice(0, 10) + "..."}
                  <div
                    className="flex items-center faded-text cursor-pointer"
                    onClick={() => setReadmore(!readmore)}
                  >
                    {readmore ? (
                      <>
                        read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        read more <HiMiniChevronDown size={20} />
                      </>
                    )}

                  </div>
                </p>
              )
            }
          </>
        )}
        <FollowOn />
        <div className="divider" />
        {gif?.source && (
          <>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <FaLink size={25} />
              <a href={gif?.source} target="_blank" className="truncate">
                {gif?.source}
              </a>

            </div>
          </>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <div className="">
              <Gif gif={gif} hover={false} />

            </div>

            {/* mobile ui */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14" />
              <div className="px-2 ">
                <div className="font-bold "> {gif?.user?.display_name}</div>
                <div className="faded-text"> @{gif?.user?.username}</div>
              </div>
              <button className="ml-auto"

              // onClick={shareGif}
              >

                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">

            <button
              // onClick={() => addtoFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg">
              <HiMiniHeart
                size={30}
                className={` ${favories.includes(gif.id) ? "text-red-400" : ""}`}
              />
              Favorits
            </button>


            <button
              onClick={shareGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif}
              className="flex gap-5 items-center font-bold text-lg">
              <IoCodeSharp size={30} />
              Embed
            </button>







          </div>
        </div>
        <div className="mt-16">
          <span className="font-extrabold text-3xl ">
            realated gifs
            <hr />
            <br />
            <br />
          </span>
          <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
              {relatedGifs.slice(1).map((gif) => {
                return (
                  <Gif gif={gif} key={gif.id} />
                )
              })}
            </div>
        </div>
      </div>
    </div>
  )
}

export default SingleGif