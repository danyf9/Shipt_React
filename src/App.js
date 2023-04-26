import { useState, createContext } from 'react';
import SiteRoutes from './components/SiteRoutes Component/SiteRoutes';

export const AppContext = createContext(null)

function App() {
  const [userLogin, setUserLogin] = 
    useState((localStorage.token && localStorage.token!=="undefined") ? true : false);
  return (
    <>
    <AppContext.Provider value={{userLogin,setUserLogin}}>
    <SiteRoutes/>
    </AppContext.Provider>
    </>
  );
}

export default App;
