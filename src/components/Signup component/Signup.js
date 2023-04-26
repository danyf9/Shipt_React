import React from 'react'
import { useState, useContext } from 'react'
import { AppContext } from '../../App'

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [password1Errors, setPassword1Errors] = useState("")
    const [password2Errors, setPassword2Errors] = useState("")
    const [usernameErrors, setUsernameErrors] = useState("")
    const api = "http://127.0.0.1:8000/API/signup"
    const {userLogin, setUserLogin} = useContext(AppContext)

    const signup = (e)=>{e.preventDefault()
        if(username === ""){
            setUsernameErrors("Username not entered")
            return
        }
        else{
            setUsernameErrors("")
        }
        if(password1 === ""){
            setPassword1Errors("Password not entered")
            return 
        }
        else{
            setPassword1Errors("")
        }
        if(password2 === ""){
            setPassword2Errors("Password not entered")
            return 
        }
        else{
            setPassword2Errors("")
        }
        if(password1 !== password2){
            setPassword1Errors("Passwords do not match")
            setPassword2Errors("Passwords do not match")
            return
        }
        else{
            setPassword1Errors("")
            setPassword2Errors("")
        }
        fetch(api, {method: "POST",
            body: JSON.stringify({username: username, password: password1, email: email}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((res)=>{
            if(res.status !== 200){
                throw new Error("Error")
            }
            res.json().then(
                (resJson)=>{
                    if(resJson.status==="success"){
                        localStorage.setItem("token", resJson.token)
                        setTimeout(()=>{setUserLogin(true); window.location = "/home"},500)
                    }
                })}).catch((error)=>{console.log(error)})}
  return (
    <>
    {!userLogin ?
    <form onChange={signup}> 
        <label htmlFor='username'>Username</label><br/>
        <input id="username" type="" value={username}
        onChange={(e)=>{setUsername(e.target.value)}}/><br/>
        {usernameErrors !== "" && <><p style={{color: "red"}}>{usernameErrors}</p></>}

        <label htmlFor='password'>Password</label><br/>
        <input type="password" id="password" value={password1}
        onChange={(e)=>{setPassword1(e.target.value)}}/><br/>
        {password1Errors!== "" && <><p style={{color: "red"}}>{password1Errors}</p></>}

        <label htmlFor='confirmPassword'>Confirm password</label><br/>
        <input type="password" id="confirmPassword" value={password2}
        onChange={(e)=>{setPassword2(e.target.value)}}/><br/>
        {password2Errors!== "" && <><p style={{color: "red"}}>{password2Errors}</p></>}

        <label htmlFor='email'>Email</label><br/>
        <input type="email" id="email" value={email}
        onChange={(e)=>{setEmail(e.target.value)}}/>
        <br/>
        <input type="submit" value="Submit"/>

    </form>
    : <p>User has already logged in</p>}
    </>
  )
}