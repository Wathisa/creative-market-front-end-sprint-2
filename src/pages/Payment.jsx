import React, { useState, useEffect } from "react";
import PaymentGateway from "../components/Payment/01_PaymentGateway";
import CheckoutSummary from "../components/Checkout/03_CheckoutSummary"; // ดึงของเดิมมา Reuse

export default function Payment() {
  // 1. สร้าง State รอรับค่าจาก LocalStorage
  const [cartItems, setCartItems] = useState([]);

  // 2. ดึงข้อมูลสินค้าที่เคยกดซื้อไว้มาแสดงผล
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // 3. คำนวณยอดเงินรวม
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#F3EFFF]">
      <main className="max-w-6xl w-full mx-auto p-6">
        {/* ส่วนเนื้อหา แบ่งเป็น 2 คอลัมน์ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          {/* ฝั่งซ้าย: ส่วนสแกน QR Code */}
          <div className="lg:col-span-7">
            <PaymentGateway subtotal={subtotal} />
          </div>

          {/* ฝั่งขวา: สรุปรายการสินค้า (ใช้ตัวเดียวกับหน้า Checkout ได้เลย) */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <CheckoutSummary
              cartItems={cartItems}
              subtotal={subtotal}
              isPaymentPage={true} // ซ่อนปุ่ม
            />
          </div>
        </div>
      </main>
    </div>
  );
}
