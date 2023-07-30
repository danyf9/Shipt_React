import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import Comments from '../Comment component/Comments'
import ItemBox from './ItemBox'

export default function ItemPage() {
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
      if(username){
      isItemWishListed()}
      // eslint-disable-next-line
    },[username, window.location.pathname])

  return (
    <>
    <div style={{display: 'table', height: '400px', overflow: 'hidden'}}>
        <div style={{display: 'table-cell', verticalAlign: 'top'}}>
            <div style={{marginTop: '7rem'}}>
        <h3 style={{marginLeft: '1rem'}}
        >{item.name}</h3>
        <h5 style={{marginLeft: '1rem'}}
        >{item.price}$</h5>
            </div>
            {item.description} <br/><br/>
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
          </button></div>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
        <img src={largeImage ?`${AWS_URL}/${largeImage}` : ''} alt='' style={{maxHeight: '20rem', maxWidth: '20rem'}}/>
        <Comments item={item}/>

          </div>          
          <div>
          {images.map((image, index)=>{
          return <img key={index} src={`${AWS_URL}/${image}`} alt='' 
          style={{display: 'block', maxHeight: '5rem', maxWidth: '5rem', marginRight: '1rem'}}
          onClick={()=>{setLargeImage(`${images[index]}`)}}
          />
        })}
          </div>
        <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        {items.map((item, index)=>{
          return <ItemBox item={item} key={index}/>
        })}</div>

        </div>
        </div>
    </div>
        </>
  )
}
