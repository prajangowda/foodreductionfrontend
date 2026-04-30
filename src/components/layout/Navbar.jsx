import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between p-4 shadow">
      <Link to="/">FoodShare</Link>

      <div>
        {!user ? (
          <>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span className="mr-2">{user.role}</span>
            <button
              onClick={() => {
                logoutUser();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}