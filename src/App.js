import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import axios from "axios";
import BlogPage from "./pages/BlogPage";
import EditBlogPage from "./pages/EditBlogPage";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/edit/:id" element={<EditBlogPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
