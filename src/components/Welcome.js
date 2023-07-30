import React, { useContext } from 'react'
import { AppContext } from '../App'
import ItemCarousel from './Item Components/ItemCarousel'
export default function Welcome() {
  const {username, userLogin} = useContext(AppContext)
  return (
  <>
  { userLogin &&
    <p>Welcome {username}</p>}
    <div 
    style={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
      backgroundColor: '#7a445e',
    }}>
    <ItemCarousel/>
    </div>
    </>
  )
}
