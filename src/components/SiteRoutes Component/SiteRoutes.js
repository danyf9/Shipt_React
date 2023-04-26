import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login Component/Login'
import Signup from '../Signup component/Signup'

export default function SiteRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
