import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (data && data.email) {
      alert("Login Successful!");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
      <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Login
      </button>
    </form>
  );
}

export default Login;
