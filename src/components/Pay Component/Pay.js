import React, { useContext } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'

export default function Pay() {
    const { cart } = useContext(AppContext)
    
    const pay = async ()=>{
        const response = await axios.post(
            'http://127.0.0.1:8000/API/shipment',
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
