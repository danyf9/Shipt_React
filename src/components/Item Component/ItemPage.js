import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import Comments from '../Comment component/Comments'

export default function ItemPage() {
    const {item, getItem, setCart, API_URL} = useContext(AppContext)
    
    const [images, setImages] = useState([])
    const [largeImage, setLargeImage] = useState('')
    
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


    useEffect(()=>{
      getItem()
      getImages()
      // eslint-disable-next-line
    },[window.location.pathname])

  return (
    <>
    <div style={{display: 'table', height: '400px', overflow: 'hidden'}}>
        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div>
        <h3 style={{marginLeft: '1rem',}}
        >{item.name}</h3>
        <h5 style={{marginLeft: '1rem'}}
        >{item.price}$</h5>
            </div>
            {item.description} <br/><br/>
            <button style={{backgroundColor: 'black', color: 'white'}}
            onClick={()=>{setCart((prev)=>{return [...prev, item]})}}
            >
        add to cart +
        </button>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
        <img src={largeImage ?`${API_URL}/${largeImage}` : ''} alt='' style={{maxHeight: '20rem', maxWidth: '20rem'}}/>
          </div>          
          <div>
          {images.map((image, index)=>{
          return <img key={index} src={`${API_URL}/${image}`} alt='' 
          style={{display: 'block', maxHeight: '5rem', maxWidth: '5rem'}}
          onClick={()=>{setLargeImage(`${images[index]}`); console.log(images[index]);}}
          />
        })}
          </div>
        
        </div>
    </div>
    <Comments item={item}/>
        </>
  )
}
