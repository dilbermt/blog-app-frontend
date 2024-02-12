import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const EditBlogPage = () => {
  const { id } = useParams();
  console.log("iddddd", id);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const response = await axios.get(`/blog/${id}`);
    setBlog(response.data.blog);
    console.log("blog data", blog);
    setTitle(response.data.blog.title);
    setSummary(response.data.blog.summary);
    setContent(response.data.blog.content);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("id", id);
    if (files?.[0]) {
      data.append("file", files[0]);
    }

    console.log(files);

    const response = await axios.put(`/updateblog/${id}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    if (response.status === 200) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={`/blog/${id}`} />;
  }

  return (
    <div>
      <form className="create-post-form" onSubmit={handleUpdatePost}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="summary"
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          placeholder="upload an image"
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          onChange={(newValue) => setContent(newValue)}
          value={content}
        />
        <button>Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlogPage;
