import React from 'react'
import { useState, useContext } from 'react'
import { AppContext } from '../../App'

export default function Signup() {
    const [userName, setUserName] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [nameErrrors, setNameErrors] = useState("")
    const [password1Errors, setPassword1Errors] = useState("")
    const [password2Errors, setPassword2Errors] = useState("")
    const [usernameErrors, setUsernameErrors] = useState("")
    const [terms, setTerms] = useState(false)
    const {userLogin, setUserLogin, setUsername, API_URL} = useContext(AppContext)

    const signup = (e)=>{e.preventDefault()
        if(!firstName || !lastName){
            setNameErrors('please enter a valid name')
        }
        else{
            setNameErrors("")
        }
        if(userName === ""){
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
        fetch(`${API_URL}/signup`, {method: "POST",
            body: JSON.stringify({username: userName, password: password1, email: email,
            first_name: firstName, last_name: lastName}),
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
                        setUsername(userName)
                        setTimeout(()=>{setUserLogin(true); window.location = "/home"},500)
                    }
                })}).catch((error)=>{console.log(error)})}
  return (
    <>
    {!userLogin ?
    <form onSubmit={signup}> 
        <label htmlFor='username'>Username</label><br/>
        <input id="username" type="" value={userName}
        onChange={(e)=>{setUserName(e.target.value)}}/><br/>
        {usernameErrors !== "" && <><p style={{color: "red"}}>{usernameErrors}</p></>}

        <label htmlFor='firstname'>First name</label><br/>
        <input id="firstname" type="" value={firstName}
        onChange={(e)=>{setFirstName(e.target.value)}}/><br/>
        {nameErrrors !== "" && <><p style={{color: "red"}}>{nameErrrors}</p></>}

        <label htmlFor='lastname'>Last name</label><br/>
        <input id="lastname" type="" value={lastName}
        onChange={(e)=>{setLastName(e.target.value)}}/><br/>
        {nameErrrors !== "" && <><p style={{color: "red"}}>{nameErrrors}</p></>}

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
        <label>
            <input type="checkbox" checked={terms} onChange={()=>{setTerms((prev)=>{return !prev})}}/>
            &nbsp; I accept the&nbsp;
            <a href={'http://' + window.location.host + '/terms-of-service'} target='blank'>terms of service</a>
        </label><br/>
        <input type="submit" value="Submit" disabled={!terms}/>

    </form>
    : <p>User has already logged in</p>}
    </>
  )
}