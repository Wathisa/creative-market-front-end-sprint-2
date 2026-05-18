import React from 'react';
import { useNavigate } from 'react-router-dom';

// เพิ่ม Props เพื่อรับค่าจากหน้าหลักมาใช้ยิง API
export default function CheckoutSummary({ 
  cartItems, 
  subtotal, 
  selectedAddressId, 
  paymentMethod,
  isPaymentPage = false // ถ้าเป็น true จะซ่อนปุ่ม Checkout (ใช้ในหน้า Payment)
}) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // 1. ตรวจสอบที่อยู่ก่อนส่ง API
    if (!selectedAddressId) {
      alert("กรุณาเลือกที่อยู่สำหรับจัดส่ง");
      return;
    }

    try {
      // 2. API: POST /orders - สร้างคำสั่งซื้อ
      
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          addressId: selectedAddressId, 
          paymentMethod: paymentMethod 
        })
      });
      const orderData = await orderRes.json();

      // 3. API: POST /payments/promptpay/generate - สร้าง QR Code
      const qrRes = await fetch('/api/payments/promptpay/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderData.id }) 
      });
      const qrData = await qrRes.json();

      // 4. ส่งข้อมูลทั้งหมดไปหน้า Payment ผ่าน State
      navigate('/payment', { 
        state: { 
          qrImage: qrData.qrImage, // URL รูปภาพ QR Code
          orderId: orderData.id,
          amount: subtotal
        } 
      });

    } catch (err) {
      console.error("Checkout process failed:", err);
      alert("เกิดข้อผิดพลาดในการทำรายการ");
    }
  };

  return (
    <div className="space-y-4">
      {/* Mini Product List */}
      <div className="border border-[#4C1D95] rounded-lg p-4 bg-white/50 space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4 border-b border-purple-200 pb-4 last:border-0 last:pb-0">
            {/* ใส่รูปสินค้าจริงๆ ถ้ามี หรือใช้ Placeholder เดิม */}
            <img 
              src={item.image || "https://placeholder.com"} 
              alt={item.name}
              className="w-16 h-16 bg-[#D9D9D9] rounded-sm shrink-0 object-cover"
            />
            <div className="flex flex-col justify-between py-1">
              <div>
                <h4 className="font-bold text-sm text-[#1E1B4B]">{item.name}</h4>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-sm">฿ {item.price.toLocaleString()}.-</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Cart Summary */}
      <div className="border border-[#4C1D95] rounded-lg p-5 bg-white/50">
        <h3 className="font-bold mb-4 text-sm text-[#1E1B4B]">Cart summary</h3>
        <div className="space-y-3 text-sm border-b border-purple-200 pb-3 mb-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold">฿ {subtotal.toLocaleString()}.-</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600 font-bold">Free</span>
          </div>
        </div>
        <div className="flex justify-between text-sm font-bold mb-5 text-[#1E1B4B]">
          <span>Total</span>
          <span>฿ {subtotal.toLocaleString()}.-</span>
        </div>

        {/* ถ้าไม่ใช่หน้า Payment ให้แสดงปุ่ม Checkout */}
        {!isPaymentPage ? (
          <button 
            onClick={handleCheckout}
            className="w-full bg-[#1E1B4B] text-white py-2.5 rounded font-semibold hover:bg-[#312E81] transition-all active:scale-[0.98]"
          >
            Confirm & Pay
          </button>
        ) : (
          <div className="bg-purple-50 p-2 rounded text-center">
            <p className="text-[10px] text-[#4C1D95] font-bold uppercase tracking-widest">
              Awaiting Payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}