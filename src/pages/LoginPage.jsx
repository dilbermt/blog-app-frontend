import { useState, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import UserContext from "../context/userContext";

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
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
    const response = await axios.post("/login", formData, {
      withCredentials: true,
    });
    console.log(response);
    if (response.status === 200) {
      setUser(true);
      setRedirect(true);
    } else {
      alert("Incorrect password");
    }
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginPage;
