import React from 'react'
import { NavLink } from "react-router";
import { useParams } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import { ArrowLeft, Pencil, Calendar, Clock, Users, CircleCheck, ListTodo, Activity, TextSearch, ListChecks, Funnel, SlidersHorizontal } from 'lucide-react';

import { projects, tasks } from "../data/mockData";

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const todoTasks = tasks.filter(task => task.projectId === id && task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.projectId === id && task.status === "in-progress");
    const reviewTasks = tasks.filter(task => task.projectId === id && task.status === "review");
    const completedTasks = tasks.filter(task => task.projectId === id && task.status === "done");
    const projectOverview = [
        { title: 'Progress', value: `${Math.floor(project.completedTasks * 100 / project.tasksCount)}%`, icon: CircleCheck },
        { title: 'Due Date', value: project.dueDate, icon: Clock },
        { title: 'Tasks', value: `${project.completedTasks}/${project.tasksCount}`, icon: Calendar },
        { title: 'Team', value: project.team.length, icon: Users },
    ];
    return (
        <div className='w-screen h-screen bg-zinc-950 p-2 flex gap-1'>
            <Sidebar />
            <div className='w-full flex flex-col gap-1'>
                <Navbar />
                <div className='flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 w-full h-full'>
                    <NavLink to='/projects' className='block mt-2 w-fit'>
                        <span className='flex justify-start items-center gap-2 text-zinc-500 text-md hover:text-zinc-400'><ArrowLeft className='w-5 h-5' />Back to Projects</span>
                    </NavLink>
                    <header className='flex flex-col gap-4'>
                        <span className='w-full flex justify-between'>
                            <h1 className='text-white text-3xl'>{project.name}</h1>
                            <button className='bg-blue-50 px-2 rounded-lg cursor-pointer text-zinc-900 font-medium text-sm hover:scale-105 transition-all duration-300'>
                                <span className='flex items-center gap-2'><Pencil className='w-4 h-4' />Edit Project</span>
                            </button>
                        </span>
                        <h2 className='text-zinc-500 text-md -mt-4'>{project.description}</h2>
                    </header>
                    <main className='w-full h-full flex flex-col rounded-lg gap-4'>
                        {/* Overview */}
                        <section className='w-full flex gap-4 flex-wrap justify-center items-center'>
                            {projectOverview.map((card, key) => (
                                <div key={key} className='bg-zinc-900 p-6 min-w-fit w-[25%] rounded-lg text-white flex flex-1 justify-start items-center gap-8'>
                                    <card.icon className='w-8 h-8' />
                                    <span className='flex flex-col items-start text-zinc-400'>
                                        <p className='text-xs'>{card.title}</p>
                                        <h3 className='text-lg font-bold text-blue-50'>{card.value}</h3>
                                    </span>
                                </div>
                            ))}
                        </section>

                        {/* Tasks Section */}
                        <section className='w-full h-full grid sm:grid-cols-[3fr_1fr] gap-4'>
                            <div className='grid sm:grid-cols-2 gap-4 items-start'>
                                <div className='w-full h-full bg-zinc-900 rounded-lg p-4 flex flex-col justify-start items-start text-blue-50 gap-3 max-h-[70vh]'>
                                    <div className='flex items-center gap-2 relative w-full'>
                                        <ListTodo className='w-5 h-5' />
                                        <h3 className='text-md'>{`To-Do (${todoTasks.length})`}</h3>
                                        <Funnel strokeWidth={0} className='w-5 h-5 absolute right-0 text-blue-50 fill-blue-50 cursor-pointer hover:scale-125 transition-all duration-300' />
                                    </div>
                                    <div className='flex flex-col w-full h-full gap-3 overflow-auto p-2'>
                                        {todoTasks.map((task) => (
                                            <div key={task.id} className='relative w-full p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 border-l-2 border-l-blue-500'>
                                                <span className='flex justify-between w-full'>
                                                    <h4 className='text-sm'>{task.title}</h4>
                                                    <p className={`text-xs ${task.priority === 'high' ? 'text-red-500' : (task.priority === 'medium' ? 'text-orange-400' : 'text-green-500')}`}>{task.priority.toUpperCase()}</p>
                                                </span>
                                                <p className='text-xs text-zinc-400'>{task.description}</p>
                                                <p className='text-xs text-zinc-400'>Due {task.dueDate}</p>
                                                <div className='w-7 h-7 flex justify-center items-center text-xs rounded-full aspect-square bg-gray-600 absolute right-3 bottom-3 cursor-pointer' title={task.assignee.name}>{task.assignee.avatar}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='w-full h-full bg-zinc-900 rounded-lg p-4 flex flex-col justify-start items-start text-blue-50 gap-3 max-h-[70vh]'>
                                    <span className='flex items-center gap-2 relative w-full'>
                                        <Activity className='w-5 h-5' />
                                        <h3 className='text-md'>{`In-Progress (${inProgressTasks.length})`}</h3>
                                        <Funnel className='w-5 h-5 absolute right-0 text-blue-50 cursor-pointer' />
                                    </span>
                                    <div className='flex flex-col w-full h-full gap-3 overflow-auto p-2'>
                                        {inProgressTasks.map((task) => (
                                            <div key={task.id} className='relative w-full p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 border-l-2 border-l-blue-50'>
                                                <span className='flex justify-between w-full'>
                                                    <h4 className='text-sm'>{task.title}</h4>
                                                    <p className={`text-xs ${task.priority === 'high' ? 'text-red-500' : (task.priority === 'medium' ? 'text-orange-400' : 'text-green-500')}`}>{task.priority.toUpperCase()}</p>
                                                </span>
                                                <p className='text-xs text-zinc-400'>{task.description}</p>
                                                <p className='text-xs text-zinc-400'>Due {task.dueDate}</p>
                                                <div className='w-7 h-7 flex justify-center items-center text-xs rounded-full aspect-square bg-gray-600 absolute right-3 bottom-3 cursor-pointer' title={task.assignee.name}>{task.assignee.avatar}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='w-full h-full bg-zinc-900 rounded-lg p-4 flex flex-col justify-start items-start text-blue-50 gap-3 max-h-[70vh]'>
                                    <span className='flex items-center gap-2 relative w-full'>
                                        <TextSearch className='w-5 h-5' />
                                        <h3 className='text-md'>{`Review (${reviewTasks.length})`}</h3>
                                        <Funnel className='w-5 h-5 absolute right-0 text-blue-50 cursor-pointer' />
                                    </span>
                                    <div className='flex flex-col w-full h-full gap-3 overflow-auto p-2'>
                                        {reviewTasks.map((task) => (
                                            <div key={task.id} className='relative w-full p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 border-l-2 border-l-orange-500'>
                                                <span className='flex justify-between w-full'>
                                                    <h4 className='text-sm'>{task.title}</h4>
                                                    <p className={`text-xs ${task.priority === 'high' ? 'text-red-500' : (task.priority === 'medium' ? 'text-orange-400' : 'text-green-500')}`}>{task.priority.toUpperCase()}</p>
                                                </span>
                                                <p className='text-xs text-zinc-400'>{task.description}</p>
                                                <p className='text-xs text-zinc-400'>Due {task.dueDate}</p>
                                                <div className='w-7 h-7 flex justify-center items-center text-xs rounded-full aspect-square bg-gray-600 absolute right-3 bottom-3 cursor-pointer' title={task.assignee.name}>{task.assignee.avatar}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='w-full h-full bg-zinc-900 rounded-lg p-4 flex flex-col justify-start items-start text-blue-50 gap-3 max-h-[70vh]'>
                                    <span className='flex items-center gap-2 relative w-full'>
                                        <ListChecks className='w-5 h-5' />
                                        <h3 className='text-md'>{`Completed (${completedTasks.length})`}</h3>
                                        <Funnel className='w-5 h-5 absolute right-0 text-blue-50 cursor-pointer' />
                                    </span>
                                    <div className='flex flex-col w-full h-full gap-3 overflow-auto p-2'>
                                        {completedTasks.map((task) => (
                                            <div key={task.id} className='relative w-full p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 border-l-2 border-l-green-500'>
                                                <span className='flex justify-between w-full'>
                                                    <h4 className='text-sm'>{task.title}</h4>
                                                    <p className={`text-xs ${task.priority === 'high' ? 'text-red-500' : (task.priority === 'medium' ? 'text-orange-400' : 'text-green-500')}`}>{task.priority.toUpperCase()}</p>
                                                </span>
                                                <p className='text-xs text-zinc-400'>{task.description}</p>
                                                <p className='text-xs text-zinc-400'>Due {task.dueDate}</p>
                                                <div className='w-7 h-7 flex justify-center items-center text-xs rounded-full aspect-square bg-gray-600 absolute right-3 bottom-3 cursor-pointer' title={task.assignee.name}>{task.assignee.avatar}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-4'>
                                <div className='w-full bg-zinc-900 rounded-lg p-4 flex flex-col justify-start items-start text-blue-50 gap-3'>
                                    <span className='flex items-center gap-2'>
                                        <Users className='w-5 h-5' />
                                        <h3 className='text-md'>Team Members</h3>
                                    </span>
                                    {project.team.map((member)=>(
                                        <div key={member.id} className='w-full p-2 rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center gap-4'>
                                            <div className='w-10 h-10 flex justify-center items-center text-md rounded-full aspect-square bg-zinc-700 cursor-pointer' title={member.name}>{member.avatar}</div>
                                            <span>
                                                <h4 className='text-sm text-blue-50'>{member.name}</h4>
                                                <p className='text-xs text-zinc-400'>{member.role}</p>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className='w-full bg-zinc-900 rounded-lg p-4 flex flex-col justify-start items-start text-blue-50 gap-3'>
                                    <span className='flex items-center gap-2'>
                                        <SlidersHorizontal className='w-5 h-5' />
                                        <h3 className='text-md'>Quick Action</h3>
                                    </span>

                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
