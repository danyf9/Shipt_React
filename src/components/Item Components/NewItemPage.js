import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import Comments from '../Comment component/Comments'
import ItemBox from './ItemBox'
import './ItemPageStyle.css'

export default function NewItemPage() {
  
    const {item, getItem, setCart, API_URL, AWS_URL, username} = useContext(AppContext)
    
    const [images, setImages] = useState([])
    const [items, setItems] = useState([])
    const [largeImage, setLargeImage] = useState('')
    const [isWishListed, setIsWishListed] = useState(false)
    
    const getImages = async ()=>{
      try{
        const response = await axios.post(
            `${API_URL}/image`,
            {headers: {'content-type': 'application/json'},
              data: window.location.pathname.replace('/item/', ''),
        }
        )
        console.assert(response.status === 200)
        setImages(response.data)
        setLargeImage(response.data[0])
      }
    catch(error){
      console.log(error);
    }
  }


    const getItems = async ()=>{
        try{
        const response = await axios.get(`${API_URL}/home-items`)
        setItems(response.data)
    }
    catch(error){
        console.log(error);
    }
}

const isItemWishListed = async ()=>{
  try{
  const response = await axios.get(`${API_URL}/WL/${username}/${item.id}`)
  console.assert(response.status === 200)
  setIsWishListed(response.data)
}
catch(error){
  console.log(error);
}}

const setWishList = async ()=>{
  try{
  const response = await axios.post(`${API_URL}/WL/${username}/${item.id}`,
  {data: isWishListed})
  console.assert(response.status === 200)
  setIsWishListed(response.data)
}
  catch(error){
    console.log(error);
  }
}


    useEffect(()=>{
      getItem()
      getItems()
      getImages()      
      // eslint-disable-next-line
    },[window.location.pathname])

    useEffect(()=>{
      if(username && item.id !== undefined){
        isItemWishListed()}
      // eslint-disable-next-line
    },[username])
  
    return (
    <>{item.id !== undefined ? <>
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <div style={{maxWidth: '60%', marginLeft: '20%'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <div>
            <div style={{marginTop: '7rem', textAlign: 'center'}}>
        <h3 style={{marginLeft: '1rem'}}
        >{item.name}</h3>
        <h5 style={{marginLeft: '1rem'}}
        >{item.price}$</h5>            
        <div className='description'>{item.description}</div><br/>
            </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
          <button style={{backgroundColor: 'black', color: 'white'}}
            onClick={()=>{setCart((prev)=>{return [...prev, item]})}}
            >
        add to cart 🛒
        </button>
        <button style={{backgroundColor: 'black', color: 'white', maxHeight: 'fit-content'}}
        onClick={()=>{setWishList()}}
        >
          {isWishListed ? 'remove from wish list' : 'add to wish list 🧡'}
          </button>
          </div>
        </div>
        <img className='img' src={largeImage ?`${AWS_URL}/${largeImage}` : ''} alt='' style={{maxHeight: '18rem', maxWidth: '18rem'}}/>
        <div>
          {images.map((image, index)=>{
          return <img className='img' key={index} src={`${AWS_URL}/${image}`} alt='' 
          style={{display: 'block', maxHeight: '5rem', maxWidth: '5rem', marginRight: '1rem'}}
          onClick={()=>{setLargeImage(`${images[index]}`)}}
          />
        })}
          </div>
          </div>
          <Comments item={item.id}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', position:'absolute',right: '0'}}>
        {items.map((item, index)=>{
          return <ItemBox item={item} key={index} style={{width: '20rem'}}/>
        })}</div></div></>
      : username && <div style={{textAlign: 'center'}}>
        <h1>404 Error</h1>
        <p>{item.error}</p>
        <img src={largeImage ?`${AWS_URL}/${largeImage}` : ''} alt='' style={{maxHeight: '18rem', maxWidth: '18rem'}}/>
        </div>
      }
    </>
  )
}
