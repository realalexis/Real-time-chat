import {createContext, useCallback, useEffect, useState} from 'react'

import {io} from 'socket.io-client';

import viteLogo from '/vite.svg'
import './App.css'
import Chat from "./component/Chat.jsx";


const socket = io.connect('http://localhost:3000');



export const MyContext = createContext();
function App() {
    const [userName, setUsername] = useState("")
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState()
    const [showChat , setShowChat] = useState(false)

    const joinRoom = () => {
        if(userName !== "" && room !== ""){
            socket.emit("join_room", room)
            setShowChat(true)
        }
    }



    const handleMessageChange = useCallback((newMessage) =>{
        setMessage(newMessage);
    })



  return (
      <>
          <div className="App">
              {!showChat ? (
                  <div className="joinChatContainer">
                      <h3>Join A Chat</h3>
                      <input
                          type="text"
                          placeholder="John..."
                          onChange={(event) => {
                              setUsername(event.target.value);
                          }}
                      />
                      <input
                          type="text"
                          placeholder="Room ID..."
                          onChange={(event) => {
                              setRoom(event.target.value);
                          }}
                      />
                      <button onClick={joinRoom}>Join A Room</button>
                  </div>
              ) : (
                  <Chat socket={socket} username={userName} room={room}/>
              )}
          </div>
      </>
  )
}

export default App;
