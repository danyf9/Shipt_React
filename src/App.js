import { useState, createContext, useEffect } from 'react';
import SiteRoutes from './components/SiteRoutes Component/SiteRoutes';
import BasicNavbar from './components/Navbar Component/BasicNavbar'
// import NewNavbar from './components/Navbar Component/NewNavbar'
import axios from 'axios';
import './App.css'
export const AppContext = createContext(null)

function App() {

 


    const [userLogin, setUserLogin] = 
    useState((localStorage.token && localStorage.token!==undefined) ? true : false);
    const [userInfo,setUserInfo] = useState(
      (localStorage.userInfo && localStorage.userInfo!==undefined) ? JSON.parse(localStorage.userInfo)
      : {})
    const [darkmode, setDarkmode] = useState(true)
    const [item, setItem] = useState('')
    const [cart, setCart] = useState(
      (localStorage.cart && localStorage.cart !== undefined && localStorage.cart !== []) ?
      JSON.parse(localStorage.cart)
      : [])

      const [socketClient, setSocketClient] = useState('')

      const getItem = async ()=>{
        try{
        const response = await axios.get(`
        http://127.0.0.1:8000/API/items?item_id=${window.location.pathname.replace('/item/','')}`)
        console.assert(response.status === 200)
        setItem(response.data)
        }
      catch(error){
        console.log(error);
      }
    }


    useEffect(()=>{
      if (darkmode)
      {document.body.style.backgroundColor = "black"; document.body.style.color = "white"}
        else{document.body.style.backgroundColor = "rgb(250,250,250)"; document.body.style.color = "black"}
    },[darkmode])

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },[userInfo])



  return (
    <>
    <AppContext.Provider value={{
      userLogin,setUserLogin, 
      darkmode, setDarkmode,
      item, setItem,
      cart, setCart,
      getItem, 
      userInfo, setUserInfo,
      socketClient, setSocketClient,
      }}>
    <BasicNavbar/>
    {/* <NewNavbar/> */}
    <SiteRoutes/>
    </AppContext.Provider>
    <button onClick={()=>{console.log(cart);}}>abc</button>
    <button onClick={()=>{setCart([])}}>reset</button>
    {/* {cart.length} */}
    </>
  );
}

export default App;
