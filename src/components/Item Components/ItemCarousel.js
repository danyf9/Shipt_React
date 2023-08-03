import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { AppContext } from '../../App';
import axios from 'axios';

export default function ItemCarousel() {

    const {API_URL, AWS_URL, nav} = useContext(AppContext)
    const [items, setItems] = useState([])
    const [images, setImages] = useState([])

    const getItems = async ()=>{
        try{
        const itemResponse = await axios.get(`${API_URL}/home-items`)
        setItems(itemResponse.data)
        for(let i=0; i<itemResponse.data.length; i++){
            const imageResponse = await axios.post(`${API_URL}/image`,
            {data: itemResponse.data[i].id})
            setImages((prev)=>{return [...prev, imageResponse.data[0]]})
        }
    }
    catch(error){
        console.log(error);
    }
}

    useEffect(()=>{
        getItems()
        // eslint-disable-next-line
    },[])


  return (
    <>
    <Carousel style={{width: '20rem', height: '22rem'}} 
    interval={20000} fade='True' variant='light'>
    {items.map((item, index)=>{
      return <Carousel.Item key={index} onClick={()=>{nav(`/item/${item.id}`)}}>
        <img src={images.length > 0 ?`${AWS_URL}/${images[index]}` : ''} alt=''
        style={{maxHeight: '70%', maxWidth: '70%', marginLeft: '15%', marginTop: '10%'}}
        />
        <Carousel.Caption>
          <h3 style={{textShadow: '1px 1px 2px black', position: 'relative', left: '0'}}>{item.name}</h3>
          <p style={{textShadow: '1px 1px 2px black', position: 'relative', left: '0'}}>{item.price}$</p>
        </Carousel.Caption>
      </Carousel.Item>})}
    </Carousel>
    </>
  );
}