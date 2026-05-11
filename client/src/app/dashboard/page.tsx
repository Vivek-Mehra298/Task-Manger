"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Folder, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, router]);

  if (!user || loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  const todoTasks = tasks.filter((t: any) => t.status === 'Todo');
  const inProgressTasks = tasks.filter((t: any) => t.status === 'In Progress');
  const doneTasks = tasks.filter((t: any) => t.status === 'Done');

  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Link href="/projects" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors border border-slate-700">
            <Folder className="w-4 h-4" /> Manage Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 text-slate-300 mb-2">
              <AlertCircle className="text-yellow-500" />
              <h3 className="font-semibold text-lg">To Do</h3>
            </div>
            <p className="text-3xl font-bold text-white">{todoTasks.length}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 text-slate-300 mb-2">
              <Clock className="text-blue-500" />
              <h3 className="font-semibold text-lg">In Progress</h3>
            </div>
            <p className="text-3xl font-bold text-white">{inProgressTasks.length}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 text-slate-300 mb-2">
              <CheckCircle className="text-green-500" />
              <h3 className="font-semibold text-lg">Done</h3>
            </div>
            <p className="text-3xl font-bold text-white">{doneTasks.length}</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">Your Tasks</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800/50 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-4 font-medium">Task</th>
                <th className="p-4 font-medium">Project</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-500">No tasks found</td>
                </tr>
              ) : (
                tasks.map((task: any) => (
                  <tr key={task._id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="p-4">{task.title}</td>
                    <td className="p-4">{task.project?.name || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${task.status === 'Todo' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                          task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                          'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-4">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
