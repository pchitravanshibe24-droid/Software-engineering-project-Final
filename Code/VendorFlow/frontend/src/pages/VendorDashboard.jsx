import { useState, useEffect } from 'react'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function VendorDashboard() {
  const { user } = useAuth()
  const [vendor, setVendor] = useState(null)
  const [products, setProducts] = useState([])
  const [loadingVendor, setLoadingVendor] = useState(true)

  // Onboarding form
  const [onboardForm, setOnboardForm] = useState({
    storeName: '', storeType: 'grocery', latitude: '', longitude: '',
  })
  const [onboardError, setOnboardError] = useState('')
  const [onboardLoading, setOnboardLoading] = useState(false)

  // Product form
  const [productForm, setProductForm] = useState({ name: '', category: '', price: '', stockQty: '' })
  const [editingProductId, setEditingProductId] = useState(null)
  const [productError, setProductError] = useState('')
  const [productLoading, setProductLoading] = useState(false)
  const [productSuccess, setProductSuccess] = useState('')

  useEffect(() => {
    fetchVendorProfile()
  }, [])

  const fetchVendorProfile = async () => {
    try {
      const { data } = await api.get('/vendors/my')
      setVendor(data)
      fetchProducts(data.vendorId)
    } catch {
      // No profile yet
    } finally {
      setLoadingVendor(false)
    }
  }

  const fetchProducts = async (vendorId) => {
    try {
      const { data } = await api.get(`/products?vendor_id=${vendorId}`)
      setProducts(data)
    } catch {}
  }

  const handleOnboard = async (e) => {
    e.preventDefault()
    setOnboardError('')
    setOnboardLoading(true)
    try {
      const { data } = await api.post('/vendors', {
        ...onboardForm,
        latitude: parseFloat(onboardForm.latitude),
        longitude: parseFloat(onboardForm.longitude),
      })
      setVendor(data)
    } catch (err) {
      setOnboardError(err.response?.data?.error || 'Failed to submit profile')
    } finally {
      setOnboardLoading(false)
    }
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setProductError('')
    setProductSuccess('')
    setProductLoading(true)

    try {
      const payload = {
        ...productForm,
        price: parseFloat(productForm.price),
        stockQty: parseInt(productForm.stockQty),
      }

      if (editingProductId) {
        await api.put(`/products/${editingProductId}`, payload)
        setProductSuccess('Product updated!')
      } else {
        await api.post('/products', payload)
        setProductSuccess('Product added!')
      }

      setProductForm({ name: '', category: '', price: '', stockQty: '' })
      setEditingProductId(null)
      fetchProducts(vendor.vendorId)
    } catch (err) {
      setProductError(err.response?.data?.error || 'Failed to save product')
    } finally {
      setProductLoading(false)
      setTimeout(() => setProductSuccess(''), 3000)
    }
  }

  const handleEdit = (product) => {
    setProductForm({
      name: product.name,
      category: product.category || '',
      price: product.price,
      stockQty: product.stockQty,
    })
    setEditingProductId(product.productId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  if (loadingVendor) return <div className="max-w-3xl mx-auto px-4 py-8 text-gray-500">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>

      {/* ── Onboarding / Profile ── */}
      {!vendor ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">🏪 Register Your Store</h2>
          {onboardError && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{onboardError}</div>
          )}
          <form onSubmit={handleOnboard} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  required
                  value={onboardForm.storeName}
                  onChange={(e) => setOnboardForm({ ...onboardForm, storeName: e.target.value })}
                  placeholder="My Grocery Store"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Type</label>
                <select
                  value={onboardForm.storeType}
                  onChange={(e) => setOnboardForm({ ...onboardForm, storeType: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="grocery">Grocery</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  required
                  type="number"
                  step="any"
                  value={onboardForm.latitude}
                  onChange={(e) => setOnboardForm({ ...onboardForm, latitude: e.target.value })}
                  placeholder="28.6139"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  required
                  type="number"
                  step="any"
                  value={onboardForm.longitude}
                  onChange={(e) => setOnboardForm({ ...onboardForm, longitude: e.target.value })}
                  placeholder="77.2090"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={onboardLoading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
            >
              {onboardLoading ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{vendor.storeName}</h2>
              <p className="text-sm text-gray-500 capitalize">{vendor.storeType} · {vendor.latitude?.toFixed(4)}, {vendor.longitude?.toFixed(4)}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[vendor.status] || 'bg-gray-100'}`}>
              {vendor.status?.toUpperCase()}
            </span>
          </div>
          {vendor.status === 'pending' && (
            <p className="text-sm text-yellow-600 mt-3">⏳ Your store is pending admin approval. You can add products in the meantime.</p>
          )}
        </div>
      )}

      {/* ── Inventory ── */}
      {vendor && (
        <>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {editingProductId ? '✏️ Edit Product' : '➕ Add Product'}
            </h2>

            {productError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{productError}</div>
            )}
            {productSuccess && (
              <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">{productSuccess}</div>
            )}

            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Apple"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  placeholder="Fruits"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="50.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={productForm.stockQty}
                  onChange={(e) => setProductForm({ ...productForm, stockQty: e.target.value })}
                  placeholder="100"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={productLoading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
                >
                  {productLoading ? 'Saving...' : editingProductId ? 'Update Product' : 'Add Product'}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={() => { setEditingProductId(null); setProductForm({ name: '', category: '', price: '', stockQty: '' }) }}
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">📦 My Products ({products.length})</h2>
            {products.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No products yet. Add your first product above.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 font-semibold text-gray-600 border-b">Name</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 border-b">Category</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 border-b">Price</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 border-b">Stock</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.productId} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                        <td className="px-4 py-3 text-gray-500">{p.category || '-'}</td>
                        <td className="px-4 py-3 text-gray-700">₹{p.price}</td>
                        <td className="px-4 py-3">
                          <span className={p.stockQty === 0 ? 'text-red-500' : 'text-green-600'}>
                            {p.stockQty}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-indigo-600 hover:underline text-xs font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
