import React from 'react'
import { NavLink } from "react-router";
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    Settings,
    House,
} from "lucide-react";

const navItems = [
    {to: "/", label: "Home", icon: House},
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/projects", label: "Projects", icon: FolderKanban },
    { to: "/tasks", label: "Tasks", icon: CheckSquare },
    { to: "/team", label: "Team", icon: Users },
];

const Sidebar = () => {
    return (
        <aside className='hidden sm:w-[15%] sm:min-w-3xs bg-zinc-900 sm:flex flex-col h-full rounded-lg'>
            <div className='w-full flex flex-col justify-start p-6 border-b border-b-zinc-700 text-blue-50'>
                <h2 className='text-2xl'>Project Hub</h2>
                <h3 className='text-sm text-gray-400'>Project Management</h3>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-50 text-zinc-900"
                                        : "text-blue-50 hover:bg-zinc-800"
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-zinc-700">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-blue-50 hover:bg-zinc-800 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
