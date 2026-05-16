import { useState, useEffect } from "react";
import { login, signup } from "../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import loginimg from "../../assets/loginimg.png";

export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser } = useAuth();

    const [isLogin, setIsLogin] = useState(true);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // detect route (/login or /signup)
    useEffect(() => {
        if (location.pathname === "/signup") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [location.pathname]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 🔥 LOGIN (FIXED)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);

            // handle both cases (res.data or res directly)
            const data = res?.token ? res : res.data;
            
            // 🔍 debug

            // store token + user
            loginUser(data);
            sessionStorage.setItem("role",data.role.toLowerCase());
            
            if (!data.profilecompleted) {
                navigate("/complete-profile");
            } else {
                navigate("/home");
            }

        } catch (err) {
            console.error(err);
            alert("Invalid credentials");
        }
    };

    // 🔥 SIGNUP
   const handleSignup = async (e) => {
    e.preventDefault();

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
        alert("Please enter a valid email address");
        return;
    }

    try {
        await signup(form);
        alert("Signup successful");
        setIsLogin(true);
    } catch (err) {
        console.error(err);
        alert("Signup failed");
    }
};

    // 🔥 GOOGLE LOGIN
    const handleGoogleLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div className="h-screen grid md:grid-cols-2 overflow-hidden">

            {/* LEFT SIDE */}
            <div className="hidden md:flex relative h-full w-full">

                <img
                    src={loginimg}
                    alt="food donation"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 flex flex-col justify-center items-start text-white px-16 h-full">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">
                        Reduce Food Waste 🍱
                    </h1>

                    <p className="text-lg max-w-md">
                        Connect donors, NGOs, and volunteers to distribute surplus food efficiently.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center h-full">

                <div className="w-full max-w-md shadow-xl p-10 rounded-2xl bg-white">

                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>

                    <form onSubmit={isLogin ? handleLogin : handleSignup}>

                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mb-4 p-3 border rounded-lg"
                            required
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mb-4 p-3 border rounded-lg"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg mb-4"
                        >
                            {isLogin ? "Login" : "Signup"}
                        </button>
                    </form>

                    {/* GOOGLE BUTTON */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="w-5 h-5"
                            alt="google"
                        />
                        Continue with Google
                    </button>

                    {/* TOGGLE */}
                    <p className="text-center mt-4">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}

                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-green-600 cursor-pointer ml-2"
                        >
                            {isLogin ? "Signup" : "Login"}
                        </span>
                    </p>

                </div>
            </div>

        </div>
    );
}