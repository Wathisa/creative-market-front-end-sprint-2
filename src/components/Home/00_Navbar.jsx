import React, { useState } from "react";
import logo from "../../assets/logos/logo.svg";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("null"); // เก็บข้อมูลโปรไฟล์ผู้ใช้ (เช่นชื่อ, รูปภาพ)

  const [isLoggedIn, setIsLoggedIn] = useState(true); // สถานะล็อกอิน
  const [userRole, setUserRole] = useState("visitor"); // บทบาท: "visitor", "user", "admin"
  const [cartCount, setCartCount] = useState(3); // จำนวนสินค้าในตะกร้า

  // สแตนด์บายฟังก์ชันสำหรับ Fetch ข้อมูลผู้ใช้และตะกร้าเมื่อแอปโหลด
  /* useEffect(() => {
    // เพื่อนร่วมทีมสามารถมาเขียน fetch เช็ค token และดึงค่าดั้งเดิมจาก API 
    // ตัวอย่างโครงสร้าง:
    // const fetchStatus = async () => { ... }
    // fetchStatus();
  }, []);
  */

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white flex-wrap">
      {/* 1. Logo Section */}
      <Link
        to="/"
        className="flex items-center cursor-pointer hover:opacity-80 transition-all"
      >
        <img src={logo} alt="logo" className="h-7 w-auto " />
      </Link>
      {/* 2. Menu Links Section */}
      <ul className="hidden md:flex items-center gap-3 text-xl h-auto font-medium ">
        <Link to="/">
          <li className="hover:text-gray-400 cursor-pointer transition-all">
            Home
          </li>
        </Link>
        <span className="text-gray-500">|</span>
        <Link
          to="/#about-section"
          className="hover:text-gray-400 cursor-pointer transition-all"
        >
          About
        </Link>
        <span className="text-gray-500">|</span>

        {/* ================= Category (Hover Version) ================= */}
        <li className="relative cursor-pointer group py-2">
          {/* Category */}
          <div className="flex items-center gap-1 hover:text-gray-400 transition-all">
            Category
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          {/* Dropdown */}
          <div className="absolute top-full left-0 pt-4 w-56 z-50 hidden group-hover:block">
            <div className="bg-black border border-gray-800 py-3 rounded-sm shadow-2xl animate-fade-in">
              <ul className="flex flex-col text-base text-white">
                <li className="px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  <Link to="/market?category=Visual Art">Visual Art</Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  <Link
                    to={`/market?category=${encodeURIComponent("Craft & Handmade")}`}
                  >
                    Craft & Handmade
                  </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  <Link
                    to={`/market?category=${encodeURIComponent("Music & Sound")}`}
                  >
                    Music & Sound
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      {/* 3. Buttons Section */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoggedIn ? (
          // ---------------- กรณีที่ 1: แขกทั่วไป (Visitor) ----------------
          <>
            <Link to="/login">
              <button className="bg-white text-black px-4 py-2 hover:bg-gray-400 cursor-pointer transition-all w-30 font-medium">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-black text-white px-4 py-2 hover:bg-white hover:text-black cursor-pointer transition-all w-30 border font-medium">
                Register
              </button>
            </Link>
          </>
        ) : (
          // ---------------- กรณีที่ล็อกอินแล้ว (User หรือ Admin) ----------------
          <div className="flex items-center gap-6">
            {/* ส่วนของ ตะกร้าสินค้า: จะแสดงเฉพาะคนที่มีบทบาทเป็น "user" เท่านั้น */}
            {userRole === "user" && (
              <Link
                to="/cart"
                className="relative cursor-pointer hover:text-gray-400 transition-colors"
              >
                {/* ไอคอนตะกร้าสินค้าชิคๆ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {/* วงกลมตัวเลขสีแดงแจ้งเตือนยอดสินค้าสะสม */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* ส่วนของ รูปหัวคน (Profile): พาไปยัง Dashboard ตามบทบาทของผู้ใช้ */}
            <Link
              to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              className="cursor-pointer hover:text-purple-400 transition-colors flex items-center gap-2"
              title={
                userRole === "admin"
                  ? "Go to Admin Dashboard"
                  : "Go to User Dashboard"
              }
            >
              <div
                className={`p-1 rounded-full border-2 ${userRole === "admin" ? "border-red-500" : "border-purple-500"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* 4. Mobile Menu Icons  */}
      {/* Hamburger */}
      <div className="flex md:hidden items-center gap-4 relative z-50">
        {/* 1. ปุ่มแฮมเบอร์เกอร์ (เปิด/ปิดเมนู) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:text-gray-400 transition-colors"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        {/* 2. ไอคอนหัวคนสำหรับผู้เยี่ยมชม: จะหายไปทันทีถ้าล็อกอินติดตามที่เธอต้องการเลยจ้า */}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="cursor-pointer hover:text-gray-400 transition-colors"
            title="Login / Register"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
      {/* 5. Mobile Dropdown Menu  */}
      {isOpen && (
        // เรานำกล่องตัวแม่ที่มีคลาส relative z-40 มาครอบไว้ตรงนี้ เพื่อคุมตำแหน่งระดับชั้นของเมนูทั้งหมดจ้า
        <div className="w-full md:hidden flex flex-col mt-4 border-t border-gray-800 pt-4 pb-2 animate-fade-in relative z-40">
          {!isLoggedIn ? (
            // ---------- กรณีที่ 1: ยังไม่ล็อกอิน โชว์ปุ่ม Login / Register ตามเดิม ----------
            <div className="flex gap-4 mt-8 px-2">
              <Link to="/login" className="w-full">
                <button className="bg-white text-black px-4 py-3 hover:bg-gray-300 transition-all w-full font-bold rounded-sm cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/register" className="w-full">
                <button className="bg-transparent text-white px-4 py-3 hover:bg-gray-800 transition-all w-full border border-white font-bold rounded-sm cursor-pointer">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            // ---------- กรณีที่ 2: ล็อกอินติดแล้ว โชว์เมนูลัดเข้าถึงสิทธิ์ตามรูปวาดของเธอ ----------
            <div className="flex flex-col gap-3 mt-6 border-t border-gray-800 pt-4 px-2">
              <div className="text-sm text-gray-500 tracking-widest font-bold uppercase mb-1">
                Account Actions
              </div>

              {/* เมนูตะกร้าสินค้า: โชว์เฉพาะ "user" พร้อมแสดงตัวเลขสะสมข้างๆ */}
              {userRole === "user" && (
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-white hover:text-purple-400 py-2 transition-colors"
                >
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    My Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount} Items
                    </span>
                  )}
                </Link>
              )}

              {/* เมนูหน้าส่วนตัว (Dashboard): คัดแยก Path ปลายทางตามบทบาทอัติโนมัติ */}
              <Link
                to={
                  userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"
                }
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-white hover:text-purple-400 py-2 transition-colors text-lg font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 ${userRole === "admin" ? "text-red-500" : "text-purple-500"}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
                {userRole === "admin" ? "Admin Dashboard" : "My Dashboard"}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
