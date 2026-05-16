import { useState } from "react";
import OrderCard from "./01_OrderCard";

const statusLabels = {
  PAYABLE: "ที่ต้องชำระ",
  RECEIVABLE: "ที่ต้องได้รับ",
  COMPLETED: "สำเร็จแล้ว",
};

const orderStats = [
  { label: "Total orders", value: "3" },
  { label: "Total spend", value: "฿9,550" },
  { label: "Completed", value: "1" },
];

const tabs = [
  { label: "All", value: "All" },
  { label: "ที่ต้องชำระ", value: "PAYABLE" },
  { label: "ที่ต้องได้รับ", value: "RECEIVABLE" },
  { label: "สำเร็จแล้ว", value: "COMPLETED" },
];

const orders = [
  {
    id: "#CM-20191",
    product: "Golden Bloom Poster",
    artist: "Asha Studio",
    items: 1,
    date: "12 Mar 2026",
    price: "฿1,250",
    status: "COMPLETED",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "#CM-20192",
    product: "Midnight Echo Canvas",
    artist: "Lin Atelier",
    items: 2,
    date: "16 Mar 2026",
    price: "฿2,900",
    status: "PAYABLE",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "#CM-20193",
    product: "Clay Form Vase",
    artist: "Tri Ceramic",
    items: 1,
    date: "18 Mar 2026",
    price: "฿980",
    status: "RECEIVABLE",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "#CM-20194",
    product: "Quiet Fields Print Set",
    artist: "Bank Works",
    items: 3,
    date: "21 Mar 2026",
    price: "฿1,880",
    status: "PAYABLE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROdtT-UNxZlU4Ci6zK4X3FmDhXaMIYKatVRg&s",
  },
  {
    id: "#CM-20195",
    product: "Candlelight Portrait",
    artist: "Joe Ink",
    items: 1,
    date: "25 Mar 2026",
    price: "฿1,640",
    status: "PENDING",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "#CM-20196",
    product: "Petal Loop Earrings",
    artist: "Sign Handmade",
    items: 2,
    date: "28 Mar 2026",
    price: "฿900",
    status: "PAYABLE",
    image: "https://www.lovisa.sg/cdn/shop/files/51098858.jpg?v=1733770126",
  },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-gray-400">คำสั่งซื้อของฉัน</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {orderStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-5 md:px-6 md:py-5"
          >
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition md:px-5 md:py-2.5 ${
                isActive
                  ? "bg-[#1e1b4b] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            statusLabel={statusLabels[order.status]}
          />
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
