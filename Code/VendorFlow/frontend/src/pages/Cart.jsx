import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import CartItem from '../components/CartItem.jsx'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [lat, setLat] = useState('28.6200')
  const [lng, setLng] = useState('77.2100')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  const saveCart = (updated) => {
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const handleRemove = (productId) => {
    saveCart(cart.filter((i) => i.productId !== productId))
  }

  const handleQuantityChange = (productId, qty) => {
    saveCart(cart.map((i) => i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return
    setError('')
    setLoading(true)

    try {
      const orderPayload = {
        items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        customerLatitude: parseFloat(lat),
        customerLongitude: parseFloat(lng),
      }

      // Step 1: Place order
      const { data: order } = await api.post('/orders', orderPayload)

      // Step 2: Route immediately
      const { data: routeResult } = await api.post(`/orders/${order.orderId}/route`)

      // Clear cart
      localStorage.setItem('cart', '[]')

      // Navigate to confirmation with routing data in state
      navigate(`/orders/${order.orderId}`, { state: { routeResult } })
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started.</p>
        <a href="/browse" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Browse Products
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="space-y-3 mb-6">
        {cart.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      {/* Total */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">📍 Delivery Location</h3>
        <p className="text-xs text-gray-500 mb-3">Used for smart vendor routing. Default: Central Delhi area.</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {loading ? '⏳ Processing & Routing...' : '✅ Place Order & Find Best Vendor'}
      </button>
    </div>
  )
}
