import React, { useContext } from 'react'
import { AppContext } from '../App'
export default function Welcome() {
  const {userInfo} = useContext(AppContext)
  return (
    <div>Welcome {userInfo.username}</div>
  )
}
