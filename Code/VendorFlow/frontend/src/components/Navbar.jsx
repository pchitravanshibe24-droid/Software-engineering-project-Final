import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const cartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      return cart.reduce((sum, item) => sum + item.quantity, 0)
    } catch {
      return 0
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const roleBadgeColor = {
    admin: 'bg-red-100 text-red-700',
    vendor: 'bg-blue-100 text-blue-700',
    customer: 'bg-green-100 text-green-700',
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">VendorFlow</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Role nav links */}
                {user.role === 'customer' && (
                  <Link to="/browse" className="text-sm text-gray-600 hover:text-indigo-600">Browse</Link>
                )}
                {user.role === 'vendor' && (
                  <Link to="/vendor" className="text-sm text-gray-600 hover:text-indigo-600">Dashboard</Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm text-gray-600 hover:text-indigo-600">Admin Panel</Link>
                )}

                {/* Cart for customers */}
                {user.role === 'customer' && (
                  <Link to="/cart" className="relative text-sm text-gray-600 hover:text-indigo-600">
                    🛒
                    {cartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount()}
                      </span>
                    )}
                  </Link>
                )}

                {/* User info */}
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleBadgeColor[user.role] || 'bg-gray-100 text-gray-700'}`}>
                  {user.role}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600">Login</Link>
                <Link to="/register" className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
