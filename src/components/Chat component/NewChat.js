import React, { useContext, useEffect, useRef, useState } from 'react'
import chat from './chat.png'
import { AppContext } from '../../App'
import './NewChatStyle.css'

export default function NewChat() {

    const {username, SERVER} = useContext(AppContext)

    const [isOpen, setIsOpen] = useState(false)
    const [texts, setTexts] = useState([])
    const bottomRef = useRef(null);

    useEffect(() => {
        if(isOpen && username){
        setTexts([{message: 'Welcome to the support chat', user: ''},
                  {message: 'Please wait for one of our staff to join', user: ''}])
        document.getElementById("send-button").onclick = ()=>{send(document.querySelector('#input').value)}
        document.getElementById("close-button").onclick = ()=>{
            document.removeEventListener('keydown', keyDownHandler);
              socketClient.close()
        }


        const keyDownHandler = event => {
    
          if (event.key === 'Enter') {
            event.preventDefault();
    
            send(document.querySelector('#input').value);

          }
        };
        document.addEventListener('keydown', keyDownHandler);
        
        const socketClient = new WebSocket(`ws://${SERVER}/ws?room=${username}&user=${username}`);

     const send = (data)=>{
      if(socketClient !== '' && document.querySelector('#input').value !== '')
        socketClient.send(JSON.stringify({ message: data }));
        document.querySelector('#input').value = ''
      }



        socketClient.onmessage = async (e) => {
          const data = await JSON.parse(e.data);
          setTexts((prev)=>{return [...prev, data.message]})
        }
        
        // eslint-disable-next-line
      }}, [isOpen, username])

      useEffect(()=>{bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })},[texts])

  return (
    <>
    {!isOpen ?
        <img src={chat} className='chat-img' alt='' onClick={()=>{setIsOpen(true)}}/>
    : <div className='chat-background'>
          <div className='chat-headline'>Costumer support</div>
            <div className='msg'>{texts.map((msg, index)=>{
                return <p className={msg.user === username ? 'from-me' : 'from-them'}
                ref={index === texts.length-1 ? bottomRef : null}
                key={index}>{msg.message}</p>})}
                    </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <textarea rows={2} className='msg-input' id='input'/>
            <button style={{color: 'white'}} className='send-button' id='send-button'
            >send</button>
            <button style={{color: 'white'}} className='close-button'
            onClick={()=>{setIsOpen(false)}}
            id='close-button'
            >X</button>
        </div>
    </div>}
    </>
  )
}
