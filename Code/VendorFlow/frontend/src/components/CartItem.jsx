export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex-1">
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-500">₹{item.price} each</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.productId, parseInt(e.target.value) || 1)}
          className="w-16 border border-gray-300 rounded-md text-center text-sm py-1"
        />
        <span className="text-gray-700 font-semibold w-20 text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => onRemove(item.productId)}
          className="text-red-400 hover:text-red-600 text-lg leading-none"
          title="Remove"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
