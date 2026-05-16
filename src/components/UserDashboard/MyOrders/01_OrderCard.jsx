const statusClasses = {
  COMPLETED: "bg-emerald-100 text-emerald-600",
  PAYABLE: "bg-sky-100 text-sky-600",
  RECEIVABLE: "bg-amber-100 text-amber-600",
  CANCELLED: "bg-rose-100 text-rose-600",
};

const OrderCard = ({ order, statusLabel }) => {
  return (
    <article className="flex flex-col gap-5 rounded-2xl bg-white p-5 md:flex-row md:items-center md:p-6">
      {/* เปลี่ยนจาก div ไล่สี มาเป็นรูปภาพ */}
      <img
        src={order.image}
        alt={order.product}
        className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm md:h-24 md:w-24"
      />

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-gray-900">{order.product}</h3>
        <p className="mt-1 text-sm text-gray-500">by {order.artist}</p>
        <p className="mt-3 text-sm text-gray-400">{order.items} items</p>
      </div>

      <div className="grid gap-3 text-sm text-gray-500 md:min-w-80 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Order ID
          </p>
          <p className="mt-1 font-semibold text-gray-900">{order.id}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Date
          </p>
          <p className="mt-1 font-semibold text-gray-900">{order.date}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Price
          </p>
          <p className="mt-1 font-semibold text-gray-900">{order.price}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Status
          </p>
          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
