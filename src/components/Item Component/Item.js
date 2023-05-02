import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Item(props) {

    const nav = useNavigate()

  return (
    <>
    <div 
    onClick={()=>(nav(window.location.pathname+'/'+props.item.id))}
    style={{
    outline: "white solid 0.1rem", 
    width: '19.578%', 
    display: 'inline-table', 
    }}>
        <h3
        style={{
        marginLeft: '1rem',
        }}
        >{props.item.name}</h3>
        {/* picture here */}
        <h5
        style={{
            marginLeft: '1rem',
        }}
        >{props.item.price}$</h5>
    </div>
    </>
  )
}
