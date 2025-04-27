import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 mb-6 border border-gray-300 rounded"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Register
      </button>
    </form>
  );
}

export default Register;
