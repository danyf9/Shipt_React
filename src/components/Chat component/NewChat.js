import React, { useState } from 'react'
import './ChatStyle.css'

export default function NewChat() {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
  {!isOpen ?
 <button class="open-button" onClick={()=>{setIsOpen(true)}}>Chat</button>
:
<div className="chat-popup" id="myForm">
  <div className='form-container'>
    <h1>Chat</h1>

    <textarea placeholder="Type message.." name="msg" required></textarea>

    <button type="submit" class="btn">Send</button>
    <button type="button" class="btn cancel" onClick={()=>{setIsOpen(false)}}>Close</button>
</div>
</div>}
    </>
  )
}
