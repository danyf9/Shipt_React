import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Style.css'

export default function Item(props) {

    const nav = useNavigate()
    const source = 'http://127.0.0.1:8000/static/'+ props.item.id+'.png'

  return (
    <>
    <div className='item-box'
    onClick={()=>(nav(window.location.pathname+'/'+props.item.id))}>
      {/* picture here */}
      <img src={source} alt=''/>
        <h3
        style={{
        marginLeft: '1rem',
        }}
        >{props.item.name}</h3>
        <h5
        style={{
            marginLeft: '1rem',
        }}
        >{props.item.price}$</h5>
    </div>
    </>
  )
}
