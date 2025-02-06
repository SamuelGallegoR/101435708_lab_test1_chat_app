import React, { useState, useEffect } from "react";
import ChatComponent from "./components/Chat";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const signupUser = async () => {
        const username = document.getElementById("signupUsername").value;
        const firstname = document.getElementById("signupFirstname").value;
        const lastname = document.getElementById("signupLastname").value;
        const password = document.getElementById("signupPassword").value;

        const response = await fetch("http://localhost:5001/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, firstname, lastname, password }),
        });

        const data = await response.json();
        if (data.message === "User registered successfully") {
            alert("Signup successful! Please log in.");
            window.location.reload();
        } else {
            alert("Signup failed");
        }
    };

    const loginUser = async () => {
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("user", JSON.stringify({ username: data.username, token: data.token }));
            window.location.reload();
        } else {
            alert("Invalid credentials");
        }
    };

    if (!user) {
        return (
            <div>
                <h2>Signup</h2>
                <input type="text" placeholder="Username" id="signupUsername" />
                <input type="text" placeholder="First Name" id="signupFirstname" />
                <input type="text" placeholder="Last Name" id="signupLastname" />
                <input type="password" placeholder="Password" id="signupPassword" />
                <button onClick={signupUser}>Signup</button>

                <h2>Login</h2>
                <input type="text" placeholder="Username" id="loginUsername" />
                <input type="password" placeholder="Password" id="loginPassword" />
                <button onClick={loginUser}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <button onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>Logout</button>
            <ChatComponent />
        </div>
    );
};

export default App;
