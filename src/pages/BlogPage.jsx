import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../context/userContext";

const BlogPage = () => {
  const { user } = useContext(UserContext);
  console.log("user from user context", user);
  const { id } = useParams();
  console.log(id);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const response = await axios.get(`/blog/${id}`);
    setBlog(response.data.blog);
    console.log("blog data", blog);
  };

  return (
    <div>
      {blog && (
        <div className="blog-page">
          <h2 className="title">{blog.title}</h2>
          <div className="text">
            <p className="auhtor">{blog.author.email}</p>
            <p className="time">{blog.updatedAt}</p>
            {user?.id === blog.author._id && (
              <div className="edit-blog-container">
                <Link to={`/edit/${blog._id}`} className="edit-btn">
                  Edit
                </Link>
              </div>
            )}
          </div>
          <div className="image">
            <img src={`http://localhost:4000/${blog.filePath}`} alt="" />
          </div>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
