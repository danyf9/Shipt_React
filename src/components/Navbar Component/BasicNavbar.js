import React from 'react'
import "./BasicNavbar.css"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { useContext } from 'react';
import Darkmode from './Darkmode.png'
import up from './up.png'

function Navbar() {

  const path = window.location.pathname;
  const {userLogin, setUserLogin, setDarkmode, darkmode, getItems} = useContext(AppContext)
  const nav = useNavigate()

  return (
    <>
     <nav className='navbar'>
      <a href='/home' className='site-title'>Site-Name</a>

      <ul>

        <li className={path === "/items" ? "active" : ""}>
          <button onClick={()=>{getItems();nav('/items')}}>Items</button>
        </li>
        {userLogin ? <></> :
        <li className={path === "/signup" ? "active" : ""}>
          <button onClick={()=>{nav('/signup')}}>Signup</button>
        </li>}
        {!userLogin ?
        <li className={path === "/login" ? "active" : ""}>
          <button onClick={()=>{nav('/login')}}>Login</button>
        </li>
        :   <li><button onClick={()=>{localStorage.removeItem("token");setUserLogin(false);
        nav('/login')}}> Logout </button></li>}

          <li>
            <button onClick={()=>{
              if(window.location.pathname !== '/file')
              {nav('/file')}
              else
              {nav('/dropfile')}
              }}
              style={path === '/file' ? {borderLeftColor: 'white'}:
           path === '/dropfile' ? {borderTopColor: 'white'} : {}}
              >
              <img src={up} alt='upload'/>
            </button>
          </li>

          <li>
            <button onClick={()=>{setDarkmode((prev)=>{return !prev})}}
            // style={darkmode ? {borderLeftColor: 'green', borderTopColor: 'green'}:
            // {borderLeftColor: 'red', borderTopColor: 'red'}}
            style={ darkmode ? {backgroundColor: "white",}: {backgroundColor: 'lightgray'}}
            >
              <img src={Darkmode} alt='stt'/></button>
          </li>

      </ul>

     </nav>
    </>
  )
}

export default Navbar