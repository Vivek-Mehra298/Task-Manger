"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function ProjectDetail() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          api.get(`/projects/${params.id}`),
          api.get(`/tasks?projectId=${params.id}`)
        ]);
        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, router, params.id]);

  if (!user || loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  if (!project) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Project not found</div>;

  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-grow container mx-auto p-6">
        <div className="mb-8 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
          <h1 className="text-4xl font-bold text-white mb-4">{project.name}</h1>
          <p className="text-slate-400 text-lg max-w-3xl">{project.description}</p>
          <div className="mt-6 flex gap-4 text-sm text-slate-500">
            <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Owner: {project.owner?.name}</span>
            <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{project.members?.length} Members</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Project Tasks</h2>
          {user.role === 'Admin' && (
            <button className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tasks.length === 0 ? (
            <div className="text-center text-slate-500 p-10 bg-slate-900 rounded-xl border border-slate-800">
              No tasks for this project yet.
            </div>
          ) : (
            tasks.map((task: any) => (
              <div key={task._id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{task.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500">Assignee: <span className="text-slate-300 font-medium">{task.assignee?.name || 'Unassigned'}</span></span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">Due: <span className="text-slate-300 font-medium">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span></span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5
                    ${task.status === 'Todo' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                      task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                      'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                    {task.status === 'Todo' && <AlertCircle className="w-3 h-3" />}
                    {task.status === 'In Progress' && <Clock className="w-3 h-3" />}
                    {task.status === 'Done' && <CheckCircle className="w-3 h-3" />}
                    {task.status}
                  </span>
                  
                  {/* Status update logic can go here (Admin can update all, Member can update their own) */}
                  <button className="text-slate-400 hover:text-white text-sm font-medium px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                    Update
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
