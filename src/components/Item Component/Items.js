import React, { useContext } from 'react'
import Item from './Item'
import { AppContext } from '../../App';

export default function Items() {
    
    const {items} = useContext(AppContext)

  
    return (
    <>
    {items.map((item)=>{
        return <Item item={item} key={item.id}/>})}
    </>
  )
}
