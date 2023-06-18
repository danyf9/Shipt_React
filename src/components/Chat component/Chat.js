import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../App';

export default function Chat() {
    const {userInfo} = useContext(AppContext)
    const socketClient = new WebSocket(`ws://127.0.0.1:8000/ws?room=${userInfo.username}&user=${userInfo.username}`);
    
    socketClient.onmessage = async (e) => {
        const data = await JSON.parse(e.data);
        const constrootElem = document.getElementById("add");
        const newElem = document.createElement("p");
        newElem.innerText = data.message;
        constrootElem.appendChild(newElem)
      }
    
         const send = (data)=>{
            socketClient.send(JSON.stringify({ message: data }));
            document.querySelector('#input').value = ''
          }
    
          useEffect(() => {
            const keyDownHandler = event => {
        
              if (event.key === 'Enter') {
                event.preventDefault();
        
                send(document.querySelector('#input').value);
              }
            };
        
            document.addEventListener('keydown', keyDownHandler);
        
            return () => {
              document.removeEventListener('keydown', keyDownHandler);
            };
            // eslint-disable-next-line
          }, []);


    return (
    <>
    <h5>Welcome to costumer servic</h5>
    <input id='input'
    /><br/>
    <button onClick={()=>{send(document.querySelector('#input').value)}}>Send</button>
    <div id="add"></div>    
    </>
  )
}
