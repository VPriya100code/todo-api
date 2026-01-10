import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <span>📝</span>
        <span>Todo App</span>
      </div>

      <div className="nav-right">
        <Link to="/todo">To-Do</Link>
        <Link to="/upload">Image Upload</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
