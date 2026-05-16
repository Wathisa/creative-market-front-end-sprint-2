import UserCard from "./01_UserCard";
import StatsCard from "./02_StatsCard";
import OrdersStatus from "./03_OrdersStatus";
import OrdersHistory from "./04_OrdersHistory";

const Overview = ({ onOpenOrders }) => {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Overview
        </h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <UserCard />
        <StatsCard label="Total Orders" value={0} />
        <StatsCard label="Total Spend" value={`฿ ${0}`} theme="dark" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrdersStatus onOpenOrders={onOpenOrders} />
        <OrdersHistory onOpenOrders={onOpenOrders} />
      </div>
    </section>
  );
};

export default Overview;
