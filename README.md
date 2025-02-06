# Real-Time Chat Application

## Overview
This is a **real-time chat application** built with **Socket.io, Express, and MongoDB** for the backend, and **HTML, CSS, and JavaScript (React)** for the frontend. Users can sign up, log in, join chat rooms, and send messages in real-time.

## Features
✔ **User Authentication** – Sign up and log in with a unique username.  
✔ **Room-Based Messaging** – Join predefined chat rooms and send messages.  
✔ **Real-Time Communication** – Messages are instantly broadcasted using **Socket.io**.  
✔ **Message Persistence** – Messages are stored in **MongoDB** and loaded on room join.  
✔ **Typing Indicator** – Shows when a user is typing (to be implemented).  
✔ **User Sessions** – Stores logged-in users using `localStorage` for session persistence.  
✔ **Responsive UI** – Built with **React.js** for a modern user experience.  

## Technologies Used
### **Backend:**
- **Node.js** with **Express.js** – Handles API requests.
- **MongoDB** with **Mongoose** – Stores users and chat messages.
- **Socket.io** – Enables real-time communication.

### **Frontend:**
- **React.js** – Dynamic frontend UI.
- **Socket.io Client** – Connects frontend to WebSocket server.
- **CSS & Bootstrap** – Styling.

---

## Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
