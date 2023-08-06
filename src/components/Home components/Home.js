import React, { useContext } from 'react'
import { AppContext } from '../../App'
import ItemCarousel from '../Item Components/ItemCarousel'
import './HomeStyle.css'
import More from './More'

export default function Welcome() {
  const {username, userLogin} = useContext(AppContext)
  return (
  <>
  <h2 style={{textAlign: 'center', marginTop: '5%', marginBottom: '2%'}}>Welcome {userLogin && username} to Shipt shopping</h2>
    <div className='new'>
    <ItemCarousel/>
    </div>

    <div className='more'>
      <More/>
    </div>
    
    </>
  )
}
