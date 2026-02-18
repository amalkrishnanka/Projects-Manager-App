import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Navbar'

const Login = () => {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('') // email or username
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    if (!identifier.trim()) return 'Please enter email or username'
    if (!password.trim()) return 'Please enter password'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 600)
    }, 600)
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
        linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px),
        radial-gradient(circle at 30% 20%, rgba(99,102,241,0.08) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%, 100% 100%",
      }}>
        <Nav />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-linear-to-br from-white/95 to-slate-50/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold mb-2 text-center bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Sign in</h2>
            <p className="text-center text-gray-600 mb-8 text-sm">Welcome back to your dashboard</p>

            {error && <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">⚠️ {error}</div>}
            {success && <div role="status" className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 mb-4">✓ Signed in (demo). Redirecting…</div>}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email or Username</label>
                <input
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="you@example.com or username"
                  aria-label="email or username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Your password"
                  aria-label="password"
                />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed">
                {loading ? '⏳ Signing in…' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:text-cyan-600 transition-colors duration-300">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
