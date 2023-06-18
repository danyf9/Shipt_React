import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './ItemStyle.css'
import { AppContext } from '../../App';

export default function ItemBox(props) {

    const nav = useNavigate()
    const source = props.item && 'http://127.0.0.1:8000/static/data/'+ props.item.id+'.png'
    const {darkmode, setItem, setCart, cart} = useContext(AppContext)

  return (
    <>
    <div className='item-box'
    style={darkmode ? {border: 'white solid 0.2rem'} : {border: 'black solid 0.2rem'}}
    >
      <div onClick={()=>{setItem(props.item); nav('/item/'+props.item.id)}}
      style={{display: 'flex', flexDirection: 'column'}}
      >
      {/* <img src={source} alt=''/> */}
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
    <button style={{backgroundColor: 'black', color: 'white'}}
            onClick={()=>{setCart((prev)=>{return [...prev, props.item]});
            }}
            >
        add to cart +
        </button>
    </div>
    </>
  )
}

