export default function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stockQty === 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
          {product.category && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{product.category}</span>
          )}
        </div>
        <span className="text-indigo-600 font-bold text-lg">₹{product.price}</span>
      </div>

      <div className="text-sm text-gray-500">
        {product.vendor?.storeName && (
          <p>🏪 {product.vendor.storeName}</p>
        )}
        <p className={isOutOfStock ? 'text-red-500' : 'text-green-600'}>
          {isOutOfStock ? '❌ Out of Stock' : `✅ In Stock (${product.stockQty})`}
        </p>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        disabled={isOutOfStock}
        className={`mt-auto w-full py-2 rounded-lg text-sm font-medium transition-colors
          ${isOutOfStock
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  )
}
