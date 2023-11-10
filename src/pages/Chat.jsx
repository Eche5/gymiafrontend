import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import trainer from "../assets/profilepic.webp";
import { useAuth } from "../contexts/AuthenticationContext";
import io from "socket.io-client";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io(`https://gymia.adaptable.app`);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    async function fetchMessages() {
      const response = await axios.get(`/users/message/${id}`, {
        withCredentials: true,
      });
      const oldmessage = response.data.data;
      setMessages([...oldmessage]);
    }
    fetchMessages();
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("message");
    };
  }, []);
  console.log(messages);
  const sendMessage = () => {
    // Send message to the server
    socket.emit("message", {
      text: newMessage,
      user: "You",
      userId: auth?.foundUser?._id,
    });

    // Update local state
    setNewMessage("");
  };
  const totalHeight = messages.length * 80; // Assuming each chat message has a height of 80px

  return (
    <div>
      <div className="flex justify-between p-2">
        <div>
          <h1 className="text-2xl font-bold">
            Hello, {auth?.foundUser?.firstname}
          </h1>
          <p className="text-gray-700">
            Keep doing the work & get the results.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border-2 border-gray-900 text-black p-2 rounded-lg flex items-center gap-2">
            {formattedDate}
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <div
        className={
          totalHeight > 300
            ? "max-h-[480px] overflow-y-scroll"
            : "max-h-[480px] overflow-y-hidden"
        }
      >
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://nationalpti.org/wp-content/uploads/2014/02/Personal-Trainer.jpg"
                alt="avatar"
              />
            </div>
          </div>
          <div className="chat-header">
            Arnold James
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">
            You put so much work in today, keep it up!
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={trainer} alt="avatar" />
            </div>
          </div>
          <div className="chat-header">
            {auth?.foundUser?.firstname} {auth?.foundUser?.lastname}
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">Thank you😁!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
        <div>
          <div className="chat-header">
            {/* Display chat messages */}
            {messages.map((msg, index) => (
              <div key={index} className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={trainer} alt="avatar" />
                  </div>
                </div>
                <div className="chat-header">
                  {auth?.foundUser?.firstname} {auth?.foundUser?.lastname}
                  <time className="text-xs opacity-50 pl-2">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">delivered</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center absolute w-[70%] bottom-0 ">
          {/* Input for new messages */}
          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full"
            value={newMessage}
          />
          <button
            onClick={() => sendMessage()}
            className="bg-gray-700 rounded-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
