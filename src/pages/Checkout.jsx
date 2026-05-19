import React, { useState, useEffect } from "react";
import CheckoutHeader from "../components/Checkout/01_CheckoutHeader";
import CheckoutForm from "../components/Checkout/02_CheckoutForm";
import CheckoutSummary from "../components/Checkout/03_CheckoutSummary";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Promptpay");

  const [addresses, setAddresses] = useState([
    { id: 1, name: "Star Chaser", detail: "123/45 ... Mark district 22000" },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(1); // ล็อคตัวแรกไว้

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#F3EFFF]">
      <main className="max-w-5xl w-full mx-auto p-6">
        <CheckoutHeader />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-20">
          <div className="lg:col-span-7">
            <CheckoutForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              addresses={addresses} 
              setAddresses={setAddresses} 
              selectedAddressId={selectedAddressId} 
              setSelectedAddressId={setSelectedAddressId} 
            />
          </div>
          <div className="lg:col-span-5">
            <CheckoutSummary
              cartItems={cartItems}
              subtotal={subtotal}
              selectedAddressId={selectedAddressId}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
