import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { mockUsers } from '../data/mockUsers';

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";
import logoLogin from "../assets/icons/creative-logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // --- 1. เพิ่มระบบตรวจสอบขนาดหน้าจอแบบ Real-time ---
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    {
      /* ↓↓↓ Start : Here, I add alert for Email User And Password ↓↓↓ */
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert(
        "Invalid email format. Please include '@' and '.' (e.g., user@example.com)",
      );
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }
    {
      /* ↑↑↑ End : Here, I add alert for Email User And Password ↑↑↑*/
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...mockUsers, ...storedUsers];
    const user = allUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome back!`);
      window.location.href = "/";
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="fixed align inset-0 min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:bg-[url('/path-to-your-desktop-bg.png')] bg-[url('/path-to-your-mobile-bg.png')]">
      {/* --- 3. ส่วน Background: สลับรูปตาม windowWidth --- */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ปรับตรงนี้: เพิ่ม scale-100  */}
      <div className="flex flex-col justify-center relative z-10  w-full max-w-[540px] md:max-w-[648px] min-h-[600px] md:min-h-[709px] p-8 md:p-10 text-center bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl mx-4 scale-80">
        <div className="mb-6 md:mb-8 flex justify-center">
          <img
            src={logoLogin}
            alt="Logo"
            className="w-[75%] md:w-[85%] h-auto object-contain"
          />
        </div>

        <div className="space-y-4 text-left">
          <label className="block text-white !text-xl !md:text-2xl font-medium mb-1 pl-4 opacity-90">
            Enter your email
          </label>

          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-3 md:py-3.5 rounded-[16px] bg-black/50 placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-6 py-3 md:py-3.5 rounded-[16px] bg-black/50 placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-5 mt-4 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-150 text-white text-xl font-bold rounded-[16px] shadow-xl transition-all active:scale-95"
        >
          Login
        </button>

        <div className="mt-6 text-xs md:text-sm text-white/90 space-y-2">
          <p className="cursor-pointer hover:underline">
            Forgot your password?
          </p>
          <p>
            Not have one ?{" "}
            <span
              className="font-extrabold underline cursor-pointer hover:text-white"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
