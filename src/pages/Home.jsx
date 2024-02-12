import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./../components/Post";
const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get("/getallblogs", { withCredentials: true });
    console.log(response);
    setBlogs(response.data.blogs);
  };
  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog) => {
          return <Post {...blog} key={blog._id} />;
        })}
    </div>
  );
};
export default Home;
