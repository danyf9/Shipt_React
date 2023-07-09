import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'

export default function Pay() {
    const {cart, API_URL, userLogin} = useContext(AppContext)
    const [success, setSuccess] = useState('')
    
    const pay = async ()=>{
      try{
        const response = await axios.post(
            `${API_URL}/shipment`,
            {headers: {'content-type': 'application/json'},
              data: cart,
              user: localStorage.token,
        }
        )
        console.assert(response.status === 200)
        if(response.data === 'ok'){
          setSuccess(true)
        }
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
    {userLogin ? <>
    <label>Card number</label>
      <input/>
    <button onClick={pay}>
        pay
    </button>
    {success !== '' ?
      success ? 
      <p style={{color: 'lightgreen'}}>Payment successful</p> 
      : <p style={{color:'red'}}>error in payment</p>
    : ''}</>
    : <h4>You must login in order to pay</h4>
  }
      
    
    </>
  )
  }

