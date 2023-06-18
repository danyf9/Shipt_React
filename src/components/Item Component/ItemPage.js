import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

export default function ItemPage() {
    const {item, getItem, setCart} = useContext(AppContext)
    
    // const source = item ? 'http://127.0.0.1:8000/static/data/'+ item.id+'.png' : ''
    

    useEffect(()=>{
      getItem()
    },[window.location.pathname])

  return (
    <>
    <div style={{display: 'table', height: '400px', overflow: 'hidden'}}>
    {/* <img src={source} alt='' style={{maxHeight: '20rem'}}/> */}
        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div>
        <h3 style={{marginLeft: '1rem',}}
        >{item.name}</h3>
        <h5 style={{marginLeft: '1rem'}}
        >{item.price}$</h5>
            </div>
            <button style={{backgroundColor: 'black', color: 'white'}}
            onClick={()=>{setCart((prev)=>{return [...prev, item]})}}
            >
        add to cart +
        </button>
        </div>
        {item.description}
    </div>
        </>
  )
}
