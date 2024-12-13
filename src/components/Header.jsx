import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gif-context";
import GifSearch from "./GifSearch";


function Header() {
    const [categories, setCategories] = React.useState([]);
    const [showCategories, setShowCategories] = React.useState(false);

    const { gf, favories } = GifState();

    const fetchGifCategories = async () => {
        try {
            const { data } = await gf.categories();
            setCategories(data);
        }
        catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchGifCategories();
    }, []);

    return (
        <nav>
            <div className="relative flex gap-4 justify-between items-center mb-2">
                <Link to="/" className="flex gap-2">
                    <img src="/src/assets/logo.svg" alt="logo" className="w-8" />
                    <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
                        GIPHY
                    </h1>
                </Link>

                <div className="font-bold text-md flex gap-2 items-center">

                    {/* render category */}
                    {categories?.slice(0, 5)?.map((category) => {
                        return (
                            <Link
                                key={category.name}
                                to={`/${category.name_encoded}`}
                                className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
                            >
                                {category.name}
                            </Link>
                        );
                    })}

                    <button onClick={() => setShowCategories(!showCategories)}>
                        <HiEllipsisVertical
                            size={35}
                            className={`py-0.5 hover:gradient border-b-4 hidden lg:block ${showCategories ? "gradient" : ""
                                }`}
                        />
                    </button>

                    {favories.length > 0 && (
                        <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
                            <Link to="/favourite">Favorite GIFs </Link>
                        </div>
                    )}

                    <button>
                        <HiMiniBars3BottomRight
                            className="text-sky-400 block lg:hidden "
                            size={30}
                        />
                    </button>
                </div>

                {showCategories && (
                    <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20 ">
                        <span className="text-xl font-extrabold">
                            Categories
                            <hr className="bg-gray-100 opacity-55 my-5" />
                            <div
                                className="grid grid-col-2
                            sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4"
                            >
                                {categories.map((category) => (
                                    <Link
                                        onClick={() => setShowCategories(false)}
                                        key={category.name}
                                        to={`/${category.name_encoded}`}
                                        className="font-bold"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </span>
                    </div>
                )}
            </div>

            <GifSearch />


        </nav>
    );
}

export default Header;
