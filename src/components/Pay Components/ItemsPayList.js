import React, { useContext } from 'react'
import { AppContext } from '../../App'

export default function ItemsPayList() {
    const {visCart, nav} = useContext(AppContext)

  return (
    <><ol>
        {visCart.map((lst, index)=>{
            return <li><p key={index} style={{color: 'white'}}>
                {lst[1]} {JSON.parse(lst[0]).name}s {JSON.parse(lst[0]).price}$
            </p></li>
        })}
        <button onClick={()=>{nav('/pay')}} style={{borderColor: 'inherit'}}
        >continue for checkout</button>
    </ol></>
  )
}
