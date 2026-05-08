import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-semibold tracking-tight text-gray-900 hover:text-green-700 transition duration-200"
        >
          <span className="text-green-700 font-bold">
            Food
          </span>
          Share
        </Link>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-lg font-semibold text-gray-700 hover:text-green-700 transition duration-200"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg text-base font-semibold tracking-wide transition duration-300"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              {/* USER ROLE */}
              <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 px-5 py-3 rounded-lg">

                <div className="w-3 h-3 rounded-full bg-green-600"></div>

                <span className="text-base font-semibold text-gray-700 tracking-wide uppercase">
                  {user.role}
                </span>
              </div>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
                className="text-base font-semibold text-gray-700 hover:text-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}