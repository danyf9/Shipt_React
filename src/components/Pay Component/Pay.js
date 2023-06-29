import React, { useContext } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'

export default function Pay() {
    const {cart, API_URL} = useContext(AppContext)
    
    const pay = async ()=>{
        const response = await axios.post(
            `${API_URL}/shipment`,
            {headers: {'content-type': 'application/json'},
              data: cart,
              user: localStorage.token,
        }
        )
        console.assert(response.status === 200)
        console.log(response.data);
    }

    return (
    <>
    <button onClick={pay}>
        pay
    </button>
    </>
  )
}
