import { Link } from "react-router-dom";
const Post = ({
  _id,
  title,
  summary,
  filePath,
  content,
  createdAt,
  author,
}) => {
  console.log(title, summary);
  return (
    <div className="post">
      <div className="img-container">
        <Link to={`/blog/${_id}`}>
          <img src={`http://localhost:4000/${filePath}`} alt="" />
        </Link>
      </div>
      <div className="text">
        <Link to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.email}
          </a>
          <time>{createdAt}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
