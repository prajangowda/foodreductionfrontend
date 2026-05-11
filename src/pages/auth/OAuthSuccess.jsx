import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const token = query.get("token");
    const profileCompleted = query.get("profileCompleted");

    const payload = JSON.parse(atob(token.split(".")[1]));

    console.log(payload);

    localStorage.setItem("role",payload.role.toLowerCase() );

    console.log("TOKEN:", token);
    console.log("PROFILE:", profileCompleted);

    if (token) {
      localStorage.setItem("token", token);

      // 🔥 MAIN FIX
      if (profileCompleted === "true") {
        navigate("/home");
      } else {
        navigate("/complete-profile");
      }
    } else {
      navigate("/login");
    }

  }, [location, navigate]);

  return <p>Logging in...</p>;
}