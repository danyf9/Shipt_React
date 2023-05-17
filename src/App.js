import { useState, createContext, useEffect } from 'react';
import SiteRoutes from './components/SiteRoutes Component/SiteRoutes';
import BasicNavbar from './components/Navbar Component/BasicNavbar'
import './App.css'

export const AppContext = createContext(null)

function App() {
  const [userLogin, setUserLogin] = 
    useState((localStorage.token && localStorage.token!=="undefined") ? true : false);
  // const [userInfo,setUserInfo] = useState()
    const [darkmode, setDarkmode] = useState(true)

    useEffect(()=>{
      if (darkmode)
      {document.body.style.backgroundColor = "black"; document.body.style.color = "white"}
        else{document.body.style.backgroundColor = "rgb(250,250,250)"; document.body.style.color = "black"}
    },[darkmode])




  return (
    <>
    <AppContext.Provider value={{
      userLogin,setUserLogin, 
      darkmode, setDarkmode}}>
    <BasicNavbar/>
    <SiteRoutes/>
    </AppContext.Provider>
    </>
  );
}

export default App;
