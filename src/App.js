import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteRoutes from './components/SiteRoutes Component/SiteRoutes';
import NewNavbar from './components/Navbar Component/NewNavbar'
import axios from 'axios';
import './App.css'
import NewChat from './components/Chat component/NewChat';
export const AppContext = createContext(null)

function App() {

    const nav = useNavigate()

    const [userLogin, setUserLogin] = 
    useState((localStorage.token && localStorage.token!==undefined) ? true : false);
    const [username,setUsername] = useState('')
    const [item, setItem] = useState({})
    const [items, setItems] = useState([])
    const [dataSize, setDataSize] = useState(1)
    const [cart, setCart] = useState(
      (localStorage.cart && localStorage.cart !== undefined && localStorage.cart) ?
      JSON.parse(localStorage.cart)
      : [])
    const [visCart, setVisCart] = useState([])
    const [search, setSearch] = useState('')
    const [socketClient, setSocketClient] = useState('')

    const SERVER = window.location.host === 'localhost:3000'
    ? '127.0.0.1:8000'
    : window.location.host; 

    const API_URL = 'http://' + SERVER + '/API'

    const AWS_URL = 'https://shiptbucket.s3.eu-north-1.amazonaws.com'

      const getUser = async ()=>{
        try {
        const response = await axios.post(
          `${API_URL}/user`,
          {headers: {'content-type': 'application/json'},
          token: localStorage.getItem('token')
          })
        console.assert(response.status === 200)
        setUsername(response.data)
      }
      catch(error){
        console.log(error);
        setUserLogin(false)
        localStorage.removeItem('token')
      }
      } 

      const getItem = async ()=>{
        try{
        const response = await axios.get(`
        ${API_URL}/item?item_id=${window.location.pathname.replace('/item/','')}`)
        console.assert(response.status === 200)
        setItem(response.data)
        }
      catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
      if(userLogin){
      getUser()}
      document.body.className = 'body'
      // eslint-disable-next-line
    },[userLogin])



  return (
    <>
    <AppContext.Provider value={{
      userLogin,setUserLogin, 
      item, setItem,
      items, setItems,
      cart, setCart,
      visCart, setVisCart,
      getItem,
      dataSize, setDataSize,
      username, setUsername, getUser,
      socketClient, setSocketClient,
      search, setSearch,
      SERVER, API_URL, AWS_URL,
      nav
      }}>
    {/* <BasicNavbar/> */}
    <NewNavbar/>
    <SiteRoutes/>
    {username && <NewChat/>}
    </AppContext.Provider>
    </>
  );
}

export default App;
