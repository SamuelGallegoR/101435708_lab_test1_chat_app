const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
const GroupMessage = require("./models/GroupMessage"); // Ensure GroupMessage is correctly imported
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

connectDB();

app.use(express.json());
app.use(cors());

// Import Routes
app.use("/api/auth", require("./routes/authRoutes"));

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on("joinRoom", async ({ username, room }) => {
        if (!username || !room) {
            console.log("Join Room Error: Missing username or room.");
            return;
        }
        
        socket.join(room);
        console.log(`${username} joined room: ${room}`);

        // Fetch last 20 messages from MongoDB for the room
        try {
            const previousMessages = await GroupMessage.find({ room })
                .sort({ date_sent: -1 }) // Fetch latest messages first
                .limit(20);

            // Send previous messages to the user who joined
            socket.emit("previousMessages", previousMessages.reverse()); // Reverse to show oldest first
        } catch (error) {
            console.error("Error fetching messages:", error);
        }

        // Notify room members
        io.to(room).emit("message", { username: "Chat Bot", message: `${username} has joined the chat` });
    });

    // Handle sending messages in rooms
    socket.on("sendMessage", async ({ room, message, username }) => {
        if (!username || !room || !message) {
            console.log("Missing required fields in sendMessage:", { room, message, username });
            return;
        }

        const msgData = { username, message, room };

        // Emit message to the room
        io.to(room).emit("message", msgData);

        try {
            // Save message to MongoDB
            const newMessage = new GroupMessage({
                from_user: username,
                room,
                message,
                date_sent: new Date()
            });
            await newMessage.save();
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
