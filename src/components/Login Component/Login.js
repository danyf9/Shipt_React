import React, {useContext, useState} from 'react'
import { AppContext } from '../../App'

export default function Login() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErrors, setPasswordErrors] = useState("")
    const [usernameErrors, setUsernameErrors] = useState("")
    const {userLogin, setUserLogin, setUsername, nav, API_URL} = useContext(AppContext)

    const login = (e)=>{
        e.preventDefault()
      if(userName === ""){
        setUsernameErrors("Username not entered")
        return
    }
    else{
        setUsernameErrors("")
    }
    if(password === ""){
      setPasswordErrors("Password not entered")
      return 
  }
  else{
      setPasswordErrors("")
  }
  fetch(`${API_URL}/login`, {method: "POST",
  body: JSON.stringify({username: userName, password: password}),
  headers: {
      'Content-type': 'application/json; charset=UTF-8'
  }}).then((res)=>{
    if(res.status !== 200){
      setPasswordErrors("an unknown error has occured. please try again.")
      throw new Error("Error")
}
  res.json().then(
    (resJson)=>{
      localStorage.setItem("token", resJson.token)
      if (localStorage.token !== undefined){
      nav('/')
      setUserLogin(true)
      setUsername(userName)
    }
      else{
        console.log("error")
        localStorage.removeItem("token")
      }
    })}).catch((error)=>{console.log(error);
      setPasswordErrors("an unknown error has occured. please try again.");
  })}

  return (
    <>
    {!userLogin ?
        <><form onSubmit={login}>
        <label htmlFor='username'>Username</label><br/>
        <input id="username" value={userName}
        onChange={(e)=>{setUserName(e.target.value)}}/><br/>
        {usernameErrors !== "" && <><p style={{color: "red"}}>{usernameErrors}</p></>}

        <label htmlFor='password'>Password</label><br/>
        <input type="password" id="password" value={password}
        onChange={(e)=>{setPassword(e.target.value)}}/><br/>
        {passwordErrors !== "" && <><p style={{color: "red"}}>{passwordErrors}</p></>}

        <input type="submit" value="Login"/>        
        </form>
        </>
        : <p>User has already logged in</p>}
    </>
  )
}
