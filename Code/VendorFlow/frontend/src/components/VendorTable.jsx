export default function VendorTable({ vendors, onApprove, onReject, showActions = false }) {
  if (!vendors || vendors.length === 0) {
    return <p className="text-gray-500 text-sm italic">No vendors found.</p>
  }

  const statusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-600 border-b">Store Name</th>
            <th className="px-4 py-3 font-semibold text-gray-600 border-b">Type</th>
            <th className="px-4 py-3 font-semibold text-gray-600 border-b">Location</th>
            <th className="px-4 py-3 font-semibold text-gray-600 border-b">Reliability</th>
            <th className="px-4 py-3 font-semibold text-gray-600 border-b">Status</th>
            {showActions && (
              <th className="px-4 py-3 font-semibold text-gray-600 border-b">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.vendorId} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{v.storeName}</td>
              <td className="px-4 py-3 text-gray-600 capitalize">{v.storeType}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {v.latitude?.toFixed(4)}, {v.longitude?.toFixed(4)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                ⭐ {v.reliabilityScore?.toFixed(1)} / 5
              </td>
              <td className="px-4 py-3">{statusBadge(v.status)}</td>
              {showActions && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onApprove(v.vendorId)}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(v.vendorId)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
