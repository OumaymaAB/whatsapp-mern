import './App.css';
import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then( response => {
      setMessages(response.data);
    })
  })

  useEffect(() => {
    const pusher = new Pusher('5221795f179b0f16a1a8', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //that means keep all messages ([] ...messages) and also the new ones (newMessage)
      setMessages([...messages, newMessage]);
    });

    //cleanup function


  }, [messages])

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
       {/* Sidebar Component */}
       <Sidebar/>
      {/* Chat Compnent */}
      <Chat messages={messages} />
      </div>  
    </div>
  );
}

export default App;
