import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import './PayStyle.css'

export default function Pay() {
    const {cart, setCart, API_URL, userLogin, nav} = useContext(AppContext)
    const [success, setSuccess] = useState('')
    
    const pay = async ()=>{
      try{
        const response = await axios.post(
            `${API_URL}/shipment`,
            {headers: {'content-type': 'application/json'},
              data: cart,
              token : localStorage.token,
        }
        )
        console.assert(response.status === 200)
        if(response.data === 'ok'){
          setSuccess(true)
        }
        setTimeout(()=>{setCart([]); nav('/shipments')},2000)
      }
    catch(error){
      console.log(error);
      setSuccess(false)
    }}
    return (
    <>
    {/* 
    this input does nothing as this project is for education purposes only 
    and does not send/use any credit card information
    */}
    
    {userLogin ? <div className='pay-box'>
    <h3 style={{marginLeft: '8.5rem', marginBottom: '2rem'}}>Payment</h3>
    <label>Card number</label>
      <input/>
      <Grid item style={{display: 'inline'}}>
          <Tooltip disableFocusListener disableTouchListener title="
              this input does nothing as this project is for education purposes only 
              and does not send/use any credit card information">
            <button style={{backgroundColor: 'rgba(255,255,255,0)', color: 'white', border: 'none'}}>?</button>
          </Tooltip>
    </Grid>
    <button onClick={pay} className='pay-button'>
        pay
    </button>
    {success !== '' ?
      success ? 
      <><br/><p style={{color: 'lightgreen'}}>Payment successful</p>
      <p>redirecting...</p>
      </>
      : <p style={{color:'red'}}>error in payment</p>
    : ''}</div>
    : 
    <>
    <h4>You must login in order to pay</h4>
    <Link to='/login'>Login</Link> / <Link to='/signup'>Signup</Link>
    </>
  }
      
    
    </>
  )
  }

