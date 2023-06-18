import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router'
import { AppContext } from '../../App'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErrors, setPasswordErrors] = useState("")
    const [usernameErrors, setUsernameErrors] = useState("")
    const nav = useNavigate()
    const api = "http://127.0.0.1:8000/API/login"
    const {userLogin, setUserLogin, setUserInfo} = useContext(AppContext)

    const login = (e)=>{
        e.preventDefault()
      if(username === ""){
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
  fetch(api, {method: "POST",
  body: JSON.stringify({username: username, password: password}),
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
      setUserInfo({username: username})
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
        <form onSubmit={login}>
        <label htmlFor='username'>Username</label><br/>
        <input id="username" value={username}
        onChange={(e)=>{setUsername(e.target.value)}}/><br/>
        {usernameErrors !== "" && <><p style={{color: "red"}}>{usernameErrors}</p></>}

        <label htmlFor='password'>Password</label><br/>
        <input type="password" id="password" value={password}
        onChange={(e)=>{setPassword(e.target.value)}}/><br/>
        {passwordErrors !== "" && <><p style={{color: "red"}}>{passwordErrors}</p></>}

        <input type="submit" value="Login"/>        
        </form>
        : <p>User has already logged in</p>}
    </>
  )
}
