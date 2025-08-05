import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import CartPage from '../pages/CartPage'
import AddProduct from '../pages/AddProduct'

export default function Routing() {
  return (
    <Routes>
        <Route index element={<ProductsPage/>} />
        <Route path='/products' element={<ProductsPage/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/addProduct' element={<AddProduct/>} />
    </Routes>
  )
}
