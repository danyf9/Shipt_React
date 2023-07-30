import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { useRef } from 'react';

export default function Chat() {
    const {username} = useContext(AppContext)
    const [texts, setTexts] = useState([])
    const bottomRef = useRef(null);
    
          useEffect(() => {
            const button = document.getElementById("send-button");
            button.onclick = ()=>{send(document.querySelector('#input').value)}


            const keyDownHandler = event => {
        
              if (event.key === 'Enter') {
                event.preventDefault();
        
                send(document.querySelector('#input').value);

              }
            };
            document.addEventListener('keydown', keyDownHandler);
            
            const socketClient = new WebSocket(`ws://127.0.0.1:8000/ws?room=${username}&user=${username}`);        
    
         const send = (data)=>{
          if(socketClient !== '')
            socketClient.send(JSON.stringify({ message: data }));
            document.querySelector('#input').value = ''
          }



            socketClient.onmessage = async (e) => {
              const data = await JSON.parse(e.data);
              setTexts((prev)=>{return [...prev, data.message]})
            }

            return () => {
              document.removeEventListener('keydown', keyDownHandler);
              socketClient.close()
            };
            // eslint-disable-next-line
          }, []);

          useEffect(()=>{bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });},[texts])

    return (
    <>
    <h4 style={{marginTop: '1rem'}}>Welcome to costumer service</h4>
    {texts.map((m, index)=>{return <p key={index}>{m}</p>})}
    <br/>
    <br/>
    <input id='input'
    style={{position: 'fixed', bottom: '0', width: '90%', paddingBottom: '1rem', marginTop: '4rem'}}
    />
    <button id='send-button' style={{display: 'inline', position: 'fixed', bottom: '0',
     right:'0', width: '10%', height: '2.8rem'}}>send</button>
    <div ref={bottomRef}></div>
    </>
  )
}
