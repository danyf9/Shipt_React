import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteRoutes from './components/SiteRoutes Component/SiteRoutes';
// import BasicNavbar from './components/Navbar Component/BasicNavbar'
import NewNavbar from './components/Navbar Component/NewNavbar'
import axios from 'axios';
import './App.css'
export const AppContext = createContext(null)

function App() {

    const nav = useNavigate()

    const [userLogin, setUserLogin] = 
    useState((localStorage.token && localStorage.token!==undefined) ? true : false);
    const [username,setUsername] = useState('')
    const [item, setItem] = useState('')
    const [cart, setCart] = useState(
      (localStorage.cart && localStorage.cart !== undefined && localStorage.cart !== []) ?
      JSON.parse(localStorage.cart)
      : [])
    const [visCart, setVisCart] = useState([])
    const [search, setSearch] = useState('')
    const [socketClient, setSocketClient] = useState('')

    const API_URL = window.location.host === 'localhost:3000'
    ? 'http://127.0.0.1:8000/API'
    : 'http://' + window.location.host + '/API';

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
      }
      } 

      const getItem = async ()=>{
        try{
        const response = await axios.get(`
        ${API_URL}/items?item_id=${window.location.pathname.replace('/item/','')}`)
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
      document.body.style.backgroundColor = 'black'
      document.body.style.color = 'white'
      // eslint-disable-next-line
    },[])



  return (
    <>
    <AppContext.Provider value={{
      userLogin,setUserLogin, 
      item, setItem,
      cart, setCart,
      visCart, setVisCart,
      getItem, 
      username, setUsername,
      socketClient, setSocketClient,
      search, setSearch,
      API_URL, AWS_URL,
      nav
      }}>
    {/* <BasicNavbar/> */}
    <NewNavbar/>
    <SiteRoutes/>
    </AppContext.Provider>
    </>
  );
}

export default App;
