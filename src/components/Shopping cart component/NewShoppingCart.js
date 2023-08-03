import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../../App';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';


export default function NewShoppingCart() {

  const {cart, setCart, getItem, visCart, setVisCart,nav} = useContext(AppContext)
  const [sum,setSum] = useState(cart.reduce((partialSum, a) => partialSum + a.price, 0))

  const  cartView = ()=>{
    let counts = {}
    if (cart.length){
    cart.sort((first, second)=>{return first.id - second.id}).forEach((item)=>{counts[JSON.stringify(item)]= (counts[JSON.stringify(item)] || 0) + 1; })}
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
      <NavDropdown title={<p style={{color: 'white', display: 'inline'}}>🛒</p>}  id="navbarScrollingDropdown" align='end'
      >
        { cart.length ?
        visCart.map((count, index)=>
        {
          return <NavDropdown.Item key={index}>
          <span id={index}
          onClick={()=>{nav(`/item/${JSON.parse(count[0]).id}`); getItem()}}
          >{count[1]} {JSON.parse(count[0]).name}s -
          {JSON.parse(count[0]).price * count[1]}$&nbsp;</span>
          
          <span>
          <Button onClick={()=>{setCart((prev)=>{return [...prev, JSON.parse(count[0])]});setVisCart(Object.entries(cartView()))}}
          variant="dark">+</Button>
          <Button onClick={()=>{ removeItem(count[0])}}
          variant="dark">-</Button>
          </span>
          </NavDropdown.Item>})
          : 'No items in shopping cart'
          }
          {cart.length ? <NavDropdown.Item
          onClick={()=>{nav('/pay-list')}}>
            Total sum: {sum}$ <br/>
          </NavDropdown.Item> : <></>}
      </NavDropdown>
    </>
  )
}
