import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import './ProfileStyle.css'
import { Link } from 'react-router-dom'

export default function Profile() {
    
    const {username, API_URL} = useContext(AppContext)
    const [action, setAction] = useState('get')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    
    const profile = async (action)=>{
        try{
        const response =  await axios.post(`${API_URL}/profile`,
        {data: {action: action, token: localStorage.getItem('token'), 
        first_name: firstName, last_name: lastName, email: email}}
        )
        console.assert(response.status === 200)
        setFirstName(response.data.first_name)
        setLastName(response.data.last_name)
        setEmail(response.data.email)
        setStatus(response.data.status)
        if(action === 'set' && response.data.status === 'Success'){
        setTimeout(onchange, 2000)}
        }
        catch(error){
            console.log(error);
        }
    }

    const onchange = ()=>{
        setAction((prev)=>{
            if(prev === 'get'){return 'set'}else{
                if(prev === 'set'){setStatus('');return 'get'}
            }
            
        })}

    useEffect(()=>{
        profile('get')
        // eslint-disable-next-line
    },[])

    return (
    <>
    {action === 'get' ? <>
        <div className='view'>
        <h3>My profile</h3><br/>
        Username: {username}<br/>
        Full name: {firstName} {lastName}<br/>
        Email: {email}<br/><br/>
        <button onClick={onchange}>Edit</button><br/>
        <Link to='/shipments' className='link'>Previous purchases</Link>
        </div>
        
    </>
    : action === 'set' && <div className='set'>
    <h3>Edit my profile</h3>
    <span style={{marginLeft: '1rem'}}>Username: @{username} <p className='username'>
        {'['}Username cannot be changed{']'}</p>
        </span><br/><br/>
        <form onSubmit={(e)=>{
            e.preventDefault();
            if(firstName === '' || lastName === '' || email === ''){
                setStatus('one or more of the field is invalid')
                return
            }
            profile('set')}} style={{marginLeft: '1rem'}}>
        <label htmlFor='first-name'>First name:</label>
        <input id='first-name' onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/><br/><br/>

        <label htmlFor='last-name'>Last name:</label>
        <input id='last-name' onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/><br/><br/>

        <label htmlFor='email' style={{marginRight: '3rem'}}>Email:</label>
        <input id='email' type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br/><br/>
        
        {status && status === 'Profile updated successfully' 
        ? <p style={{color: 'lightgreen'}}>{status}</p> 
        : <><p className='username'>{status}</p><br/><br/></>}

        <input type='submit' value='Save' className='set-submit'/>
    </form>
    </div>}
    </>
  )
}
