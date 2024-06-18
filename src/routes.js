import Home from "./pages/Home/Home"
import AllUser from "./pages/AllUser/AllUser"
import NewUser from "./pages/NewUser/NewUser"
import Product from "./pages/Product/Product"
import MainProduct from "./pages/Product/MainProduct"

let routes = [
    {path: '/', element: <Home />},
    {path: '/allUser', element: <AllUser />},
    {path: '/newUser', element: <NewUser />},
    {path: '/product', element: <Product />},
    {path: '/product/:productId', element: <MainProduct />}
] 

export default routes