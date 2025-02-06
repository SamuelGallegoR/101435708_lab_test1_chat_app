import React, { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/signup", form);
      alert("Signup successful! Please log in.");
    } catch (error) {
      alert("Signup failed.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
