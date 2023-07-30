import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Login Component/Login'
import Signup from '../Signup component/Signup'
import Welcome from '../Welcome'
import ItemPage from '../Item Components/ItemPage'
import Chat from '../Chat component/Chat'
import Pay from '../Pay Components/Pay'
import ItemsPayList from '../Pay Components/ItemsPayList'
import CombinedItemLoader from '../Item Components/CombinedItemLoader'
import Terms from '../Signup component/Terms'
import SearchItem from '../Item Components/SearchItem'

export default function SiteRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<Welcome/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/items' element={<CombinedItemLoader/>}/>
        <Route path='/search' element={<SearchItem/>}/>
        <Route path='/item/*' element={<ItemPage/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/terms-of-service' element={<Terms/>}/>
        <Route path='/pay-list' element={<ItemsPayList/>}/>
        <Route path='/pay' element={<Pay/>}/>
    </Routes>
    </>
  )
}
