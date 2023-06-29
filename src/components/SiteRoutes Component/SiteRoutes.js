import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Login Component/Login'
import Signup from '../Signup component/Signup'
import ItemsLoader from '../Item Component/ItemsLoader'
import ItemFilter from '../Item Component/ItemFilter'
import Welcome from '../Welcome'
import ItemPage from '../Item Component/ItemPage'
import ShoppingCart from '../Shopping cart component/ShoppingCart'
import Chat from '../Chat component/Chat'
import Pay from '../Pay Component/Pay'
// import NewChat from '../Chat component/NewChat'

export default function SiteRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<Welcome/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/items' element={<ItemsLoader/>}/>
        <Route path='/filter' element={<ItemFilter/>}/>
        <Route path='/item/*' element={<ItemPage/>}/>
        <Route path='/cart' element={<ShoppingCart/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/pay' element={<Pay/>}/>
    </Routes>
    </>
  )
}
