import { useState, useEffect } from 'react'
import api from '../api/axios.js'
import VendorTable from '../components/VendorTable.jsx'

export default function AdminDashboard() {
  const [pendingVendors, setPendingVendors] = useState([])
  const [approvedVendors, setApprovedVendors] = useState([])
  const [rejectedVendors, setRejectedVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionMsg, setActionMsg] = useState('')

  useEffect(() => {
    fetchAllVendors()
  }, [])

  const fetchAllVendors = async () => {
    setLoading(true)
    try {
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        api.get('/vendors?status=pending'),
        api.get('/vendors?status=approved'),
        api.get('/vendors?status=rejected'),
      ])
      setPendingVendors(pendingRes.data)
      setApprovedVendors(approvedRes.data)
      setRejectedVendors(rejectedRes.data)
    } catch (err) {
      setError('Failed to load vendors')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (vendorId) => {
    try {
      await api.patch(`/vendors/${vendorId}/approve`)
      setActionMsg('Vendor approved successfully!')
      setTimeout(() => setActionMsg(''), 3000)
      fetchAllVendors()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to approve vendor')
    }
  }

  const handleReject = async (vendorId) => {
    try {
      await api.patch(`/vendors/${vendorId}/reject`)
      setActionMsg('Vendor rejected.')
      setTimeout(() => setActionMsg(''), 3000)
      fetchAllVendors()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reject vendor')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage vendor approvals</p>
        </div>
        <button
          onClick={fetchAllVendors}
          className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          🔄 Refresh
        </button>
      </div>

      {actionMsg && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
          ✅ {actionMsg}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Pending */}
          <div className="bg-white rounded-xl border border-yellow-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-yellow-700 mb-4">
              ⏳ Pending Approval ({pendingVendors.length})
            </h2>
            <VendorTable
              vendors={pendingVendors}
              onApprove={handleApprove}
              onReject={handleReject}
              showActions={true}
            />
          </div>

          {/* Approved */}
          <div className="bg-white rounded-xl border border-green-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-green-700 mb-4">
              ✅ Approved Vendors ({approvedVendors.length})
            </h2>
            <VendorTable vendors={approvedVendors} showActions={false} />
          </div>

          {/* Rejected */}
          {rejectedVendors.length > 0 && (
            <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-red-700 mb-4">
                ❌ Rejected Vendors ({rejectedVendors.length})
              </h2>
              <VendorTable vendors={rejectedVendors} showActions={false} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
