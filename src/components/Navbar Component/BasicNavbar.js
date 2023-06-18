import React from 'react'
import "./BasicNavbar.css"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { useContext } from 'react';
// import Darkmode from './Darkmode.png'
import logo from './Logo.png'
import ShoppingCart from '../Shopping cart component/ShoppingCart';

export default function BasicNavbar() {

  const path = window.location.pathname;
  const {userLogin, setUserLogin} = useContext(AppContext)
  const nav = useNavigate()

  

  return (
    <>
     <nav className='navbar'>
        <img src={logo}
        alt=''
        className='logo'
        onClick={()=>{nav('/home')}}
        />

      <ul>

        <li className={path === "/items" ? "active" : ""}>
          <button onClick={()=>{nav('/items')}}>Items</button>
        </li>
        {userLogin ? <></> :
        <li className={path === "/signup" ? "active" : ""}>
          <button onClick={()=>{nav('/signup')}}>Signup</button>
        </li>}
        {!userLogin ?
        <li className={path === "/login" ? "active" : ""}>
          <button onClick={()=>{nav('/login')}}>Login</button>
        </li>
        :   <li><button 
        onClick={()=>{
          localStorage.removeItem("token");
          localStorage.removeItem('userInfo');
          setUserLogin(false);
        nav('/login')}}> Logout </button></li>}


          {/* <li>
            <img onClick={()=>{setDarkmode((prev)=>{return !prev})}}
            // style={darkmode ? {borderLeftColor: 'green', borderTopColor: 'green'}:
            // {borderLeftColor: 'red', borderTopColor: 'red'}}
            style={ darkmode ? {backgroundColor: "white",}: {backgroundColor: 'lightgray'}}
            src={Darkmode} alt='stt'
            className='darkmode'
            />
          </li> */}

          <li>
          <ShoppingCart/>
          </li>
          <li>
            <form>
              <input style={{backgroundColor: 'inherit', marginBottom: '10px'}}/>
              <button>
              🔎
              </button>
            </form>
          </li>

      </ul>

     </nav>
    </>
  )
} 