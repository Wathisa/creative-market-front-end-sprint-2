import React, { useState } from "react";

export default function CheckoutForm({ 
  paymentMethod, setPaymentMethod, 
  addresses, setAddresses, 
  selectedAddressId, setSelectedAddressId 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: "", detail: "" });

  // ฟังก์ชันบันทึกที่อยู่ใหม่
  const handleSaveNewAddress = () => {
    if (!newAddr.name || !newAddr.detail) return;
    const newEntry = { id: Date.now(), ...newAddr };
    const updatedAddresses = [...addresses, newEntry];
    
    setAddresses(updatedAddresses);
    setSelectedAddressId(newEntry.id); // ล็อคอันที่เพิ่งเพิ่มทันที
    setIsAdding(false);
    setNewAddr({ name: "", detail: "" });
  };

  // ฟังก์ชันลบที่อยู่
  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);
    
    // ถ้าลบตัวที่เลือกอยู่ ให้ย้ายไปเลือกตัวแรกที่เหลือ (ถ้ามี)
    if (selectedAddressId === id && updatedAddresses.length > 0) {
      setSelectedAddressId(updatedAddresses[0].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Address Selection Area */}
      <div className="border border-[#4C1D95] rounded-lg p-5 bg-white/50">
        <div className="space-y-4 mb-4">
          {addresses.length === 0 && !isAdding && (
            <p className="text-sm text-gray-500 italic">No address added. Please add one.</p>
          )}

          {addresses.map((addr) => (
            <div key={addr.id} className="flex justify-between items-center group">
              <label className="flex gap-3 cursor-pointer flex-grow">
                <input
                  type="radio"
                  name="address"
                  // ถ้าเหลืออันเดียว ให้ล็อค checked ไว้เสมอ
                  checked={addresses.length === 1 || selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="mt-1 accent-[#4C1D95]"
                />
                <div>
                  <h3 className="font-bold text-[#1E1B4B]">{addr.name}</h3>
                  <p className="text-xs text-gray-400">{addr.detail}</p>
                </div>
              </label>
              
              {/* ปุ่มลบ (ถังขยะ) */}
              <button 
                onClick={() => handleDeleteAddress(addr.id)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                title="Delete address"
              >
                <span className="material-icons text-lg">delete_outline</span>
              </button>
            </div>
          ))}
        </div>

        <hr className="my-4 border-purple-100" />

        {/* ฟอร์มสำหรับเพิ่มที่อยู่ */}
        {isAdding ? (
          <div className="bg-purple-50/50 p-4 rounded-lg border border-purple-200 space-y-3">
            <h4 className="text-xs font-bold text-[#4C1D95] uppercase">New Location</h4>
            <input
              placeholder="Address Name (e.g., Home, Office)"
              className="w-full p-2 text-sm border border-purple-200 rounded focus:ring-1 focus:ring-[#4C1D95] outline-none"
              value={newAddr.name}
              onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
            />
            <textarea
              placeholder="Full address details..."
              className="w-full p-2 text-sm border border-purple-200 rounded focus:ring-1 focus:ring-[#4C1D95] outline-none"
              value={newAddr.detail}
              onChange={(e) => setNewAddr({ ...newAddr, detail: e.target.value })}
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSaveNewAddress} 
                className="bg-[#4C1D95] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#312E81]"
              >
                Save & Select
              </button>
              <button 
                onClick={() => setIsAdding(false)} 
                className="text-gray-500 text-xs hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-[#4C1D95] text-sm font-semibold hover:underline"
          >
            <span className="material-icons text-base">add_circle_outline</span>
            Add new location
          </button>
        )}
      </div>

      {/* Payment Method Section */}
      <div className="border border-[#4C1D95] rounded-lg p-5 bg-white/50">
        <h3 className="font-bold mb-4 text-[#1E1B4B]">Choose payment method</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Promptpay"
              checked={paymentMethod === "Promptpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-[#4C1D95]"
            />
            <span className="text-sm font-medium">Promptpay</span>
          </label>
        </div>
      </div>
    </div>
  );
}