"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FolderPlus } from "lucide-react";

export default function Projects() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, router]);

  if (!user || loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          {user.role === 'Admin' && (
            <Link href="/projects/new" className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
              <FolderPlus className="w-4 h-4" /> New Project
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 p-10 bg-slate-900 rounded-xl border border-slate-800">
              No projects found.
            </div>
          ) : (
            projects.map((project: any) => (
              <Link href={`/projects/${project._id}`} key={project._id} className="block group">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg hover:border-primary/50 transition-colors h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="text-slate-400 text-sm flex-grow mb-4 line-clamp-3">{project.description || 'No description provided.'}</p>
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-800 pt-4 mt-auto">
                    <span>{project.members?.length || 0} Members</span>
                    <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
