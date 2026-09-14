export default function RoutingResult({ routeData }) {
  if (!routeData) return null

  const { assignedVendor, allCandidates } = routeData

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-indigo-600 text-white px-6 py-4">
        <h2 className="text-lg font-bold">🧠 Smart Routing Result</h2>
        <p className="text-indigo-200 text-sm mt-0.5">Vendor selected using weighted scoring algorithm</p>
      </div>

      {/* Winner box */}
      <div className="bg-green-50 border-b border-green-100 px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-green-600 text-xl">✅</span>
          <h3 className="font-bold text-green-800 text-lg">Winner: {assignedVendor?.storeName}</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          <Stat label="Score" value={assignedVendor?.score?.toFixed(4)} highlight />
          <Stat label="Distance" value={`${assignedVendor?.distance?.toFixed(2)} km`} />
          <Stat label="Stock Available" value={assignedVendor?.totalStock} />
          <Stat label="Reliability" value={`${assignedVendor?.reliabilityScore} / 5`} />
        </div>
      </div>

      {/* Score breakdown table */}
      <div className="px-6 py-4">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📊</span> All Candidates — Score Breakdown
        </h3>
        <div className="text-xs text-gray-500 mb-3 bg-gray-50 rounded p-2">
          Formula: Score = (0.4 × 1/(1+distance)) + (0.3 × stockFlag) + (0.3 × reliability/5)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-3 py-2 font-semibold text-gray-600 border-b">#</th>
                <th className="px-3 py-2 font-semibold text-gray-600 border-b">Store</th>
                <th className="px-3 py-2 font-semibold text-gray-600 border-b">Distance (km)</th>
                <th className="px-3 py-2 font-semibold text-gray-600 border-b">Stock</th>
                <th className="px-3 py-2 font-semibold text-gray-600 border-b">Reliability</th>
                <th className="px-3 py-2 font-semibold text-gray-600 border-b">Score</th>
              </tr>
            </thead>
            <tbody>
              {allCandidates?.map((c, idx) => {
                const isWinner = c.vendorId === assignedVendor?.vendorId
                return (
                  <tr
                    key={c.vendorId}
                    className={`border-b ${isWinner ? 'bg-green-50 font-semibold' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-3 py-2 text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-gray-800">
                      {isWinner && '🏆 '}{c.storeName}
                    </td>
                    <td className="px-3 py-2 text-gray-600">{c.distance?.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className={c.stockAvailable ? 'text-green-600' : 'text-red-500'}>
                        {c.stockAvailable ? `✅ ${c.totalStock}` : '❌ 0'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-600">⭐ {c.reliabilityScore?.toFixed(1)}</td>
                    <td className={`px-3 py-2 font-bold ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
                      {c.score?.toFixed(4)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, highlight = false }) {
  return (
    <div className={`rounded-lg p-3 text-center ${highlight ? 'bg-green-100' : 'bg-gray-50'}`}>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className={`font-bold text-lg ${highlight ? 'text-green-700' : 'text-gray-800'}`}>{value}</p>
    </div>
  )
}
