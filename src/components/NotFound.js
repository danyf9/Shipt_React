import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{textAlign: 'center'}}>
        <h1>404 Error</h1>
        <Link to='home'>return to safety</Link>
        </div>
  )
}
