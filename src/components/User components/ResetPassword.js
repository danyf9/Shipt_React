import React, { useContext, useState } from 'react'
import axios from 'axios'
import './ResetPasswordStyle.css'
import { AppContext } from '../../App'

export default function ResetPassword() {

    const {API_URL, nav} = useContext(AppContext)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [status, setStatus] = useState('')

    const password = async ()=>{
      try{
      const response = await axios.post(`${API_URL}/password`,
        {data: {p1: oldPassword, p2: newPassword1, token: localStorage.getItem('token')}})
        console.assert(response.status === 200)
        setStatus(response.data.status)
        if(response.data.status === 'Password reset successful'){
        setOldPassword('')
        setNewPassword1('')
        setNewPassword2('')
        setTimeout(()=>{nav('/profile')},2000)
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
    <div className='reset-password'>
    <h2 style={{textShadow: '1px 1px 2px black'}}>Reset password</h2><br/>
    <form onSubmit={(e)=>{
      e.preventDefault()
      if(oldPassword === '' || newPassword1 === '' || newPassword2 === ''){
        setStatus('Please fill all the fields')
        return
      }
      if(newPassword1 !== newPassword2){
        setStatus('Password and password confirmation fields do not match')
        return
      }
      password()
    }}>

    <label htmlFor='old-password' style={{marginRight: '1.5rem'}}>Old password:</label>
    <input id='old-password' type='password' onChange={(e)=>{setOldPassword(e.target.value)}} value={oldPassword}/><br/><br/>

    <label htmlFor='new-password-1'>New password:</label>
    <input id='new-password-1' type='password' onChange={(e)=>{setNewPassword1(e.target.value)}} value={newPassword1}/><br/><br/>

    <label htmlFor='new-password-2' className='confirm'>New password confirmation:</label>
    <input id='new-password-2' type='password' style={{marginLeft: '-7.5rem'}} onChange={(e)=>{setNewPassword2(e.target.value)}} value={newPassword2}/><br/><br/>

    {status && status === 'Password reset successful' 
        ? <p style={{color: 'lightgreen'}}>{status}</p> 
        : <><p className='error'>{status}</p><br/><br/></>}

    {status !== 'Password reset successful' ? 
        <input type='submit' value='Save' className='submit'/>
        : 'redirecting...'}
        </form></div>
    </>
  )
}
