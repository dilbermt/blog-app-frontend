import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useContext } from "react";
import UserContext from "../context/userContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const checkAuth = async () => {
    const response = await axios.get("/checkauth", { withCredentials: true });
    console.log("check auth", response);

    if (response.status === 200) {
      setUser({ id: response.data.id });
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const logOut = async () => {
    const response = await axios.get("/logout", { withCredentials: true });
    if (response.status === 200) {
      <Navigate to="/" />;
    }
  };
  return (
    <header>
      <Link to="/" className="logo">
        Blogspace
      </Link>
      <nav>
        {user && (
          <>
            <Link to="/create">Create new Post</Link>
            <a href="" onClick={logOut}>
              Log out
            </a>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Regiser</Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
