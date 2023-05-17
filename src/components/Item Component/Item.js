import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './ItemStyle.css'
import { AppContext } from '../../App';

export default function Item(props) {

    const nav = useNavigate()
    const source = 'http://127.0.0.1:8000/static/'+ props.item.id+'.png'
    const {darkmode} = useContext(AppContext)

  return (
    <>
    <div className='item-box'
    style={darkmode ? {border: 'white solid 0.2rem'} : {border: 'black solid 0.2rem'}}
    // onClick={()=>(nav(window.location.pathname+'/'+props.item.id))}
    onClick={()=>{console.log(props.item.id);}}
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
    </>
  )
}
