import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleCreateNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("file", files[0]);

    console.log(files);

    const response = await axios.post("/createpost", data, {
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
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form className="create-post-form" onSubmit={handleCreateNewPost}>
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
        <ReactQuill onChange={(newValue) => setContent(newValue)} />
        <button>Create Post</button>
      </form>
    </div>
  );
};
export default CreatePost;
