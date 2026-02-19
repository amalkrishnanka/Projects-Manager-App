import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { FolderKanban, CheckSquare, TrendingUp, AlertCircle, DivideIcon } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import CountUp from "react-countup";
import { projects, activityData, tasks, teamMembers } from "../data/mockData";

const Dashboard = () => {
    const recentTasks = tasks.slice(-4).reverse();
    const overview = [
        { title: 'Total Projects', value: projects.length, icon: FolderKanban },
        { title: 'Active Tasks', value: tasks.length, icon: CheckSquare },
        { title: 'Completed', value: tasks.filter((t) => t.status === "done").length, icon: TrendingUp },
        { title: 'At Risk', value: projects.filter((p) => p.status === "at-risk" || p.status === "delayed").length, icon: AlertCircle },
    ];
    const projectProgressData = projects.map(project => ({
        name: project.name,
        progress: project.tasksCount ? Math.floor((project.completedTasks * 100) / project.tasksCount) : 0
    }));

    return (
        <div className='w-screen h-screen bg-zinc-950 p-2 flex gap-1'>
            <Sidebar />
            <div className='w-full flex flex-col gap-1'>
                <Navbar />
                <div className='flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-4'>
                    <header className='flex flex-col gap-4 mt-2'>
                        <h1 className='text-white text-3xl'>Dashboard</h1>
                        <h2 className='text-zinc-500 text-md -mt-4'>Welcome back! Here's your project overview.</h2>
                    </header>
                    <main className='w-full h-full flex flex-col rounded-lg gap-4'>
                        {/* Overview Section */}
                        <section className='w-full flex gap-4 flex-wrap justify-center items-center'>
                            {overview.map((card, key) => (
                                <div key={key} className='bg-zinc-900 p-6 min-w-fit w-[25%] rounded-lg text-white flex flex-col flex-1 justify-center items-start gap-1'>
                                    <span className='flex gap-1 text-zinc-400'>
                                        <card.icon className='w-4 h-4' />
                                        <p className='text-xs'>{card.title}</p>
                                    </span>
                                    <h3 className='text-xl font-bold'><CountUp end={card.value} duration={2} /></h3>
                                </div>
                            ))}
                        </section>

                        {/* Charts Section */}
                        <section className='h-fit w-full flex flex-wrap gap-4'>
                            <div className='bg-zinc-900 h-fit sm:min-w-auto min-w-full flex flex-col gap-4 flex-1 p-6 text-black rounded-lg'>
                                <h4 className='text-blue-50 text-md font-semibold'>Task Activity</h4>
                                <LineChart data={activityData} style={{ width: '100%', height: '100%', maxHeight: '16rem', fontSize: '0.8rem' }} responsive>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis width='auto' />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="tasks"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </div>
                            <div className='bg-zinc-900 h-fit sm:min-w-auto min-w-full flex flex-col gap-4 flex-1 p-6 text-black rounded-lg'>
                                <h4 className='text-blue-50 text-md font-semibold'>Project Progress</h4>
                                <BarChart data={projectProgressData} style={{ width: '100%', height: '100%', maxHeight: '16rem', fontSize: '0.8rem' }} responsive>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis width='auto' />
                                    <Tooltip />
                                    <Bar dataKey="progress" fill="#3b82f6" />
                                </BarChart>
                            </div>
                        </section>

                        {/* Active Projects and Recent Tasks Section */}
                        <section className='h-fit w-full flex flex-wrap gap-4'>
                            <div className='bg-zinc-900 sm:min-w-auto min-w-full flex flex-col gap-4 flex-1 p-6 text-black rounded-lg'>
                                <h4 className='text-blue-50 text-md font-semibold'>Active Projects</h4>
                                <div className='flex flex-col gap-4 text-blue-50 text-md'>
                                    {projects.slice(0, 4).map((project) => {
                                        const progress = project.tasksCount ? Math.floor(project.completedTasks * 100 / project.tasksCount) : 0;
                                        return (
                                            <div key={project.id} className='flex flex-col gap-2 py-1 cursor-pointer'>
                                                <div className='flex justify-between'>
                                                    <h5>{project.name}</h5>
                                                    <span className="text-sm text-zinc-400">
                                                        {progress}%
                                                    </span>
                                                </div>
                                                <div className='w-full h-1.5 bg-zinc-700 rounded-full'>
                                                    <div className='h-full bg-white rounded-full origin-left animate-[grow_0.7s_ease-out_forwards]' style={{ "--target": progress / 100 }}></div>
                                                </div>
                                                <div className='flex gap-3 justify-between items-center'>
                                                    <p className='text-xs text-zinc-400'>Tasks: {project.completedTasks} / {project.tasksCount}</p>
                                                    <p className={`text-xs justify-self-end ${project.status === 'delayed' ? 'text-orange-600' : (project.status === 'at-risk' ? 'text-red-600' : 'text-green-600')}`}>{project.status.toUpperCase()}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='bg-zinc-900 sm:min-w-auto min-w-full flex flex-col gap-4 flex-1 p-6 text-black rounded-lg'>
                                <h4 className='text-blue-50 text-md font-semibold'>Recent Tasks</h4>
                                <div className='flex flex-col text-blue-50 text-sm'>
                                    {recentTasks.map((task) => (
                                        <div key={task.id} className='border-t border-t-zinc-600 flex flex-col justify-center py-4'>
                                            <span className='flex justify-between'>
                                                <h5 className='text-md'>{task.title}</h5>
                                                <p className={`font-medium text-xs p-1 px-2 rounded-lg ${task.priority === 'high' ? ' bg-red-600' : (task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500')}`}>{task.priority.toUpperCase()}</p>
                                            </span>
                                            <p className='text-xs text-zinc-400'>{task.description}</p>
                                            <p className='text-xs text-zinc-400 mt-0.5'>Due: {task.dueDate}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
