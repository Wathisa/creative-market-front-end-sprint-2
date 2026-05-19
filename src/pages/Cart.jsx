import React, { useState, useEffect } from "react";
import CartHeader from "../components/Cart/01_CartHeader";
import CartTable from "../components/Cart/02_CartTable";
import CartSummary from "../components/Cart/03_CartSummary";

export default function Cart() {
  // ดึงข้อมูลสินค้า (เดี๋ยวค่อยมาต่อให้ดึงจาก LocalStorage ตามแผนนะครับ)
  const [cartItems, setCartItems] = useState([]);

  // 3. ใช้ useEffect ดึงค่าจาก LocalStorage เมื่อเปิดหน้านี้ขึ้นมา
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, amount) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="pt-5 min-h-screen flex flex-col bg-[#F3EFFF]">
      <main className=" flex-grow max-w-5xl w-full  mx-auto p-6">
        {/* 1. Header ส่วนหัว */}

        <CartHeader />

        {/* 2. ตารางรายการสินค้า */}
        <div className="mt-15">
          <CartTable
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>

        
        <div className="flex justify-end mt-10">
          <div className="w-full md:w-1/2">
            {" "}
            
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      </main>
    </div>
  );
}
