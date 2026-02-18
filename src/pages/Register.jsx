import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import Nav from '../components/Navbar'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, []);

  function validate() {
    if (!username.trim()) return 'Please enter a username'
    if (username.length < 3) return 'Username must be at least 3 characters'
    if (!emailRe.test(email)) return 'Please enter a valid email'
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
      setTimeout(() => navigate('/dashboard'), 700)
    }, 700)
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
            <h2 className="text-3xl font-bold mb-2 text-center bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Create Account</h2>
            <p className="text-center text-gray-600 mb-8 text-sm">Join us and get started today</p>

            {error && <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">⚠️ {error}</div>}
            {success && <div role="status" className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 mb-4">✓ Account created (demo). Redirecting…</div>}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Choose a username"
                  aria-label="username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="you@example.com"
                  aria-label="email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Choose a password"
                  aria-label="password"
                />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed">
                {loading ? '⏳ Creating…' : 'Register'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:text-cyan-600 transition-colors duration-300">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
