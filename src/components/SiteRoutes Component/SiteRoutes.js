import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Login Component/Login'
import Signup from '../Signup component/Signup'
import ItemsLoader from '../Item Component/ItemsLoader'
import Welcome from '../Welcome'

export default function SiteRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<Welcome/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/items' element={<ItemsLoader/>}/>
    </Routes>
    </>
  )
}
