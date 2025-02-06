import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const Chat = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("DevOps");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);
    const rooms = ["DevOps", "Cloud Computing", "Sports", "NodeJS", "News"]; // Predefined rooms

    useEffect(() => {
        // Listen for incoming messages
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Listen for previous messages on room join
        socket.on("previousMessages", (loadedMessages) => {
            setMessages(loadedMessages);
        });

        return () => {
            socket.off("message");
            socket.off("previousMessages");
        };
    }, []);

    useEffect(() => {
        // Auto-scroll to latest message if chatEndRef exists
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const joinRoom = () => {
        if (!username.trim()) {
            alert("Please enter a username.");
            return;
        }

        setMessages([]); // Clear messages when switching rooms
        socket.emit("joinRoom", { username, room });
    };

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("sendMessage", { room, message, username });
        setMessage(""); // Clear input after sending
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center", fontFamily: "Arial" }}>
            <h2>Chat App</h2>

            {/* Username Input */}
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "8px", marginBottom: "10px", width: "80%" }}
            />

            {/* Room Selection */}
            <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                style={{ padding: "8px", width: "85%", marginBottom: "10px" }}
            >
                {rooms.map((r) => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>

            <button onClick={joinRoom} style={{ padding: "8px", width: "85%", marginBottom: "20px" }}>
                Join Room
            </button>

            {/* Chat Messages */}
            <div style={{ border: "1px solid black", height: "300px", overflowY: "auto", padding: "10px" }}>
                {messages.length === 0 ? (
                    <p style={{ color: "gray" }}>No messages yet...</p>
                ) : (
                    messages.map((msg, index) => (
                        <p key={index} style={{ textAlign: msg.username === username ? "right" : "left" }}>
                            <strong>{msg.username === username ? "You" : msg.username}:</strong> {msg.message}
                        </p>
                    ))
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <input
                type="text"
                placeholder="Type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ padding: "8px", marginTop: "10px", width: "80%" }}
            />
            <button onClick={sendMessage} style={{ padding: "8px", marginLeft: "5px" }}>Send</button>
        </div>
    );
};

export default Chat;
