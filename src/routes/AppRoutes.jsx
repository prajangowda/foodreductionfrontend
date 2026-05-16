import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../pages/auth/AuthPage";
import OAuthSuccess from "../pages/auth/OAuthSuccess";
import Layout from "../components/layout/Layout";
import CompleteProfile from "../pages/CompleteProfile";
import DonorDashboard from "../pages/donor/DonorDashboard";
import NgoDashboard from "../pages/ngo/NgoDashboard";
import VolunteerDashboard from "../pages/volunteer/VolunteerDashboard";
// simple protection
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="signup" element={<AuthPage />} />
        <Route path="oauth-success" element={<OAuthSuccess />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
         <Route path="/ngo/dashboard" element={<NgoDashboard />} />
         <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
      </Route>

    </Routes>
  );
}