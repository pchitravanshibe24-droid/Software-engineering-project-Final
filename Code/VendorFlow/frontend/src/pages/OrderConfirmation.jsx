import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import api from '../api/axios.js'
import RoutingResult from '../components/RoutingResult.jsx'

export default function OrderConfirmation() {
  const { id } = useParams()
  const location = useLocation()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Routing result passed via navigation state from Cart page
  const routeResult = location.state?.routeResult

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`)
      setOrder(data)
    } catch (err) {
      setError('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-8 text-gray-500">Loading order...</div>
  if (error) return <div className="max-w-3xl mx-auto px-4 py-8 text-red-500">{error}</div>

  const statusColor = {
    placed: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Order summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Order #{order.orderId}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[order.status] || 'bg-gray-100 text-gray-700'}`}>
            {order.status?.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Total Amount</p>
            <p className="font-bold text-gray-800 text-lg">₹{order.totalAmount}</p>
          </div>
          {order.vendor && (
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Assigned Vendor</p>
              <p className="font-semibold text-gray-800">{order.vendor.storeName}</p>
              <p className="text-xs text-gray-500 capitalize">{order.vendor.storeType}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Created</p>
            <p className="text-gray-700">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Routing result */}
      {routeResult && <RoutingResult routeData={routeResult} />}

      {!routeResult && order.status === 'confirmed' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm">
          ✅ This order has been routed and confirmed to <strong>{order.vendor?.storeName}</strong>.
        </div>
      )}

      <div className="text-center">
        <Link to="/browse" className="text-indigo-600 hover:underline text-sm">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}
