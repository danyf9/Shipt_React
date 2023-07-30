import React, { useContext, useEffect, useState } from 'react'
import './ItemStyle.css'
import { AppContext } from '../../App';
import axios from 'axios';

export default function ItemBox(props) {

    const {setItem, setCart, API_URL, AWS_URL, nav} = useContext(AppContext)
    const [source, setSource] = useState('')

    const image = async ()=>{
      try{
      const response = await axios.post(
        `${API_URL}/image/0`,
        {headers: {'content-type': 'application/json'},
          data: props.item.id
    }
    )
    console.assert(response.status === 200)
    setSource(response.data)
  }
  catch(error){
    console.log(error);
  }
    }


    useEffect(()=>{
      image();
      // eslint-disable-next-line
    },[])

  return (
    <>
    <div className='item-box'
    style={{border: 'black solid 0.2rem'}}
    >
      <div onClick={()=>{setItem(props.item); nav('/item/'+props.item.id)}}
      style={{display: 'flex', flexDirection: 'column'}}
      >
      <img src={
        source !== '' || undefined ?
        `${AWS_URL}/${source}`
      : ''
      } alt=''
      style={{maxHeight:'10rem', maxWidth: '10rem'}}
      />
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
    <button className='block'
            onClick={()=>{setCart((prev)=>{return [...prev, props.item]});
            }}
            >
        add to cart +
        </button>
    </div>
    </>
  )
}

