import { Box, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import ProductList from '../pages/ProductList'
import Wishlist from '../pages/Wishlist'
import Cart from '../pages/Cart'

const Navigation = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={
          <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center">
           <Box>
           <Text fontSize="2xl" fontWeight="bold" color="red">Page not found</Text>
            <Button w="full" onClick={()=>window.history.back()}>Go Back</Button>
           </Box>
          </Box>
        } />
      </Routes>
   </Router>
  )
}

export default Navigation