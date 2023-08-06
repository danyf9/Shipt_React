import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Login Component/Login'
import Signup from '../Signup component/Signup'
import Welcome from '../Home components/Home'
import Pay from '../Pay Components/Pay'
import ItemsPayList from '../Pay Components/ItemsPayList'
import CombinedItemLoader from '../Item Components/CombinedItemLoader'
import Terms from '../Signup component/Terms'
import SearchItem from '../Item Components/SearchItem'
import Profile from '../User components/Profile'
import NewItemPage from '../Item Components/NewItemPage'
import ResetPassword from '../User components/ResetPassword'
import PastShipments from '../User components/PastShipments'
import ShipmentItems from '../User components/ShipmentItems'
import NotFound from '../NotFound'

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
        <Route path='/item/*' element={<NewItemPage/>}/>
        <Route path='/terms-of-service' element={<Terms/>}/>
        <Route path='/pay-list' element={<ItemsPayList/>}/>
        <Route path='/pay' element={<Pay/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/shipments' element={<PastShipments/>}/>
        <Route path='/shipment/*' element={<ShipmentItems/>}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
    </>
  )
}
