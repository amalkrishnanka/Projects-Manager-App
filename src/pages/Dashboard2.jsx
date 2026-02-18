import React, { useEffect, useState } from 'react'
import Nav from '../components/Navbar'

const CURRENT_USER = 'amalkrishnan2004';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const [selectedOwner, setSelectedOwner] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProgressRange, setSelectedProgressRange] = useState('All');
  
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const [editingStatusId, setEditingStatusId] = useState(null);
  const [statusUpdateMsg, setStatusUpdateMsg] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    totalTasks: '',
    dueDate: '',
    priority: 1,
    status: 'Not Started',
  });
  const [createError, setCreateError] = useState('');

  // Delete confirmation state
  const [deletingProjectId, setDeletingProjectId] = useState(null);

  const nextId = React.useRef(8);
  
  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "PROJECT 1",
        priority: 2,
        totalTasks: 20,
        completedTasks: 5,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'amalkrishnan2004',
        dueDate: '2026-03-15',
        status: 'In Progress'
      },
      {
        id: 2,
        name: "PROJECT 2",
        priority: 0,
        totalTasks: 20,
        completedTasks: 20,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'john_doe',
        dueDate: '2026-02-28',
        status: 'Completed'
      },
      {
        id: 3,
        name: "PROJECT 3",
        priority: 1,
        totalTasks: 20,
        completedTasks: 5,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'jane_smith',
        dueDate: '2026-04-10',
        status: 'In Progress'
      },
      {
        id: 4,
        name: "PROJECT 4",
        priority: 1,
        totalTasks: 15,
        completedTasks: 0,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'amalkrishnan2004',
        dueDate: '2026-05-20',
        status: 'Not Started'
      },
      {
        id: 5,
        name: "PROJECT 5",
        priority: 1,
        totalTasks: 25,
        completedTasks: 18,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'john_doe',
        dueDate: '2026-03-05',
        status: 'In Progress'
      },
      {
        id: 6,
        name: "PROJECT 6",
        priority: 1,
        totalTasks: 30,
        completedTasks: 30,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'jane_smith',
        dueDate: '2026-02-15',
        status: 'Completed'
      },
      {
        id: 7,
        name: "PROJECT 7",
        priority: 1,
        totalTasks: 12,
        completedTasks: 0,
        assignedUsers: ['someone21', 'someone23'],
        creator: 'amalkrishnan2004',
        dueDate: '2026-06-01',
        status: 'Not Started'
      },
    ];
    const sorted = data.sort((a, b) => b.priority - a.priority);
    setProjects(sorted);
    setFilteredProjects(sorted);
  }, []);

  const owners = ['All', ...new Set(projects.map(p => p.creator))];
  
  useEffect(() => {
    let filtered = [...projects];
    
    if (selectedOwner !== 'All') {
      filtered = filtered.filter(p => p.creator === selectedOwner);
    }
    
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }
    
    if (selectedProgressRange !== 'All') {
      filtered = filtered.filter(p => {
        const progress = (p.completedTasks / p.totalTasks) * 100;
        switch (selectedProgressRange) {
          case '0-25':
            return progress >= 0 && progress <= 25;
          case '26-50':
            return progress > 25 && progress <= 50;
          case '51-75':
            return progress > 50 && progress <= 75;
          case '76-100':
            return progress > 75 && progress <= 100;
          default:
            return true;
        }
      });
    }
    
    filtered.sort((a, b) => {
      let compareValue = 0;
      switch (sortBy) {
        case 'dueDate':
          compareValue = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        case 'progress':
          const progressA = (a.completedTasks / a.totalTasks) * 100;
          const progressB = (b.completedTasks / b.totalTasks) * 100;
          compareValue = progressA - progressB;
          break;
        case 'status':
          const statusOrder = { 'Not Started': 0, 'In Progress': 1, 'Completed': 2 };
          compareValue = statusOrder[a.status] - statusOrder[b.status];
          break;
        default:
          compareValue = 0;
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });
    
    setFilteredProjects(filtered);
  }, [projects, selectedOwner, selectedStatus, selectedProgressRange, sortBy, sortOrder]);
  
  const resetFilters = () => {
    setSelectedOwner('All');
    setSelectedStatus('All');
    setSelectedProgressRange('All');
    setSortBy('dueDate');
    setSortOrder('asc');
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p)
    );
    setEditingStatusId(null);

    const projectName = projects.find(p => p.id === projectId)?.name;
    setStatusUpdateMsg(`${projectName} status updated to "${newStatus}"`);
    setTimeout(() => setStatusUpdateMsg(null), 3000);
  };

  // ── Create Project ──────────────────────────────────────────────
  const openCreateModal = () => {
    setNewProject({ name: '', totalTasks: '', dueDate: '', priority: 1, status: 'Not Started' });
    setCreateError('');
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCreateError('');
  };

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      setCreateError('Project name is required.');
      return;
    }
    if (!newProject.totalTasks || parseInt(newProject.totalTasks) < 1) {
      setCreateError('Total tasks must be at least 1.');
      return;
    }
    if (!newProject.dueDate) {
      setCreateError('Due date is required.');
      return;
    }

    const created = {
      id: nextId.current++,
      name: newProject.name.trim().toUpperCase(),
      priority: parseInt(newProject.priority),
      totalTasks: parseInt(newProject.totalTasks),
      completedTasks: 0,
      assignedUsers: [],
      creator: CURRENT_USER,
      dueDate: newProject.dueDate,
      status: newProject.status,
    };

    setProjects(prev => [created, ...prev]);
    closeCreateModal();
    setStatusUpdateMsg(`"${created.name}" created successfully!`);
    setTimeout(() => setStatusUpdateMsg(null), 3000);
  };

  // ── Delete Project ──────────────────────────────────────────────
  const handleDeleteProject = (projectId) => {
    const projectName = projects.find(p => p.id === projectId)?.name;
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setDeletingProjectId(null);
    setStatusUpdateMsg(`"${projectName}" has been deleted.`);
    setTimeout(() => setStatusUpdateMsg(null), 3000);
  };

  // ── Stats ───────────────────────────────────────────────────────
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
  const notStartedProjects = projects.filter(p => p.status === 'Not Started').length;
  const totalTimeSpent = 142;
  
  const chartData = [
    { label: 'Completed', value: completedProjects, color: '#10b981' },
    { label: 'In Progress', value: inProgressProjects, color: '#f59e0b' },
    { label: 'Not Started', value: notStartedProjects, color: '#6366f1' }
  ];

  const CircularChart = ({ data, size = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    };

    const createArc = (startAngle, endAngle, radius) => {
      const start = polarToCartesian(size / 2, size / 2, radius, endAngle);
      const end = polarToCartesian(size / 2, size / 2, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <svg width={size} height={size}>
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;
            const path = createArc(startAngle, endAngle, size / 2 - 20);
            return (
              <path
                key={index}
                d={path}
                fill="none"
                stroke={item.color}
                strokeWidth="30"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 50} fill="white" />
          <text x={size / 2} y={size / 2 - 10} textAnchor="middle" className="text-3xl font-bold fill-indigo-600">
            {total}
          </text>
          <text x={size / 2} y={size / 2 + 15} textAnchor="middle" className="text-sm fill-zinc-500">
            Total Projects
          </text>
        </svg>
        <div className="flex flex-wrap gap-4 justify-center">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-zinc-700">
                {item.label}: <span className="font-semibold">{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const statusColors = {
    'Completed': 'bg-green-100 text-green-700 border-green-300',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-300',
    'Not Started': 'bg-indigo-100 text-indigo-700 border-indigo-300'
  };

  const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' };

  return (
    <div className="min-h-screen max-h-screen w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 relative flex flex-col">
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px),
          radial-gradient(circle at 30% 20%, rgba(99,102,241,0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%, 100% 100%",
      }} />
      
      <Nav />

      {/* Toast notification */}
      {statusUpdateMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-2xl animate-pulse">
          <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {statusUpdateMsg}
        </div>
      )}

      {/* ── Create Project Modal ─────────────────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            onClick={closeCreateModal}
          />

          {/* Modal panel */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-zinc-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-zinc-800">New Project</h2>
                </div>
                <button
                  onClick={closeCreateModal}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {createError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {createError}
                </div>
              )}

              {/* Project Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Project Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Website Redesign"
                  value={newProject.name}
                  onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))}
                  className="px-4 py-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Total Tasks + Due Date side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700">
                    Total Tasks <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 10"
                    value={newProject.totalTasks}
                    onChange={e => setNewProject(p => ({ ...p, totalTasks: e.target.value }))}
                    className="px-4 py-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700">
                    Due Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={newProject.dueDate}
                    onChange={e => setNewProject(p => ({ ...p, dueDate: e.target.value }))}
                    className="px-4 py-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Priority + Status side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={e => setNewProject(p => ({ ...p, priority: e.target.value }))}
                    className="px-4 py-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700">Status</label>
                  <select
                    value={newProject.status}
                    onChange={e => setNewProject(p => ({ ...p, status: e.target.value }))}
                    className="px-4 py-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Creator (read-only) */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-500">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Owner: <span className="font-medium text-zinc-700 ml-1">{CURRENT_USER}</span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-6 pb-6 flex gap-3 justify-end">
              <button
                onClick={closeCreateModal}
                className="px-5 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-800 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ────────────────────────────── */}
      {deletingProjectId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            onClick={() => setDeletingProjectId(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-800">Delete Project</h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-zinc-700">
                      {projects.find(p => p.id === deletingProjectId)?.name}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3 justify-center">
              <button
                onClick={() => setDeletingProjectId(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deletingProjectId)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-1 w-full overflow-auto p-6 flex flex-col gap-6 z-10">
        <div className='flex border-b border-zinc-400 justify-between items-center w-full pb-1'>
          <h1 className='text-4xl font-semibold leading-tight tracking-tight bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent'>
            DASHBOARD
          </h1>
          <div className="flex items-center gap-4">
            {/* Create Project Button */}
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>

            {/* Current user indicator */}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium text-zinc-700">{CURRENT_USER}</span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-sm text-zinc-600 font-medium mb-1'>Total Projects</p>
                  <h3 className='text-3xl font-bold text-indigo-600'>{totalProjects}</h3>
                </div>
                <div className='bg-indigo-100 p-3 rounded-lg'>
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-sm text-zinc-600 font-medium mb-1'>Completed</p>
                  <h3 className='text-3xl font-bold text-green-600'>{completedProjects}</h3>
                  <p className='text-xs text-zinc-500 mt-1'>{totalProjects ? ((completedProjects/totalProjects)*100).toFixed(0) : 0}% of total</p>
                </div>
                <div className='bg-green-100 p-3 rounded-lg'>
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-sm text-zinc-600 font-medium mb-1'>In Progress</p>
                  <h3 className='text-3xl font-bold text-amber-600'>{inProgressProjects}</h3>
                  <p className='text-xs text-zinc-500 mt-1'>{totalProjects ? ((inProgressProjects/totalProjects)*100).toFixed(0) : 0}% of total</p>
                </div>
                <div className='bg-amber-100 p-3 rounded-lg'>
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='bg-white/80 backdrop-blur-sm border border-cyan-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-sm text-zinc-600 font-medium mb-1'>Time Spent</p>
                  <h3 className='text-3xl font-bold text-cyan-600'>{totalTimeSpent}h</h3>
                  <p className='text-xs text-zinc-500 mt-1'>This month</p>
                </div>
                <div className='bg-cyan-100 p-3 rounded-lg'>
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Summary and Chart Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 bg-white/80 backdrop-blur-sm border border-zinc-300 rounded-xl shadow-lg overflow-hidden'>
            <div className='p-6 border-b border-zinc-200 bg-linear-to-r from-indigo-50 to-blue-50'>
              <div className='flex items-center justify-between mb-4'>
                <div className="flex items-center gap-3">
                  <h2 className='text-xl font-semibold text-zinc-800'>Projects Summary</h2>
                </div>
                <span className='text-sm text-zinc-600'>
                  Showing <span className='font-semibold text-indigo-600'>{filteredProjects.length}</span> of {projects.length}
                </span>
              </div>
              
              <div className='flex flex-wrap gap-3'>
                <select
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                  className='px-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm font-medium text-zinc-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer'
                >
                  <option value="All">All Owners</option>
                  {owners.filter(o => o !== 'All').map(owner => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className='px-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm font-medium text-zinc-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer'
                >
                  <option value="All">All Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  value={selectedProgressRange}
                  onChange={(e) => setSelectedProgressRange(e.target.value)}
                  className='px-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm font-medium text-zinc-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer'
                >
                  <option value="All">All Progress</option>
                  <option value="0-25">0-25%</option>
                  <option value="26-50">26-50%</option>
                  <option value="51-75">51-75%</option>
                  <option value="76-100">76-100%</option>
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className='px-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm font-medium text-zinc-700 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer'
                >
                  <option value="dueDate-asc">Due Date (Earliest)</option>
                  <option value="dueDate-desc">Due Date (Latest)</option>
                  <option value="progress-asc">Progress (Low to High)</option>
                  <option value="progress-desc">Progress (High to Low)</option>
                  <option value="status-asc">Status (A-Z)</option>
                  <option value="status-desc">Status (Z-A)</option>
                </select>

                {(selectedOwner !== 'All' || selectedStatus !== 'All' || selectedProgressRange !== 'All' || sortBy !== 'dueDate' || sortOrder !== 'asc') && (
                  <button
                    onClick={resetFilters}
                    className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-300 rounded-lg transition-all duration-200'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                )}
              </div>
            </div>
            
            <div className='overflow-x-auto max-h-96 overflow-y-auto'>
              <table className='w-full'>
                <thead className='bg-zinc-50 sticky top-0'>
                  <tr>
                    <th className='text-left p-4 text-sm font-semibold text-zinc-700 border-b border-zinc-200'>Project Name</th>
                    <th className='text-left p-4 text-sm font-semibold text-zinc-700 border-b border-zinc-200'>Owner</th>
                    <th className='text-left p-4 text-sm font-semibold text-zinc-700 border-b border-zinc-200'>Due Date</th>
                    <th className='text-left p-4 text-sm font-semibold text-zinc-700 border-b border-zinc-200'>Status</th>
                    <th className='text-left p-4 text-sm font-semibold text-zinc-700 border-b border-zinc-200'>Progress</th>
                    <th className='text-left p-4 text-sm font-semibold text-zinc-700 border-b border-zinc-200'></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => {
                      const progress = ((project.completedTasks / project.totalTasks) * 100).toFixed(0);
                      const isOwner = project.creator === CURRENT_USER;
                      const isEditing = editingStatusId === project.id;
                      
                      return (
                        <tr
                          key={index}
                          className={`transition-colors duration-150 ${isOwner ? 'hover:bg-indigo-50/70' : 'hover:bg-indigo-50/30'}`}
                        >
                          <td className='p-4 border-b border-zinc-100'>
                            <div className="flex items-center gap-2">
                              <span className='font-medium text-zinc-800'>{project.name}</span>
                              {isOwner && (
                                <span className="text-xs px-1.5 py-0.5 bg-indigo-50 text-indigo-500 border border-indigo-200 rounded font-medium">
                                  yours
                                </span>
                              )}
                            </div>
                          </td>
                          <td className='p-4 border-b border-zinc-100'>
                            <span className='text-sm text-zinc-600'>{project.creator}</span>
                          </td>
                          <td className='p-4 border-b border-zinc-100'>
                            <span className='text-sm text-zinc-600'>{new Date(project.dueDate).toLocaleDateString()}</span>
                          </td>
                          <td className='p-4 border-b border-zinc-100'>
                            {isOwner ? (
                              <div className="relative">
                                {isEditing ? (
                                  <div className="flex items-center gap-1">
                                    {['Not Started', 'In Progress', 'Completed'].map(s => (
                                      <button
                                        key={s}
                                        onClick={() => handleStatusChange(project.id, s)}
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150
                                          ${project.status === s
                                            ? statusColors[s] + ' ring-2 ring-offset-1 ring-indigo-400 scale-105'
                                            : 'bg-zinc-100 text-zinc-500 border-zinc-200 hover:' + statusColors[s]
                                          }`}
                                      >
                                        {s === 'Not Started' ? 'Not Started' : s === 'In Progress' ? 'In Progress' : 'Done'}
                                      </button>
                                    ))}
                                    <button
                                      onClick={() => setEditingStatusId(null)}
                                      className="ml-1 p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                                      title="Cancel"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setEditingStatusId(project.id)}
                                    className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:shadow-sm hover:scale-105 ${statusColors[project.status]}`}
                                    title="Click to change status"
                                  >
                                    {project.status}
                                    <svg
                                      className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                                {project.status}
                              </span>
                            )}
                          </td>
                          <td className='p-4 border-b border-zinc-100'>
                            <div className='flex items-center gap-3'>
                              <div className='flex-1 bg-zinc-200 rounded-full h-2 overflow-hidden'>
                                <div
                                  className='bg-linear-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-500'
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className='text-sm font-semibold text-zinc-700 min-w-12'>{progress}%</span>
                            </div>
                          </td>

                          {/* Delete button — only visible for current user's projects */}
                          <td className='p-4 border-b border-zinc-100'>
                            {isOwner && (
                              <button
                                onClick={() => setDeletingProjectId(project.id)}
                                className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                                title="Delete project"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className='p-8 text-center text-zinc-500'>
                        <div className='flex flex-col items-center gap-2'>
                          <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className='font-medium'>No projects found</p>
                          <p className='text-sm'>Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Circular Chart */}
          <div className='bg-white/80 backdrop-blur-sm border border-zinc-300 rounded-xl shadow-lg p-8'>
            <h2 className='text-xl font-semibold text-zinc-800 mb-6'>Project Status</h2>
            <div className='flex items-center justify-center h-[90%]'>
              <CircularChart data={chartData} size={240} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;