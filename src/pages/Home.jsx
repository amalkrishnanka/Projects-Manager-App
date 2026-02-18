import { React, useRef } from 'react'
import Nav from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const registerRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    const value = registerRef.current.value;
    navigate(`/register?email=${encodeURIComponent(value)}`);
  };

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
      }}></div>
      <Nav />
      <header className="max-w-5xl mx-auto py-24 px-6 text-center relative z-10">
        <h1 className="text-6xl font-bold leading-tight tracking-tight bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          Project Tasks Manager
        </h1>
        <p className="text-lg text-slate-600 mb-5 max-w-2xl mx-auto leading-relaxed">
          Plan, track, and deliver projects with clear boards, tasks and timelines.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input ref={registerRef} type="text" className="text-md sm:w-[50%] px-4 py-3 border border-slate-400/50 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm" placeholder='you@example.com' />
          <button onClick={handleClick} className="bg-linear-to-r cursor-pointer from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Get started
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Organize Work</h3>
              <p className="text-slate-600">Create projects, organize tasks into lists and keep priorities visible.</p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Collaborate</h3>
              <p className="text-slate-600">Invite teammates, comment on tasks, and share updates in real time.</p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-100 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-indigo-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Track Progress</h3>
              <p className="text-slate-600">Use dashboards and reports to track milestones and deadlines.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home