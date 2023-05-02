import { useState, createContext, useEffect } from 'react';
import SiteRoutes from './components/SiteRoutes Component/SiteRoutes';
import BasicNavbar from './components/Navbar Component/BasicNavbar'

export const AppContext = createContext(null)

function App() {
  const [userLogin, setUserLogin] = 
    useState((localStorage.token && localStorage.token!=="undefined") ? true : false);
    const [darkmode, setDarkmode] = useState(true)

    useEffect(()=>{
      if (darkmode)
      {document.body.style.backgroundColor = "black"; document.body.style.color = "white"}
        else{document.body.style.backgroundColor = "rgb(250,250,250)"; document.body.style.color = "black"}
    },[darkmode])

    const [items, setItems] = useState([])

    const api = 'http://127.0.0.1:8000/API/items'
    const options = {
    method: "GET",
    headers: {'Content-type': 'application/json; charset=UTF-8'}
    }
    const getItems = ()=>{
        fetch(api, options).then((res)=>{res.json().then((resJson)=>{setItems(resJson)})})
    }

  return (
    <>
    <AppContext.Provider value={{
      userLogin,setUserLogin, 
      darkmode, setDarkmode,
      items, getItems}}>
    <BasicNavbar/>
    <SiteRoutes/>
    </AppContext.Provider>
    </>
  );
}

export default App;
