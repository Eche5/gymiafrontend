import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:7000"); // Replace with your server URL

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    console.log("Socket connected:", socket.connected);

    // Handle incoming messages
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = () => {
    // Send message to the server
    socket.emit("message", { text: newMessage, user: "You" });

    // Update local state
    setMessages([...messages, { text: newMessage, user: "You" }]);
    setNewMessage("");
  };

  return (
    <div>
      <div>
        {/* Display chat messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div>
        {/* Input for new messages */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
