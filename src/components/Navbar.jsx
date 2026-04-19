import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="navbar">
      <h2>Smart Travel Planner</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-trip">Create Trip</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;