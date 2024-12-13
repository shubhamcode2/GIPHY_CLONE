import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import AppLayout from "./layout/app-layout"
import Categories from "./pages/categories"
import Favories from "./pages/favories"
import SingleGif from "./pages/singleGif"
import Search from "./pages/search"
import Home from "./pages/Home"
import GifProvider from "./context/gif-context"

function App() {

  // const router = createBrowserRouter(
  //   [
  //     {
  //       element:<AppLayout/>,
  //       children:[
  //         {
  //           path:"/",
  //           element:<Home/>
  //         },
  //         {
  //           path:"/:categories",
  //           element:<Categories/>
  //         },
  //         {
  //           path:"/favorits",
  //           element:<Favories/>
  //         },
  //         {
  //           path:"/:type/:slug",
  //           element:<SingleGif/>
  //         },
  //         {
  //           path:"/search/:query",
  //           element:<Search/>
  //         },

  //       ]
  //     }
  //   ]
  // )


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:categories" element={<Categories />} />
        <Route path="/favorits" element={<Favories />} />
        <Route path="/:type/:slug" element={<SingleGif />} />
        <Route path="/search/:query" element={<Search />} />
      </Route>
    )
  )


  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  )
}

export default App
