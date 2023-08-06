import React from 'react'
import { Link } from 'react-router-dom'
import './MoreStyle.css'

export default function More() {
  return (
    <>
    <h6 className='header'>Site links</h6>
    <div className='footer'>
    <div className='footer-column'>
      <Link className='link-row'>About us</Link>
      <Link className='link-row'>Our leadership</Link>
      <Link className='link-row'>History</Link>
    </div>
    <div className='footer-column'>
      <Link className='link-row' to='/signup'>Join</Link>
      <Link className='link-row' to='/items'>Buy</Link>
      <Link className='link-row'>Contact us</Link>
    </div>
    <h6 className='footer-bottom'>Shipt 2023©</h6>
    </div>
    </>
  )
}
