import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../../App';
import { Dropdown } from 'react-bootstrap';


export default function ShoppingCart() {

  const {cart, setCart, getItem, visCart, setVisCart,nav} = useContext(AppContext)
  const [sum,setSum] = useState(cart.reduce((partialSum, a) => partialSum + a.price, 0))

  const  cartView = ()=>{
    let counts = {}
    if (cart.length){
    cart.sort((first, second)=>{return first.id - second.id}).forEach((item)=>{counts[JSON.stringify(item)]= (counts[JSON.stringify(item)] || 0) + 1; })}
    localStorage.visCart = JSON.stringify(counts)
    return counts
}

const removeItem = (item)=>{
  for(let i = 0; i< cart.length; i++){
    if(JSON.parse(item).id === cart[i].id){
      setCart((prev)=>{prev.splice(i, 1); return prev})
      localStorage.setItem('cart', JSON.stringify(cart));
      setVisCart(Object.entries(cartView()));
      return
    }
  }
}

useEffect(()=>{
  setVisCart(Object.entries(cartView()))
}
// eslint-disable-next-line
,[cart])

useEffect(()=>{
  setSum(cart.reduce((partialSum, a) => partialSum + a.price, 0))
// eslint-disable-next-line
},[visCart])

  return (
    <>
    <Dropdown >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      🛒
      </Dropdown.Toggle>
      <Dropdown.Menu style={{backgroundColor: 'black', color: 'white'}}>
        { cart.length ?
        visCart.map((count, index)=>
        {
          return <Dropdown.Item key={index}>
          <div id={index} className='Item'
          onClick={()=>{nav(`/item/${JSON.parse(count[0]).id}`); getItem()}}
          >{count[1]} {JSON.parse(count[0]).name}s -
          {JSON.parse(count[0]).price * count[1]}$</div>
          
          <div className='plus-minus'>
          <button onClick={()=>{setCart((prev)=>{return [...prev, JSON.parse(count[0])]});setVisCart(Object.entries(cartView()))}}
          >+</button>
          <button onClick={()=>{ removeItem(count[0])}}
          >-</button>
          </div>
          </Dropdown.Item>})
          : 'No items in shopping cart'
          }
          <Dropdown.Item onClick={()=>{nav('/pay-list')}}>
            Total sum: {sum}$ <br/>
          </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}
