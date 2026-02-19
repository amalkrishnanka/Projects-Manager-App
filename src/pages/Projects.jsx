import React from 'react';
import { NavLink } from "react-router";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Calendar, Plus } from 'lucide-react';

import { projects, activityData, tasks, teamMembers } from "../data/mockData";
const Projects = () => {
  return (
    <div className='w-screen h-screen bg-zinc-950 p-2 flex gap-1'>
        <Sidebar />
        <div className='w-full flex flex-col gap-1'>
            <Navbar />
            <div className='flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-4'>
                <header className='flex flex-col gap-4 mt-2'>
                    <span className='w-full flex justify-between'>
                        <h1 className='text-white text-3xl'>Projects</h1>
                        <button className='bg-blue-50 px-2 rounded-lg cursor-pointer text-zinc-900 font-medium text-sm hover:scale-105 transition-all duration-300'>
                            <span className='flex items-center gap-2'><Plus className='w-5 h-5' />New Project</span>
                        </button>
                    </span>
                    <h2 className='text-zinc-500 text-md -mt-4'>Manage and track all your projects</h2>
                </header>
                <main className='w-full h-full grid sm:grid-cols-3 rounded-lg gap-4'>
                    {projects.map((project) => {
                        const progress = project.tasksCount ? Math.floor(project.completedTasks * 100 / project.tasksCount) : 0;
                    return (
                        <NavLink key={project.id} to={`/projects/${project.id}`} className='block'>
                            <div className='flex flex-col gap-2 p-6 justify-center items-start text-blue-50 w-full h-fit bg-zinc-900 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-zinc-500/20 hover:outline-1 hover:outline-zinc-500/25'>
                                <h3 className='text-lg font-medium'>{project.name}</h3>
                                <p className='text-sm text-zinc-400 text-start'>{project.description}</p>
                                <span className='w-full flex justify-between mt-4'>
                                    <p className='text-sm text-zinc-400'>Progress</p>
                                    <p className='text-sm text-blue-50'>{progress}%</p>
                                </span>
                                <div className='w-full h-1.5 bg-zinc-700 rounded-full'>
                                    <div className='h-full bg-white rounded-full origin-left animate-[grow_0.7s_ease-out_forwards]' style={{ "--target": progress / 100 }}></div>
                                </div>
                                <div className='w-full flex justify-between mt-4'>
                                    <span className='flex gap-2'>
                                        <Calendar className='w-4 h-4 text-zinc-400' />
                                        <p className='text-sm text-zinc-400'>Due {project.dueDate}</p>
                                    </span>
                                    <p className='text-sm text-zinc-400'>{project.completedTasks} / {project.tasksCount} tasks</p>
                                </div>
                                <div className='w-full flex justify-start border-t border-t-zinc-600 mt-4 pt-4 -space-x-2'>
                                    {project.team.map((member, id) => (
                                        <div key={id} className='w-8 border border-zinc-500 aspect-square rounded-full bg-gray-600 flex justify-center items-center text-xs'>
                                            {member.name.split(" ").map(word => word[0]).join("").toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </NavLink>
                    );})}
                </main>
            </div>
        </div>
    </div>
  )
}

export default Projects
