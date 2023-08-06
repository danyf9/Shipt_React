import React, { useContext } from 'react'
import { AppContext } from '../../App'
import'./ItemPayListStyle.css'
import './ItemPayListStyle.css'

export default function ItemsPayList() {
    const {visCart, nav} = useContext(AppContext)

  return (
    <>
    <div className='check'>
    <h3 style={{marginLeft: '29%'}}>Checkout list</h3>
    <ol>
        {visCart.map((lst, index)=>{
            return <li><p key={index} style={{color: 'white'}}>
                {lst[1]} {JSON.parse(lst[0]).name}s {JSON.parse(lst[0]).price}$
            </p></li>
        })}
    </ol>
    <p style={{textAlign:'center'}}>*you need to login in order to pay</p>
    <button onClick={()=>{nav('/pay')}} style={{borderColor: 'inherit'}}
        >continue for checkout</button>
    </div>
    </>
  )
}
