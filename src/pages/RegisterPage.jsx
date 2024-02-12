import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/register", formData, {
      withCredentials: true,
    });
    console.log(response);
    console.log("status", response.status);
    if (response.status === 200) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        name="email"
        value={formData.email}
        placeholder="email"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="password"
        onChange={handleInputChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
