import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { cartTotal } from "./features/storeSlice";


const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Landing />,
        path: '/'
      },
      {
        element: <Cart />,
        path: '/cart'
      }
    ]
  }
])

const App = () => {

  const { cartItems } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartTotal())
  }, [cartItems, dispatch])
  return (
    <RouterProvider router={router} />
  )
}
export default App;